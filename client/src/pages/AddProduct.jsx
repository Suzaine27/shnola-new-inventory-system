import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { addProducts } from "../api/products";
const AddProduct = () => {

    const [product_id, setProductId] = useState('');
    const [product_name, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleAdd = async () => {
        const response = await addProducts(product_id, product_name, quantity, unit, price);

        if (response.exist) {
            setErrorMessage('Product already exists.');
            setShowMessage(true);
        } else if (response.success) {
            setErrorMessage('Product added successfully.');
            setShowMessage(true);

            // Clear the input fields
            setProductId('');
            setProductName('');
            setQuantity('');
            setUnit('');
            setPrice('');
        } else {
            setErrorMessage('Failed to add product.');
            setShowMessage(true);
        }

        // Optionally, you can hide the message after some time
        setTimeout(() => {
            setShowMessage(false);
        }, 5000); // Hides the message after 5 seconds

    }
    const redirectToInventory = () => {
        navigate('/inventory'); // Redirect to the inventory page
    }


    return (
        <>
            <div className="h-screen flex items-center justify-center  bg-fuchsia-950 text-white">
                <div className="p-5 border border-red-400 rounded bg-fuchsia-950">
                    <div className="m-3 text-3xl font-semibold flex items-center justify-center">Add Product</div>

                    {
                        showMessage &&
                        (
                            <div className={"m-2 text-center rounded bg-red-200 text-red-800"} >
                                {errorMessage}
                            </div>
                        )
                    }
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-5 items-center justify-center">
                            <label className="text-md">Product ID</label>
                            <input type="text" value={product_id} onChange={(e) => setProductId(e.target.value)} className="rounded border border-red-400 bg-fuchsia-950" />
                        </div>

                        <div className="flex gap-5 items-center justify-center">
                            <label className="text-md">Product Name</label>
                            <input type="text" value={product_name} onChange={(e) => setProductName(e.target.value)} className="rounded border border-red-400 bg-fuchsia-950" />
                        </div>

                        <div className="flex gap-5 items-center justify-center">
                            <label className="text-md">Quantity</label>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-red-400  bg-fuchsia-950" />
                        </div>

                        <div className="flex gap-5 items-center justify-center">
                            <label className="text-md">Unit</label>
                            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-red-400 bg-fuchsia-950" />
                        </div>

                        <div className="flex gap-5 items-center justify-center">
                            <label className="text-md">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-red-400 bg-fuchsia-950" />
                        </div>
                        <button type="button" onClick={handleAdd} className="p-3 rounded bg-black border border-red-400 text-white hover:divide-violet-400 hover:border-black ">Add Product</button>
                        <button type="button" onClick={redirectToInventory} className="p-3 rounded bg-black border  border-red-400  hover:divide-violet-400 text-white  hover:border-black ">Go to Inventory</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;