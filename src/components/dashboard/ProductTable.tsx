import React, { useEffect, useState } from "react";
import api from "../../axiosInstance";
import CreateUpdateProduct from "./CreateUpdateProduct";
import TopButtons from "./TopButtons";
import Swal from "sweetalert2";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [createProduct, setCreateProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>("/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectProduct = (id: number) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      Swal.fire({
        title: "No Products Selected",
        text: "Please select products to delete.",
        icon: "warning",
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover these products!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    });

    if (confirmation.isConfirmed) {
      try {
        await api.post("/api/products/multiple", { ids: selectedProducts });
        Swal.fire("Deleted!", "Your selected products have been deleted.", "success");
        fetchProducts();
        setSelectedProducts([]);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete products.",
          icon: "error",
        });
      }
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmation.isConfirmed) {
        await api.delete(`/api/products/${id}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        fetchProducts();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete product.",
        icon: "error",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setCreateProduct(true);
  };

  const handleCloseModal = () => {
    setCreateProduct(false);
    setEditProduct(null);
  };

  return (
    <>
      <TopButtons onOpen={() => setCreateProduct(true)} deleteMultiple={handleDeleteSelected} />
      <div className="p-5 bg-white">
        <h1 className="text-xl font-semibold my-2">PRODUCT LIST</h1>
        <CreateUpdateProduct
          isOpen={createProduct}
          onClose={handleCloseModal}
          onProductAdded={fetchProducts}
          product={editProduct}
        />
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="w-full p-3 rounded shadow">
            <thead>
              <tr>
                <th className="text-center py-2 border">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(products.map((product) => product.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    checked={selectedProducts.length === products.length}
                  />
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
                    <input
                      type="checkbox"
                      onChange={() => handleSelectProduct(product.id)}
                      checked={selectedProducts.includes(product.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.description}</td>
                  <td className="py-2 px-4 border">${product.price}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleEdit(product)}
                      className="border px-2 py-1 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-900"
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="border text-white px-2 py-1 rounded-md text-sm bg-rose-600 hover:bg-rose-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductTable;
