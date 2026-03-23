import sgMail from "@sendgrid/mail";

export const sendEmail = async (to, subject, text) => {
  try {
    const API_KEY = process.env.SENDGRID_API_KEY;

    if (!API_KEY || !API_KEY.startsWith("SG.")) {
      throw new Error("❌ Invalid SendGrid API Key");
    }

    
    sgMail.setApiKey(API_KEY);

    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      text,
    });

    console.log("Email sent via SendGrid");

  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
    throw error;
  }
};