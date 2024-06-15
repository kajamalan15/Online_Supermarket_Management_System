const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToDb = require('./config/connectToDb');
const Product = require('./models/product');

const app = express();

// Use CORS middleware
app.use(cors());

// Configure Express app
app.use(express.json());

// Connect to database
connectToDb();

// Routing
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.post('/product', async (req, res) => {
    // Get the sent-in data from the request body
    const name = req.body.name;
    const type = req.body.type;
    const supplierName = req.body.supplierName;
    const email = req.body.email;
    const quantity = req.body.quantity;
    const price = req.body.price;

    // Create a product with it
    const product = await Product.create({
        name: name,
        type: type,
        supplierName: supplierName,
        email: email,
        quantity: quantity,
        price: price,
    });

    // Respond with the new product
    res.json({ product: product });
});

app.get('/product', async (req, res) => {
    //Find products
    const product = await Product.find();

    //respond with them
    res.json ({product : product})

});

app.put('/product/:id', async (req, res) => {
    //get the id of the url
    const productId = req.params.id;

    // get the date  off the req body 
    const name = req.body.name;
    const type = req.body.type;
    const supplierName = req.body.supplierName;
    const email = req.body.email;
    const quantity = req.body.quantity;
    const price = req.body.price;

    //find and ubdate the recode
    const products = await Product.findByIdAndUpdate(productId,{
        name:name,
        type:type,
        supplierName:supplierName,
        email:email,
        quantity:quantity,
        price:price,

    });
     //respond with it
     res.json(process.env.PORT);


});
    
app.delete('/product/:id', async (req, res) => {
    // Get the id of the product to delete from the URL params
    const productId = req.params.id;

    try {
        // Find the product by its ID and delete it
        await Product.findByIdAndDelete(productId);
        
        // Respond with success message
        res.json({ success: 'Record deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
});



// Start the server
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${server.address().port}`);
});
