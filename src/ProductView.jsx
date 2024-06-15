import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProductView = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', type: '', supplierName: '', email: '', quantity: '', price: ''});
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [updateId, setUpdateId] = useState(null); // State to hold the ID of the product to be updated

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/product');
            setProducts(response.data.product);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCreateProduct = async () => {

        if (!validateEmail(newProduct.email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!newProduct.name || !newProduct.type || !newProduct.supplierName  || !newProduct.email || !newProduct.quantity  || !newProduct.price) {
            setError('Please fill out all fields');
            return;
        }
        if (isNaN(newProduct.quantity)) {
            setError('Quantity must be a number');
            return;
        }
        try {
            await axios.post('http://localhost:4000/product', newProduct);
            setNewProduct({ name: '', type: '',supplierName: '',email: '', quantity: '',price: '' });
            setError('');
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
   
  

    const handleUpdateProduct = async () => {

        if (!validateEmail(newProduct.email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!newProduct.name || !newProduct.type || !newProduct.supplierName || !newProduct.email || !newProduct.quantity  || !newProduct.price) {
            setError('Please fill out all fields');
            return;
        }
        if (isNaN(newProduct.quantity)) {
            setError('Quantity must be a number');
            return;
        }
        try {
            await axios.put(`http://localhost:4000/product/${updateId}`, newProduct);
            setNewProduct({ name: '', type: '',supplierName: '',email: '', quantity: '',price: '' });
            setError('');
            fetchProducts();
            setUpdateId(null); // Reset update ID after updating
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/product/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }; 

    const handleUpdateClick = (product) => {
        setNewProduct(product);
        setUpdateId(product._id);
    };
    

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        doc.text('Inventory List Details', 10, 10);
        let yPos = 20;
        let rowCount = 1;
    
        doc.setFont('Calibri', 'bold'); // Corrected font name
        doc.setFontSize(10);
        doc.text('Name', 10, yPos);
        doc.text('Type', 30, yPos);
        doc.text('Supplier Name', 70, yPos);
        doc.text('Email', 110, yPos);
        doc.text('Quantity', 150, yPos);
        doc.text('Price', 180, yPos); // Removed unnecessary tab
    
        yPos += 10;
    
        doc.setFont('Calibri', ''); // Corrected font name
        doc.setFontSize(10);
    
        filteredProducts.forEach((review) => {
            doc.text(review.name, 10, yPos);
            doc.text(review.type, 30, yPos);
            doc.text(review.supplierName, 70, yPos);
            doc.text(review.email, 110, yPos);
            doc.text(review.quantity.toString(), 150, yPos); // Convert quantity to string
            doc.text(review.price.toString(), 180, yPos);
    
            yPos += 10;
            rowCount++;
        });
    
        const totalReview = filteredProducts.length;
        doc.text(`Total products: ${totalReview}`, 10, yPos + 10);
    
        doc.save('Inventory list_details.pdf');
    };
    
    // const handleGenerateReport = () => {
    //     const reportContent = `
    //         Inventory Management Report
    //         ---------------------------
    //         Total Products: ${products.length}

    //         Products:
    //         ${products.map((product, index) => `
    //             ${index + 1}. Name: ${product.name}, Type: ${product.type}, Supplier: ${product.supplierName}, Email: ${product.email}, Quantity: ${product.quantity}, Price: ${product.price}
    //         `).join('\n')}
    //     `;

    //     console.log(reportContent); // Output report to console (for demonstration)

    //     // You can display the report in a modal or alert box
    //     alert('Inventory Management Report generated. Check console for details.');
    // };

    const handleQuantityChange = (productId, quantity) => {
        const updatedProducts = products.map((product) =>
            product._id === productId ? { ...product, quantity: quantity } : product
        );
        setProducts(updatedProducts);
    };

    const filteredProducts = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  
    // Calculate total quantity
const totalQuantity = products.reduce((total, product) => total + parseInt(product.quantity || 0), 0);
// Calculate total number of products
const totalProducts = products.length;


    return (
        <div>
            
            <div className='dinv'>
            <headerinv className="navbarinv">
                <nav>
                    
                    
                    <ul className="nav-linksinv">
                        <li><a href="/">Northway Inventory Management</a></li>
                    </ul>
                </nav>
            </headerinv>
         
            <div className="containerinv">
                <main>
                    <section className="create-productinv">
                        <h2>{updateId ? 'Update Product' : 'Create New Inventory'}</h2>
                        <div className="form-groupinv">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </div>
                        <div className="form-groupinv">
                            <input
                                type="text"
                                placeholder="Type"
                                value={newProduct.type}
                                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                            />
                        </div>
                        <div className="form-groupinv">
                            <input
                                type="text"
                                placeholder="Supplier Name"
                                value={newProduct.supplierName}
                                onChange={(e) => setNewProduct({ ...newProduct, supplierName: e.target.value })}
                            />
                        </div>
                        <div className="form-groupinv">
                            <input
                                type="text"
                                placeholder="Email"
                                value={newProduct.email}
                                onChange={(e) => setNewProduct({ ...newProduct, email: e.target.value })}
                            />
                        </div>
                        <div className="form-groupinv">
                            <input
                                type="text"
                                placeholder="Quantity"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            />
                        </div>
                        <div className="form-groupinv">
                            <input
                                type="text"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </div>
                        <button onClick={updateId ? handleUpdateProduct : handleCreateProduct}>
                            {updateId ? 'Update Product' : 'Create Product'}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </section>
                    {/* next page */}
                    <section className="searchinv">
                        <h2>Search Products</h2>
                        <input
                            type="text"
                            placeholder="Search by inventory name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </section>
                    <section className="product-list">
                        <h2>Inventory List</h2>
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
                                {filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.type}</td>
                                        <td>{product.supplierName}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.email}
                                                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                            />
                                            {!validateEmail(product.email) && (
                                                <p className="error-message">Invalid email format</p>
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
                </main>
            </div>
            <section className="calculation">
                <h2>Calculation</h2>
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Products: {totalProducts}</p>
                {/* <button onClick={handleGenerateReport}>Generate Report</button> */}
                <button  onClick={handlePDFDownload}>Generate Report</button>
            </section>
            </div>
        </div>
    );
};

export default ProductView;

