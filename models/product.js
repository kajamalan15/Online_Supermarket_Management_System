const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Email should be valid']
    },
    quantity: {
        type: Number,
        validate: {
            validator: function(value) {
                return value > 0 && Number.isInteger(value);
            },
            message: 'Quantity must be a positive integer'
        },
        required: true
    },
    price: {
        type: Number,
        validate: {
            validator: function(value) {
                return value >= 0; // Price can be zero or positive
            },
            message: 'Price must be a non-negative number'
        },
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

