const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { prisma } = require('../models/prismaClient');

// Login endpoint
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get authenticated user endpoint
exports.getUser = async (req, res) => {
  jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: authData.userId,
          },
        });

        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.json({
            message: 'Access granted',
            user,
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
};
