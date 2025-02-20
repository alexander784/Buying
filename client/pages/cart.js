


export default function CartPage() {
    return (
        <div className="container mx-auto p-6">
            <h2>Your cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>

            ): (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}
                            className="flex justify-between border-b p-4">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>Qty:{item.quantity}</p>
                                    <p className="font-bold">${item.price}</p>
                                </div>
                                <button 
                                onClick={ () => handleRemoveFromCart(item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:ng-red-700"
                                >
                                    Remove
                                </button>

                            </li>
                        ))}
                    </ul>
                    <button 
                    onClick={handleRequestQuote}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >Request quote
                    </button>

                </div>
            )}

           

        </div>
    )
}