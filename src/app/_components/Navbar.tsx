import { Text } from "@radix-ui/themes";

export default function Navbar() {
  return (
    <>
      <div
        className="flex flex-row items-center justify-between 
                        bg-slate-100 p-4"
      >
        <Text className="text-2xl font-bold text-slate-900">Location App</Text>
        <div className="flex flex-row items-center justify-center gap-2">
          Account
        </div>
      </div>
    </>
  );
}
