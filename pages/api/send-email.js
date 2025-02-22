import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { to, subject, text } = req.body;

  // Configurer Nodemailer avec Gmail ou un autre service SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Ton email Gmail
      pass: process.env.EMAIL_PASS, // Ton mot de passe d'application Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
    return res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
}
