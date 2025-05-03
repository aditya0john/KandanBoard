import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Return success response
    return NextResponse.json(
      {
        token,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
