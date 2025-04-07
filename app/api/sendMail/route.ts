import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or another service like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.PASSWORD, // Your email password or app password if using Gmail
  },
});

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const { email, name } = await request.json();
    const mailOptions = {
      from: process.env.EMAIL, // sender address
      to: email, // user's email address
      subject: "Your login OTP confimation",
      html: `
        <h1>Thank you for using Kanban Board!</h1>
      <p>Here is your OTP to confirm your booking/login:</p>
        <h3 style="color: #333;">🔐 OTP: ${otp}</h3>
        <p>Enter this code in your app to proceed.</p>
        <p>We look forward to be productive together!</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email", error);
    }

    // For now, we simulate email sending with a simple response:
    if (email && name) {
      // Simulate sending email
      console.log(`Sending email to: ${email}, name: ${name}`);

      return NextResponse.json({ message: "Booking confirmation sent!", otp });
    } else {
      return NextResponse.json(
        { message: "Email or name missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
