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

export const login = async (loginData) => {
      const respone = await axiosInstance.post("/auth/login", loginData)
      return respone.data
};

export const logout = async () => {
      const respone = await axiosInstance.post("/auth/logout")
      return respone.data
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/user");
  return response.data.recommendedUsers;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/user/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}