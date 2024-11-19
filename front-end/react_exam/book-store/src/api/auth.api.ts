import { LoginProps } from "../pages/Login";
import { ResetPasswordProps } from "../pages/ResetPassword";
import { SignupProps } from "../pages/Signup";
import { httpClient, ResponseJsonNumber, ResponseJsonString } from "./http";

export const signup = async (userData : SignupProps) => {
  const response = await httpClient.post<ResponseJsonNumber>("/users/join", userData);
  return response.data;
}

export const resetRequest = async(userData : ResetPasswordProps) => {
  const response = await httpClient.post<ResponseJsonNumber>("/users/reset",userData);
  return response.data;
}

export const resetPassword = async (userData : ResetPasswordProps) => {
  const response = await httpClient.put("/users/reset",userData);
  return response.data;
}

export const login = async (userData : LoginProps) => {
  const response = await httpClient.post<ResponseJsonString>("/users/login",userData);
  return response.data;
}