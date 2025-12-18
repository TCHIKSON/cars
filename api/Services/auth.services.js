const { generateJWT } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/password.utils");
const User = require("../Models/user.model");

exports.SignUp = async (data) => {
  try {
    const { username, email, password } = data;

    const isExists = await User.findOne({ $or: [{ username }, { email }] });

    if (isExists) {
      return {
        error: true,
        message: "Un utilisateur existe déjà avec ces informations.",
        statusCode: 400,
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUserData = {
      username,
      email,
      password: hashedPassword,
    };

    const newUser = new User(newUserData);
    await newUser.save();

    return {
      error: false,
      message: "Utilisateur créé avec succès.",
      statusCode: 201,
    };
  } catch (error) {
    console.error("❌ Erreur SignUp:", error);  // ← AJOUTE CETTE LIGNE
    return {
      error: true,
      message: error.message || "Erreur serveur",
      statusCode: 500,
    };
  }
};

exports.SignIn = async (data) => {
  try {
    const { email, password } = data;

    console.log("🔍 Tentative de connexion pour:", email);  // ← AJOUTE CETTE LIGNE

    const user = await User.findOne({ email });

    console.log("👤 Utilisateur trouvé:", user ? "OUI" : "NON");  // ← AJOUTE CETTE LIGNE

    if (!user) {
      return {
        error: true,
        message: "Identifiants invalides.",
        statusCode: 401,
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);

    console.log("🔑 Mot de passe valide:", isPasswordValid);  // ← AJOUTE CETTE LIGNE

    if (!isPasswordValid) {
      return {
        error: true,
        message: "Identifiants invalides.",
        statusCode: 401,
      };
    }

    const token = await generateJWT({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    console.log("✅ Token généré avec succès");  // ← AJOUTE CETTE LIGNE

    return {
      error: false,
      message: "Vous êtes désormais connecté.",
      data: { token },
      statusCode: 200,
    };
  } catch (error) {
    console.error("❌ Erreur SignIn:", error);  // ← AJOUTE CETTE LIGNE
    console.error("Stack:", error.stack);  // ← AJOUTE CETTE LIGNE
    return {
      error: true,
      message: error.message || "Erreur serveur",
      statusCode: 500,
    };
  }
};