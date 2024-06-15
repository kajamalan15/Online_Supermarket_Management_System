
import React from 'react';

const ProductList = ({ products, handleQuantityChange, handleUpdateClick, handleDeleteProduct }) => {
    // Function to validate email format
    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    return (
        
        <section className="product-list">
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Supplier Name</th>
                        <th>Email</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>{product.supplierName}</td>
                            <td>
                                <input
                                    type="email" // Use type="email" for better browser validation
                                    value={product.email}
                                    onChange={(e) => handleEmailChange(product._id, e.target.value)}
                                    className={!validateEmail(product.email) ? 'invalid-email' : ''}
                                />
                                {!validateEmail(product.email) && (
                                    <p className="error-message">Please enter a valid email address</p>
                                )}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                />
                            </td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(product)}>Update</button>
                                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ProductList;



