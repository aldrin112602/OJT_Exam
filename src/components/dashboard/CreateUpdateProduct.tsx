import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "../../axiosInstance";
import Swal from "sweetalert2";

interface PropsInterface {
  isOpen?: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  product?: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
}

const CreateUpdateProduct: React.FC<PropsInterface> = ({
  isOpen = false,
  onClose,
  onProductAdded,
  product,
}) => {
  const [loading, setLoading] = useState(false);

  const [formInputs, setFormInputs] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });

  useEffect(() => {
    if (product) {
      setFormInputs({
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price.toString(),
      });
    }
  }, [product]);

  const handleFormInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);

    try {
      if (product) {
        // Edit existing product
        await api.put(`/api/products/${product.id}`, formInputs);
        Swal.fire({
          title: "Success",
          text: "Product updated successfully!",
          icon: "success",
        });
      } else {
        // Create new product
        await api.post("/api/products", formInputs);
        Swal.fire({
          title: "Success",
          text: "Product added successfully!",
          icon: "success",
        });
      }
      onProductAdded();
      onClose();
      setFormInputs({
        productName: "",
        productDescription: "",
        productPrice: "",
      });
    } catch (error) {
      const { message } = error.response?.data || { message: "Unknown error" };
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">
              {product ? "Edit Product" : "Create Product"}
            </h2>
            <form onSubmit={formSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Product Name:
                </label>
                <input
                  required
                  className="form-input w-full rounded"
                  id="name"
                  type="text"
                  value={formInputs.productName}
                  name="productName"
                  onChange={handleFormInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-1">
                  Product Description:
                </label>
                <input
                  required
                  className="form-input w-full rounded"
                  id="description"
                  type="text"
                  value={formInputs.productDescription}
                  name="productDescription"
                  onChange={handleFormInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-1">
                  Price:
                </label>
                <input
                  required
                  className="form-input w-full rounded"
                  id="price"
                  type="number"
                  value={formInputs.productPrice || ""}
                  name="productPrice"
                  onChange={handleFormInput}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-slate-800 hover:bg-slate-600 text-white py-2 px-4 rounded mr-2"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : product ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUpdateProduct;
