import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../api/products";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Fetched products:", response);
            if (Array.isArray(response)) {
                setProducts(response);
            } else {
                console.error("Fetched data is not an array");
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const goToAddProducts = () => {
        navigate('/add-product');
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await deleteProduct(productId);
                if (response.success) {
                    setProducts(products.filter(product => product.product_id !== productId));
                    setMessage({ text: "Product deleted successfully!", type: "success" });
                    getAllProducts();
                } else {
                    setMessage({ text: "Failed to delete product. Please try again.", type: "error" });
                }
            } catch (error) {
                setMessage({ text: "Failed to delete product. Please try again.", type: "error" });
                console.error("Failed to delete product", error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProduct(
                currentProduct.product_id,
                currentProduct.product_name,
                currentProduct.quantity,
                currentProduct.unit,
                currentProduct.price
            );
            console.log("Update response:", response);
            if (response.success) {
                setProducts(products.map(product =>
                    product.product_id === currentProduct.product_id ? currentProduct : product
                ));
                setIsModalOpen(false);
                setMessage({ text: "Product updated successfully!", type: "success" });
                getAllProducts();
            } else {
                setMessage({ text: "Failed to update product. Please try again.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Failed to update product. Please try again.", type: "error" });
            console.error("Failed to update product", error);
        }
    };

    const openUpdateModal = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="m-3 flex items-center justify-center bg-fuchsia-950">
                <div className="w-full text-5xl text-center text-fuchsia-300 bg-fuchsia-950 py-2 font-bold">Sample Inventory</div>
            </div>

            <div className="m-3 flex items-center justify-center bg-black">
                <table className="border-2 border-black bg-fuchsia-200">
                    <thead>
                        <tr>
                            <th className="text-fuchsia-950">Product ID</th>
                            <th className="text-fuchsia-950">Product Name</th>
                            <th className="text-fuchsia-950">Quantity</th>
                            <th className="text-fuchsia-950">Unit</th>
                            <th className="text-fuchsia-950">Price</th>
                            <th className="text-fuchsia-950">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(products) && products.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.product_id}</td>
                                    <td>{element.product_name}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.unit}</td>
                                    <td>{element.price}</td>
                                    <td>
                                        <button
                                            onClick={() => openUpdateModal(element)}
                                            className="mr-2 border-2 border-blue-500 p-2 rounded bg-yellow-400 text-white hover:bg-blue-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(element.product_id)}
                                            className="border-2 border-red-500 p-2 rounded bg-orange-500 text-white hover:bg-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-purple-400 p-8 rounded-md shadow-md w-1/3">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        value={currentProduct.product_name}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, product_name: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        value={currentProduct.quantity}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Unit</label>
                                    <input
                                        type="text"
                                        value={currentProduct.unit}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, unit: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        value={currentProduct.price}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none mr-2"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                                        onClick={() => getAllProducts()}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div className="m-3 flex items-center justify-center">
                <button
                    type="button"
                    className="p-2 rounded bg-fuchsia-900 border border-pink-200 text-white hover:bg-black hover:border-violet-400"
                    onClick={goToAddProducts}
                >
                    Add Product
                </button>
            </div>
        </>
    );
}

export default Inventory;
