import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Link } from "@radix-ui/themes";

export default function Clerk() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
