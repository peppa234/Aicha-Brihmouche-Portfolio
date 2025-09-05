// EmailJS Configuration
// Replace these with your actual EmailJS credentials from https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
  TO_EMAIL: 'aichabrihmouche@gmail.com'
};

// Email template variables that will be sent to EmailJS
export const createEmailTemplate = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => ({
  from_name: formData.name,
  from_email: formData.email,
  subject: formData.subject,
  message: formData.message,
  to_email: EMAILJS_CONFIG.TO_EMAIL,
  reply_to: formData.email
});
