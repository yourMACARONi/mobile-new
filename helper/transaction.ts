import { NEXT_API_URL } from "@/constants/api";
import { getSession } from "./session";


export const  updateSalesTransaction = async (body: unknown)  => {
    const session = await getSession();

    try {
        const req = await fetch(`${NEXT_API_URL}/api/sales`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`
            },
            body: JSON.stringify(body)
        });

        return req;
    } catch (error) {
        console.log(error)
    }
}


export const  updateExpenseTransaction = async (body: unknown)  => {
    const session = await getSession();

    try {
        const req = await fetch(`${NEXT_API_URL}/api/expense`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`
            },
            body: JSON.stringify(body)
        });

        return req;
    } catch (error) {
        console.log(error)
    }
}