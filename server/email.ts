import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "rawatnitts0524@gmail.com";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  projectType: string;
  budget?: string | null;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  // Check if environment variables exist
  if (!gmailUser || !gmailAppPassword) {
    console.error(
      "Email credentials not configured! Please set GMAIL_USER and GMAIL_APP_PASSWORD in Render Environment Variables."
    );
    console.log("Contact form data received:", data);
    return false;
  }

  // Create transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const emailContent = `
New Project Inquiry from Your Portfolio Website

-----------------------------------------
CLIENT DETAILS
-----------------------------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

-----------------------------------------
PROJECT DETAILS
-----------------------------------------
Project Type: ${data.projectType}
Budget Range: ${data.budget || "Not specified"}

-----------------------------------------
MESSAGE
-----------------------------------------
${data.message}

-----------------------------------------
This message was sent from your portfolio contact form.
Reply directly to this email to respond to the client.
  `.trim();

  const mailOptions = {
    from: gmailUser,
    to: RECIPIENT_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry: ${data.projectType} - ${data.name}`,
    text: emailContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    return true;
  } catch (error: any) {
    console.error("❌ Failed to send email:", error.message || error);
    return false;
  }
}
