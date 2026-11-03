import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email, url) => {
  const { data, error } = await resend.emails.send({
    from: "BookNook <onboarding@resend.dev>",
    to: email,
    subject: "BookNook Password Reset",

    html: `
      <h2>Reset Your Password</h2>
      <p>Click below to reset your password.</p>
      <a href="${url}">Reset Password</a>
      <p>If you did not request this, ignore this email.</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};