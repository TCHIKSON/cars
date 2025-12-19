const { Brand } = require("../Models/brand.model.js");

class BrandsService {
  async getAll() {
    return await Brand.find();
  }

  async getById(id) {
    return await Brand.findById(id);
  }

  async insertMany(brandsArray) {
    return await Brand.insertMany(brandsArray);
  }
  async create(brandData) {
    const newBrand = new Brand(brandData);
    return await newBrand.save();
  }

  async update(id, brandData) {
    return await Brand.findByIdAndUpdate(id, brandData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Brand.findByIdAndDelete(id);
  }
}

module.exports = new BrandsService();
