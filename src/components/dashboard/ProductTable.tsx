const ProductTable: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a product description",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is another product description",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is another product description",
      price: 200,
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is another product description",
      price: 200,
    },
    {
      id: 5,
      name: "Product 5",
      description: "This is another product description",
      price: 200,
    },
    // { id: 6, name: 'Product 6', description: 'This is another product description', price: 200 },
    // { id: 7, name: 'Product 7', description: 'This is another product description', price: 200 },
    // { id: 8, name: 'Product 8', description: 'This is another product description', price: 200 },
    // { id: 9, name: 'Product 9', description: 'This is another product description', price: 200 },
    // { id: 10, name: 'Product 10', description: 'This is another product description', price: 200 }
  ];
  return (
    <div className="p-5 bg-white">
        <h1 className="text-xl font-semibold my-2">PRODUCT LIST</h1>
      <table className="w-full p-3 rounded shadow">
        <thead>
          <tr>
            <th className="text-center py-2 border">
              <input type="checkbox" />
            </th>
            <th className="text-left py-2 px-4 border">Product Name</th>
            <th className="text-left py-2 px-4 border">Product Description</th>
            <th className="text-left py-2 px-4 border">Product Price</th>
            <th className="text-left py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="text-center py-2 px-4 border">
                <input type="checkbox" />
              </td>
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.description}</td>
              <td className="py-2 px-4 border">${product.price}</td>
              <td className="py-2 px-4 border">
                <button className="border px-2 py-1 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-900">
                  Edit
                </button>
                &nbsp;
                <button className="border text-white px-2 py-1 rounded-md text-sm bg-rose-600 hover:bg-rose-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
