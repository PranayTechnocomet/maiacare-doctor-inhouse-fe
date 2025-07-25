import { cookies } from "next/headers";

export const getCookieToken = async () => {
    const token = (await cookies()).get('token')?.value;
    return token;
}
