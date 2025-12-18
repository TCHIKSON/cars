const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "La marque est obligatoire"],
        trim: true
    },
    model: {
        type: String,
        required: [true, "Le modèle est obligatoire"],
        trim: true
    },
    year: {
        type: Number,
        min: [1900, "L'année doit être supérieure à 1900"],
        max: [new Date().getFullYear() + 1, "L'année ne peut pas être dans le futur"]
    },
    price: {
        type: Number,
        required: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        default: ""
    }
}, {
    timestamps: true 
});


module.exports = mongoose.model('Car', carSchema);