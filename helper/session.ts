import * as SecureStore from "expo-secure-store";
import { NEXT_API_URL } from "@/constants/api";
import { useRouter } from "expo-router";

export const saveSessionFromQr = async (data: string) => {
  const saveData = await SecureStore.setItemAsync("session", data);

  return saveData;
};

export const getSession = async () => {
    //await saveSessionFromQr('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMDAzIiwiZW1haWwiOiJsZW55YWpwYXRpYXJiYUBnbWFpbC5jb20iLCJleHBpcmVzQXQiOiIyMDI0LTEyLTEwVDA1OjE4OjAwLjI0MloiLCJpYXQiOjE3MzM4MDQyODAsImV4cCI6MTczMzgwNzg4MH0.Ygm953wAmUGo7LaD91v1diNgmLkSTjnLqLFHxVll2vw');
  const data = await SecureStore.getItemAsync("session");

  return data;
};

export const removeSession = async () => {
  const session = await SecureStore.setItemAsync("session", "");

  return session;
};



export const getUser = async () => {
  const session = await getSession();
  try {
    const response = await fetch(`${NEXT_API_URL}/api/user`, {
      credentials:'include',
      method: "GET",
      headers: {
        'Authorization': `Bearer ${session}`
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized. Session expired, please scan a new QR.");
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    if (response.status == 307) {
        throw new Error("Unauthorized. Session expired, please scan a new QR.");
    }

    return await response.json();
  } catch (error) {
    throw new Error("An unexpected error occurred.");
  }
};
