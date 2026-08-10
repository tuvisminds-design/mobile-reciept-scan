import nodemailer from "nodemailer";

const mailEnabled = process.env.MAIL_ENABLED === "true";

function createTransport() {
  if (!process.env.SMTP_HOST) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });
}

export async function sendMail(options: {
  to: string | string[];
  subject: string;
  text: string;
}): Promise<void> {
  const toList = Array.isArray(options.to) ? options.to.join(", ") : options.to;

  if (!mailEnabled) {
    console.log(`[mail:disabled] To: ${toList} | ${options.subject} | ${options.text}`);
    return;
  }

  const transport = createTransport();
  if (!transport) {
    console.log(`[mail:no-smtp] To: ${toList} | ${options.subject}`);
    return;
  }

  await transport.sendMail({
    from: process.env.SMTP_FROM || "noreply@example.com",
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
}
