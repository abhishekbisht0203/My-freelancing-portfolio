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

function normalizeEnvValue(v?: string | undefined) {
  if (v === undefined) return undefined;
  return v.trim();
}

function normalizePassword(v?: string | undefined) {
  if (!v) return v;
  const trimmed = v.trim();
  if (trimmed.includes(" ")) {
    const noSpaces = trimmed.replace(/\s+/g, "");
    // If removing spaces yields a plausible 16-char App Password, use it.
    if (noSpaces.length === 16) {
      console.log("Detected grouped SMTP password; stripping whitespace for authentication.");
      return noSpaces;
    }
  }
  return trimmed;
}

export type SendResult = { ok: boolean; via?: "smtp" | "sendgrid"; error?: string };

export async function sendContactEmail(data: ContactEmailData): Promise<SendResult> {
  // Support multiple env var names (SMTP_* preferred, fallback to GMAIL_*)
  const smtpUser = normalizeEnvValue(process.env.SMTP_EMAIL || process.env.SMTP_USER || process.env.GMAIL_USER);
  const smtpPass = normalizePassword(process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD);
  const host = normalizeEnvValue(process.env.SMTP_HOST || "smtp.gmail.com") as string;
  const port = Number(normalizeEnvValue(process.env.SMTP_PORT || "587"));
  const secure = getEnvFlag("SMTP_SECURE") ?? port === 465;

  // Minimal non-sensitive logging about config
  console.log(
    `Email config: host=${host} port=${port} secure=${secure} authConfigured=${!!smtpUser}`
  );

  if (!smtpUser || !smtpPass) {
    console.error(
      "Email credentials not configured for SMTP. Will attempt SendGrid if configured."
    );
  }

  if ((!smtpUser || !smtpPass) && !process.env.SENDGRID_API_KEY) {
    console.error(
      "No SMTP credentials AND no SENDGRID_API_KEY found in environment — emails cannot be sent until one is configured."
    );
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

  let lastErrorMessage: string | undefined;

  // If SendGrid API key exists, prefer it to avoid SMTP network timeouts on managed platforms
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (sendgridApiKey) {
    try {
      console.log("Attempting to send email via SendGrid (preferred)");
      const sg = (await import("@sendgrid/mail")).default;
      sg.setApiKey(sendgridApiKey);

      const msg = {
        from: process.env.SENDGRID_FROM || smtpUser || (process.env.RECIPIENT_EMAIL || RECIPIENT_EMAIL),
        to: RECIPIENT_EMAIL,
        replyTo: data.email,
        subject: `New Inquiry: ${data.projectType} - ${data.name}`,
        text: emailContent,
      };

      const [response] = await sg.send(msg as any);
      console.log("Email sent via SendGrid, status:", response && response.statusCode);
      return { ok: true, via: "sendgrid" };
    } catch (sgErr: any) {
      lastErrorMessage = sgErr && sgErr.message ? String(sgErr.message) : String(sgErr);
      console.error("Failed to send via SendGrid:", lastErrorMessage);
      // fall through to SMTP fallback
    }
  }

  // Try SMTP if configured (fallback)
  if (smtpUser && smtpPass) {
    try {
      console.log("Attempting to send email via SMTP (fallback)");
      try {
        await transporter.verify();
        console.log("SMTP connection verified");
      } catch (verifyErr: any) {
        lastErrorMessage = verifyErr && verifyErr.message ? String(verifyErr.message) : String(verifyErr);
        console.error("SMTP verify failed:", lastErrorMessage);
      }

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent via SMTP (messageId):", info.messageId || info.response || "unknown");
      return { ok: true, via: "smtp" };
    } catch (error: any) {
      lastErrorMessage = error && error.message ? String(error.message) : String(error);
      console.error("Failed to send email via SMTP:", lastErrorMessage);
      // If this looks like a network timeout, add a hint for the user (non-sensitive)
      if (/timeout|ETIMEDOUT|EAI_AGAIN|Connection timed out/i.test(lastErrorMessage || "")) {
        console.error("SMTP connection timed out — managed hosts often block outbound SMTP. Consider setting SENDGRID_API_KEY in your Render environment to use an API-based mailer.");
      }
    }
  }

  // Persist last error message in module scope for safe diagnostics
  exportLastEmailError(lastErrorMessage);

  return { ok: false, error: lastErrorMessage };
}

// Module-scoped storage for the last email error (non-sensitive)
let _lastEmailError: string | undefined = undefined;

export function exportLastEmailError(msg?: string | undefined) {
  if (!msg) {
    _lastEmailError = undefined;
    return;
  }
  // trim to reasonable length
  _lastEmailError = String(msg).slice(0, 200);
}

export function getLastEmailError(): string | undefined {
  return _lastEmailError;
}
