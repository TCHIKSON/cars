const validateWithJoi = (schema) => {
  return async (req, res, next) => {
    try {
      if (!schema) {
        throw new Error("Schéma de validation manquant");
      }
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.error("Détails:", error);

      const errorMessage = error.details
        ? error.details.map((d) => d.message).join(", ")
        : error.message;

      return res.status(400).json({
        error: true,
        message: errorMessage,
      });
    }
  };
};

module.exports = { validateWithJoi };
