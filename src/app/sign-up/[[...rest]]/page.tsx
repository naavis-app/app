import { db } from "~/server/db";
import { cookies } from "next/headers";
import { lucia } from "~/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { hash } from '@node-rs/argon2';

export default function Page() {
  return (
    <div className="flex flex-col h-full flex-1 items-center justify-center">
      <h1>Create an account</h1>
      <form action={signup}>
        <div>
          <label htmlFor="username">Username</label>
          <input name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="flex">
          <button className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700">Continue</button>
        </div>
      </form>
    </div>
  );
}

async function signup(formData: FormData): Promise<ActionResult> {
  "use server";

    let username = formData.get("username");

    if (
      typeof username != "string" ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return {
        error: "Invalid username"
      };
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || 
    password.length > 255) {
      return {
        error: "Invalid password"
      };
    }

    const userId = generateIdFromEntropySize(10);
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost : 2,
      outputLen: 32,
      parallelism: 1
    });

    const existingUser = await db.user.findUnique({
      where: {
        username: username
      }
    });

    if(existingUser) {
      return {
        error: "Taken username"
      }
    }

    await db.user.create({
      data: {
        id: userId,
        username: username,
        password: passwordHash,
      }
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

interface ActionResult {
  error: string;
}
