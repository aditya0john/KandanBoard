import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, name, password, otp, correctOtp } = await req.json();

  if (otp !== correctOtp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ email, name, password: hashedPassword });
    }

    const token = jwt.sign({ email, name }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    console.log("USER DATA", user.data);

    return NextResponse.json(
      { token, userId: user._id, userName: user.name, userEmail: user.email },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
