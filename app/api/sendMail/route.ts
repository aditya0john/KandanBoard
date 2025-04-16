import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const { email, name } = await request.json();
    const resend = new Resend(process.env.RESEND_API);

    await connectToDatabase();

    let user = await User.findOne({ email });

    if (!user) {
      await resend.emails.send({
        from: "Naofumi <onboarding@resend.dev>",
        to: email,
        subject: "OTP for login",
        html: `
      <h1>Thank you ${name} for using Kanban Board!</h1>
    <p>Here is your OTP to confirm your booking/login:</p>
      <h3 style="color: #333;">🔐 OTP: ${otp}</h3>
      <p>Enter this code in your app to proceed.</p>
      <p>We look forward to be productive together!</p>
    `,
      });

      return NextResponse.json(
        { message: "OTP Sent !!", otp },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "You are already a USER !!",
          alreadyExists: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error sending email", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
