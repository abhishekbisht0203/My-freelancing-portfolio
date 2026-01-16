import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "rawatnitts0524@gmail.com";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string | null;
  projectType: string;
  budget?: string | null;
  message: string;
}

function getEnvFlag(name: string) {
  const v = process.env[name];
  if (!v) return undefined;
  return v === "true" || v === "1";
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  // Support multiple env var names (SMTP_* preferred, fallback to GMAIL_*)
  const smtpUser = process.env.SMTP_EMAIL || process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = getEnvFlag("SMTP_SECURE") ?? port === 465;

  // Minimal non-sensitive logging about config
  console.log(
    `Email config: host=${host} port=${port} secure=${secure} authConfigured=${!!smtpUser}`
  );

  if (!smtpUser || !smtpPass) {
    console.error(
      "Email credentials not configured. Set SMTP_EMAIL and SMTP_PASSWORD (or GMAIL_USER/GMAIL_APP_PASSWORD) in Render environment."
    );
    console.log("Contact form payload:", {
      name: data.name,
      email: data.email,
      projectType: data.projectType,
    });
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // timeouts and TLS handling to avoid hanging in production
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS || 5000),
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS || 10000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS || 10000),
    tls: {
      // allow using custom cert chains; default is true, set to false only for debugging
      rejectUnauthorized: getEnvFlag("SMTP_REJECT_UNAUTHORIZED") ?? true,
    },
  });

  const emailContent = `New Project Inquiry from Your Portfolio Website

CLIENT DETAILS
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

PROJECT DETAILS
Project Type: ${data.projectType}
Budget Range: ${data.budget || "Not specified"}

MESSAGE
${data.message}

This message was sent from your portfolio contact form.`.trim();

  const mailOptions = {
    from: smtpUser,
    to: RECIPIENT_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry: ${data.projectType} - ${data.name}`,
    text: emailContent,
  };

  try {
    // Verify transporter connection quickly (will throw if auth fails)
    try {
      await transporter.verify();
      console.log("SMTP connection verified");
    } catch (verifyErr: any) {
      console.error("SMTP verify failed:", verifyErr && verifyErr.message ? verifyErr.message : verifyErr);
      // Continue to attempt send to capture send errors too
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent (messageId):", info.messageId || info.response || "unknown");
    return true;
  } catch (error: any) {
    console.error("Failed to send email:", error && error.message ? error.message : error);
    return false;
  }
}
