// import Link from "next/link";
// import { api } from "~/trpc/server";
import Clerk from "./_components/Clerk";
import Navbar from "./_components/Navbar";

export default async function Home() {
  return (
    <> 
      <Clerk />
      <Navbar />
      <h1>Hello World!</h1>
    </>
  );
}