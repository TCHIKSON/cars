const Car = require('../Models/car.model.js');

class CarsService {
    

    async getAll() {
        return await Car.find();
    }

    
    async getById(id) {
        return await Car.findById(id);
    }

 
    async create(carData) {
        const newCar = new Car(carData);
        return await newCar.save();
    }

   
    async update(id, carData) {
        return await Car.findByIdAndUpdate(id, carData, { 
            new: true, 
            runValidators: true 
        });
    }

    async delete(id) {
        return await Car.findByIdAndDelete(id);
    }
}

module.exports = new CarsService();