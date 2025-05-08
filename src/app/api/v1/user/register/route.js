import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request) {
    try {
      await dbConnect();
      
      const body = await request.json();
      console.log(body);

      const {name, email, password} = body;
      
      if(!name.trim() || !email.trim() || !password.trim()){
        return NextResponse.json({msg: "Provide valid name, email and password"}, {status: 400});
      }

      const existingUser = await User.findOne({email: email});
      if(existingUser){
        return NextResponse.json({msg: "User already exist", user: existingUser}, {status: 400});
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ name, email, password: hashedPassword });

      return NextResponse.json({msg: `New User created`, user: newUser}, {status: 201});

    } catch (error) {
      console.error("MongoDB connection error:", error);
      
      return new Response("Internal Server Error", { status: 500 });
    }
}