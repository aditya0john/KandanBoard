import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, name, otp, correctOtp } = await req.json();

  if (otp !== correctOtp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  const token = jwt.sign(
    { email, name },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token });
}
