import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
