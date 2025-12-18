const validateWithJoi = (schema) => {
    return async (req, res, next) => {
        try {
            // On vérifie que le schéma existe bien avant de valider
            if (!schema) {
                throw new Error("Schéma de validation manquant");
            }
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            console.error("Détail erreur Joi:", error); // Pour voir l'erreur dans ton terminal backend

            // On vérifie si error.details existe avant de faire le .map()
            const errorMessage = error.details 
                ? error.details.map(d => d.message).join(', ') 
                : error.message; // Si pas de détails, on prend le message brut

            return res.status(400).json({
                error: true,
                message: errorMessage
            });
        }
    };
};

module.exports = { validateWithJoi };