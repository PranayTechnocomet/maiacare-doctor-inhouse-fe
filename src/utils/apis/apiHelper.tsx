import { FertilityAssessmentType } from "../types/interfaces";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";
import api from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
}

export const getLoginUser = () => {
  return apiClient.get("/profile/get/login-user");
}

export const forgotPassword = (data: { email: string }) => {
  return apiClient.post("/auth/forgot-password", data);
}

export const forgotPasswordVerify = (data: { token: string | null, otp: number | string }) => {
  return apiClient.post("/auth/forgot-password-verify", data);
}

export const newPassword = (data: { token: string | null, password: string }) => {
  return apiClient.post("/auth/new-password", data);
}

export const changePassword = (data: { oldPassword: string, newPassword: string }) => {
  return apiClient.post("/profile/change-password", data);
}

export const getLoggedInDevice = (data: { token: string | null }) => {
  return apiClient.post("/profile/list-login-device", {}, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    }
  });
}


export const logout = () => {
  return apiClient.post("/profile/logout");
}

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/profile/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const update = () => {
  const token = localStorage.getItem("token");
  return apiClient.put("/profile/update", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

type QualificationType = {
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: number | string;
  endYear: number | string;
};

export const addQualification = (data: QualificationType[]) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/profile/qualifications/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}


export const editQualification = (data: QualificationType, id:string|null) => {
  const token = localStorage.getItem("token");
  return apiClient.put(`/profile/qualifications/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const deleteQualification = (id:string) => {
  const token = localStorage.getItem("token");
  return apiClient.delete(`/profile/qualifications/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadkycdetails = () => {
  const token = localStorage.getItem("token");
  return apiClient.delete("/profile/uploadkycdetails", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAll = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/patient/getAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOne = async (id: string | number) => {
    return await api.get(`/patient/${id}`);   // FIXED ✔
};


export const patientDelete = (id: string) => {
  const token = localStorage.getItem("token");

  return apiClient.delete(`/patient/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const addphysicalassessment = (data: any) => {
  const token = localStorage.getItem("token");

  return apiClient.post("/patient/physical-assessment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};



export const getphysicalassessment = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/patient/physical-assessment", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const updatephysicalassessment = (data: any) => {
  const token = localStorage.getItem("token");

  return apiClient.put("/patient/physical-assessment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const addFertilityAssessment = (data: any  ) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/patient/fertility-assessment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getfertilityassessment = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/patient/fertility-assessmentt", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const updatefertilityassessment = () => {
  const token = localStorage.getItem("token");
  return apiClient.put("/patient/fertility-assessment", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const addMedicalHistory = (patientId: string, data: any) => {
  const token = localStorage.getItem("token");

  return apiClient.post(
    "/patient/medical-history",
    {
      patientId, // send patientId
      ...data,   // include form data
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getmedicalhistory = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/patient/medical-history", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const updatemedicalhistory = () => {
  const token = localStorage.getItem("token");
  return apiClient.put("/patient/medical-history", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const basicDetails = (data: {
  partnerImage: string | File,
  partnerName: string,
  partnerContactNumber: string | number,
  partnerEmail: string,
  partnerGender: string,
  partnerAge: string | number
}) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/patient/partner/basicDetails",data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const addPartnerMedicalHistory = (data: { patientId: string | undefined; medications: { status: string; medicationsDetails: string; }; surgeries: { status: string; surgeriesDetails: string; }; conditions: string[]; familyHistory: string; lifestyle: string[]; exerciseFrequency: string; stressLevel: string; }) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/patient/partner/medicalHistory",data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const addPartnerPhysicalAssesment = (data: { height: string; weight: string; bmi: string; bloodGroup: string; bloodPressureSystolic: string; bloodPressureDiastolic: string; heartRate: string; }) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/patient/partner/physicalAssessment",data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const addPartnerfertilityAssessment = (data: { patientId: string | undefined; semenAnalysis: { status: string; semenAnalysisDetails: string; }; fertilityIssues: { status: string; fertilityIssuesDetails: string; }; fertilityTreatments: { status: string; fertilityTreatmentsDetails: string; }; surgeries: { status: string; surgeriesDetails: string; }; }) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/patient/partner/fertilityAssessment",data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const getProfileImageUrl = (formData: any) => {
  const token = localStorage.getItem("token");

  return apiClient.post("/update-images", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};





