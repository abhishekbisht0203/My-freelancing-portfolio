Deployment email setup and diagnostics
====================================

This file explains the exact environment variables to set on Render (or any host) and includes quick test commands to verify email sending.

Required environment variables (choose one provider)
- Option A — SMTP (Gmail App Password)
  - `SMTP_EMAIL` = your Gmail address (example: rawatnitts0524@gmail.com)
  - `SMTP_PASSWORD` = Gmail App Password (exact string; DO NOT include comments on the same line)
  - Optional: `SMTP_HOST` = smtp.gmail.com (default)
  - Optional: `SMTP_PORT` = 587 (default)
  - Optional: `SMTP_SECURE` = false (for port 587) or true (for 465)

- Option B — SendGrid (recommended on managed platforms like Render)
  - `SENDGRID_API_KEY` = <your SendGrid API key>
  - Optional: `SENDGRID_FROM` = sender email (optional override)

Common additional vars
- `RECIPIENT_EMAIL` = the inbox that should receive form submissions (defaults to the address in code)
- `ALLOWED_ORIGINS` = comma-separated allowed origins for CORS (example: https://my-freelancing-portfolio-bmxm.onrender.com)

Important notes
- Do NOT paste inline comments on the same line as an env value (e.g. avoid `SMTP_PASSWORD=abc // comment`). The comment text becomes part of the value and breaks authentication.
- If your host (Render) blocks outbound SMTP (common), use SendGrid (API) instead — the code prefers SendGrid if `SENDGRID_API_KEY` is present.

How to add variables on Render
Tips when copying env values
- Do not include inline comments on the same line as values. Use separate lines starting with `#` for comments.
- If you paste a Gmail App Password with grouping spaces (e.g. `abcd efgh ijkl mnop`) the server will automatically strip whitespace for convenience. If you see authentication errors, re-check the exact App Password string.
1. Open your Render dashboard → select your Web Service → Environment.
2. Add the variables above (Name / Value). Save and `Manual Deploy` or `Restart` the service.

Diagnostics (run from your machine)
1) Check which email providers the deployed service detects (no secrets shown):

```bash
curl -s https://my-freelancing-portfolio-bmxm.onrender.com/api/_email_status | jq .
```

Expected output examples:
- SMTP configured only:
  {"smtpConfigured":true,"smtpHost":"smtp.gmail.com","smtpPort":587,"sendgridConfigured":false}
- SendGrid configured:
  {"smtpConfigured":false,"smtpHost":"smtp.gmail.com","smtpPort":587,"sendgridConfigured":true}
- Neither configured:
  {"smtpConfigured":false,"smtpHost":"smtp.gmail.com","smtpPort":587,"sendgridConfigured":false}

2) Send a test contact (replace domain if different):

```bash
curl -v -X POST https://my-freelancing-portfolio-bmxm.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"you@example.com","projectType":"Web App","message":"hello"}'
```

How to interpret results
- If `via` in the response is `smtp` or `sendgrid`, email was attempted by that provider.
- If response contains `details` like `Connection timeout` or logs show `Failed to send email via SMTP: Connection timeout` then outbound SMTP is blocked — set up SendGrid instead.

Logs to check on Render after a test
- "Email config: host=... authConfigured=true|false"
- "Attempting to send email via SendGrid (preferred)"
- "Email sent via SendGrid, status: ..."
- "Attempting to send email via SMTP (fallback)"
- "SMTP connection verified" or "Failed to send email via SMTP: <error>"

If you paste the JSON output from `/api/_email_status` and the POST response JSON here, I will interpret them and provide exact next steps.
