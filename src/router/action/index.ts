import api, { authApi } from "@/api";
import { AxiosError } from "axios";

import { type ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import useAuthStore, { Status } from "@/store/authStore";
export const loginAction = async ({ request }: ActionFunctionArgs) => {
  // request=user input to login
  const formData = await request.formData();
  const authData = {
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  //   response=api response to user

  try {
    const response = await authApi.post("login", authData);
    if (response.status == 200) {
      const redirectTo =
        new URL(request.url).searchParams.get("redirect") || "/";
      return redirect(redirectTo);
    }
    return { error: response.data || "Login failed" };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "login failed" };
    } else throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("/logout");
    return redirect("/login");
  } catch (error) {
    console.error("logout failed");
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("register", credentials);

    if (response.status == 200) {
      //Client Management
      authStore.setAuth(response.data.phone, response.data.token, Status.otp);
      return redirect("/register/otp");
    } else {
      return { error: response.data || "Sending OTP failed" };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Sending OTP failed" };
    } else throw error;
  }
};

export const otpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credientials = {
    phone: authStore.phone,
    otp: formData.get("otp"),
    token: authStore.token,
  };
  try {
    const response = await authApi.post("verify", credientials);
    if (response.status == 200) {
      authStore.setAuth(
        response.data.phone,
        response.data.token,
        Status.confirm
      );
      return redirect("/register/confirm-password");
    } else {
      return { error: response.data || "OTP verification failed" };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Verifying OTP failed" };
    } else throw error;
  }
};

export const confirmPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    password: formData.get("password"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("confirm", credentials);
    if (response.status == 201) {
      authStore.setAuth(
        response.data.phone,
        response.data.token,
        Status.confirm
      );
    }
    authStore.clearAuth();
    return redirect("/login");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Confirming password failed" };
    } else throw error;
  }
};
