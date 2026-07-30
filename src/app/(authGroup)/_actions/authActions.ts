"use server"

import { cookies } from "next/headers"
import jwt,{JwtPayload} from "jsonwebtoken"
import { redirect } from "next/navigation"
import { loginSchema } from "@/lib/validators/auth" 

type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}

type RegisterState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}

export const loginAction = async (redirectTo : string, prevState: LoginState, formData : FormData) => {
    
     const raw = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    // 2. VALIDATE — this is the part that was missing
    const parsed = loginSchema.safeParse(raw)

    if (!parsed.success) {
        // stop here — no fetch call, just return field errors
        return {
            success: false,
            message: "Please fix the errors below.",
            errors: parsed.error.flatten().fieldErrors,
        }
    }


    // const payload = {
    //     email,
    //     password
    // }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/login`, {
        
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(parsed.data)
    });
     console.log("ENV:", JSON.stringify(process.env.NEXT_PUBLIC_BACKEND_API_URL))

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24 * 7,
            sameSite : "lax",
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if(redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")){
            redirect(redirectTo)
        }

        
        if (decodedToken.role === "ADMIN"){
            redirect("/admin-dashboard");
        } else if (decodedToken.role === "LANDLORD"){
            redirect("/landlord-dashboard");
        }else if(decodedToken.role === "TENANT"){
            redirect("/tenant-dashboard");
        }
    }

    return result
}

export const registerAction = async (redirectTo : string, prevState : RegisterState, formData : FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    const payload = {
        name,
        email,
        password,
        role
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/register`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24 * 7,
            sameSite : "lax",
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if(redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")){
            redirect(redirectTo)
        }

        if(decodedToken.role === "LANDLORD"){
            redirect("/admin-dashboard");
        } else if (decodedToken.role === "TE"){
            redirect("/tenant-dashboard");
        }
    }

    return result
}