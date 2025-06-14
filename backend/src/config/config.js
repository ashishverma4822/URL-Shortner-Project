
export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSize: "lax",
    maxAge: 1000 * 60 * 5,
}