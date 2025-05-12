import dbConnect from "@/lib/dbConnect";
export async function GET(request) {
    try {
      await dbConnect();
      console.log("Connected to MongoDB");
      
      return new Response("Hello from API v1", { status: 200 });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      
      return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(request) {
    try {
      await dbConnect();
      console.log("Connected to MongoDB");
      
      return new Response("Hello from API v1", { status: 200 });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      
      return new Response("Internal Server Error", { status: 500 });
    }
}