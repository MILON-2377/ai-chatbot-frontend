import { RegisterInput } from "@/src/modules/auth/validation/register.validation";



export const registerUser = async (payload: RegisterInput) => {
    try {

        const response = await fetch(`${process.env.NEXT_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // console.log("register response", response);
        console.log("parse data ", data);

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "Failed to register"
            };
        }

        return { success: true, message: "User registered successfully"}

    } catch (error) {
        console.error("Register user error", error);

        return { success: false, error: error instanceof Error ? error.message : "An unkonw error occured" }
    }
}