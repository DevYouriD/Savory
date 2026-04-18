import { cookies } from "next/headers";

export async function getLanguage(): Promise<"nl" | "en"> {
    const cookieStore = await cookies();

    return (cookieStore.get("language")?.value as "nl" | "en") ?? "nl";
}