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

  if (!gmailUser || !gmailAppPassword) {
    console.log("Email credentials not configured. Skipping email send.");
    console.log("Contact form submission received:", data);
    return false;
  }

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
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", RECIPIENT_EMAIL);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
