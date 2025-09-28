import { verify } from "hono/jwt";
import { Context, Next } from "hono";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ success: false, message: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = await verify(token, process.env.ACCESS_TOKEN_SECRET!);

    c.set("user", payload);

    await next();
  } catch (err) {
    return c.json({ success: false, message: "Invalid token" }, 401);
  }
}
