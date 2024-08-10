const { prisma } = require('../models/prismaClient');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { productName, productDescription, productPrice } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
      },
    });

    res.json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, productDescription, productPrice } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete multiple products by IDs
exports.deleteMultipleProducts = async (req, res) => {
  const { ids } = req.body;

  try {
    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids.map((id) => parseInt(id)),
        },
      },
    });

    res.json({ message: 'Products deleted successfully' });
  } catch (error) {
    console.error('Error deleting products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

