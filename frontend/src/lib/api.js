import { axiosInstance } from "./axios"

export const signUp = async (singupData) => {
      console.log(`signup api called -- ${singupData}`)
      const respone = await axiosInstance.post("/auth/signup", singupData)
      console.log(`signup response -- ${respone}`)
      return respone.data
};

export const getAuthUser = async () => {
      const res = await axiosInstance.get("/auth/check")
      console.log(`AUth user -- ${res}`)
      return res.data;
    }

export const CompleteOnboarding = async (userData) => {
      const res = await axiosInstance.post("/auth/onboarding", userData)
      return res.data;
    }