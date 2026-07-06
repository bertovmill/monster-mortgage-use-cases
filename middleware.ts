import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "site_auth";

function loginPage(error?: boolean) {
  return `<!DOCTYPE html>
<html>
  <head><title>Sign in</title></head>
  <body style="font-family: sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#111;">
    <form method="POST" style="background:#fff; padding:2rem; border-radius:8px; display:flex; flex-direction:column; gap:1rem; min-width:280px;">
      <h2 style="margin:0;">Password required</h2>
      ${error ? `<p style="color:red; margin:0;">Incorrect password</p>` : ""}
      <input type="password" name="password" placeholder="Password" autofocus style="padding:0.5rem; font-size:1rem;" />
      <button type="submit" style="padding:0.5rem; font-size:1rem;">Sign in</button>
    </form>
  </body>
</html>`;
}

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === process.env.PASSWORD) {
    return NextResponse.next();
  }

  if (request.method === "POST") {
    const formData = await request.formData();
    const password = formData.get("password");

    if (password === process.env.PASSWORD) {
      const response = NextResponse.redirect(request.url);
      response.cookies.set(COOKIE_NAME, password as string, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      return response;
    }

    return new NextResponse(loginPage(true), {
      status: 401,
      headers: { "content-type": "text/html" },
    });
  }

  return new NextResponse(loginPage(), {
    status: 401,
    headers: { "content-type": "text/html" },
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
