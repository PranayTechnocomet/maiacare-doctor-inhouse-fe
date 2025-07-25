import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import apiServer from "@/utils/apis/axiosBackendHelper";

export async function POST(req: Request) {
  const BASE_URL = "/auth/login";

  try {
    const response = await apiServer.post(BASE_URL, req.body);
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching sitemap:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
