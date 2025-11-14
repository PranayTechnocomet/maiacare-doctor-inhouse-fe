import { NextResponse } from "next/server";
import apiServer from "@/utils/apis/axiosBackendHelper";
import { handleApiError } from "@/utils/apis/errorHandler";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await apiServer.get(`/patient/${id}`);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
