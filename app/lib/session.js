// import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export function getSessionUser() {

    const match = document.cookie.match(/id_token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) return null;

    try {

        const decoded = jwt.decode(token);
        return decoded;
    } catch (err) {
        console.error("Invalid JWT", err);
        return null;
    }
}
