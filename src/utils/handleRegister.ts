import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

type RegisterData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  type: string;
  id: string;
};

export async function handleRegister(
  data: RegisterData
): Promise<{ id: string }> {
  try {
    const response = await axiosInstance.post(
      `${config.apiUrl}/auth/register`,
      data
    );
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    throw error;
  }
}
