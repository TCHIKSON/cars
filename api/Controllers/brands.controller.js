const BrandsService = require("../Services/brands.service.js");

exports.getAllBrands = async (req, res) => {
  try {
    res.set("Cache-Control", "public, max-age=3600");
    const brands = await BrandsService.getAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await BrandsService.getById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Marque non trouvée" });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      console.log(` Insertion en masse de ${req.body.length} marques`);

      const result = await BrandsService.insertMany(req.body);

      return res.status(201).json({
        success: true,
        message: `${result.length} marques créées avec succès`,
        data: result,
      });
    } else {
      const { name, country, logoUrl } = req.body;

      const newBrand = await BrandsService.create({ name, country, logoUrl });
      const result = await newBrand.save();

      return res.status(201).json({
        success: true,
        message: "Marque créée avec succès",
        data: result,
      });
    }
  } catch (error) {
    console.error(" Erreur création marque(s):", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await BrandsService.update(req.params.id, req.body);
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await BrandsService.delete(req.params.id);
    res.status(200).json({ message: "Suppression réussie" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
