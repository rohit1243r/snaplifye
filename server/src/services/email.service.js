import nodemailer from "nodemailer";

const isEmailConfigured = () => {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
};

const getTransporter = () => {
  if (!isEmailConfigured()) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email to User
export const sendUserEmail = async (contact) => {
  const transporter = getTransporter();
  if (!transporter) return null;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: contact.email,
    subject: "Thank you for contacting Snaplifye 🚀",
    html: `
      <h2>Hello ${contact.name},</h2>

      <p>Thank you for contacting <strong>Snaplifye</strong>.</p>

      <p>We have received your message and our team will contact you within 24 hours.</p>

      <br>

      <p>Regards,</p>

      <h3>Snaplifye Team</h3>
    `,
  });
};

// Email to Admin
export const sendAdminEmail = async (contact) => {
  const transporter = getTransporter();
  if (!transporter) return null;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "📩 New Contact Form Submission",
    html: `
      <h2>New Contact Received</h2>

      <p><strong>Name:</strong> ${contact.name}</p>

      <p><strong>Email:</strong> ${contact.email}</p>

      <p><strong>Phone:</strong> ${contact.phone}</p>

      <p><strong>Subject:</strong> ${contact.subject}</p>

      <p><strong>Message:</strong></p>

      <p>${contact.message}</p>
    `,
  });
};