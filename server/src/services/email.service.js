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
    subject: "Thank you for contacting Snaplifye",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0f172a; margin-bottom: 12px;">Hello ${contact.name},</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          Thank you for reaching out to <strong>Snaplifye</strong>. We have successfully received your message and our team will review it shortly.
        </p>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          We’ll get back to you as soon as possible, typically within 24 hours.
        </p>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #334155;">Best regards,</p>
          <h3 style="margin: 6px 0 0; color: #0f766e;">The Snaplifye Team</h3>
        </div>
      </div>
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
    subject: "New Contact Form Submission - Snaplifye",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-bottom: 12px;">New Contact Inquiry Received</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          A new message has been submitted through the contact form on the website.
        </p>
        <div style="margin-top: 20px; background: #f8fafc; padding: 16px; border-radius: 10px;">
          <p style="margin: 6px 0; color: #334155;"><strong>Name:</strong> ${contact.name}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Email:</strong> ${contact.email}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Phone:</strong> ${contact.phone}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Subject:</strong> ${contact.subject}</p>
        </div>
        <div style="margin-top: 20px;">
          <p style="margin: 0 0 8px; color: #334155;"><strong>Message:</strong></p>
          <p style="margin: 0; color: #475569; line-height: 1.7;">${contact.message}</p>
        </div>
      </div>
    `,
  });
};