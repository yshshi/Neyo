import { axiosInstance } from "./axios"

export const signUp = async (singupData) => {
      const respone = await axiosInstance.post("/auth/signup", singupData)
      return respone.data
};