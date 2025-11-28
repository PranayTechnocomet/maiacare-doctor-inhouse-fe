import { NextResponse } from "next/server";
import apiServer from "@/utils/apis/axiosBackendHelper";
import { handleApiError } from "@/utils/apis/errorHandler";

export async function POST(
  req: Request,
  context: any  
) {
  try {
    const { patientId, physicalAssessmentId } = context.params;

    const response = await apiServer.post(
      `/patient/physical-assessment/${patientId}/${physicalAssessmentId}`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}

