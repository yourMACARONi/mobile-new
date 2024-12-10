import { NEXT_API_URL } from "@/constants/api"
import { getSession } from "./session";
export const getSaleCategories = async () => {
    const session = await getSession();
    try {
      const response = await fetch(`${NEXT_API_URL}/api/sales/categories`, {
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

  export const getExpenseCategories = async () => {
    const session = await getSession();
    try {
      const response = await fetch(`${NEXT_API_URL}/api/expense/categories`, {
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