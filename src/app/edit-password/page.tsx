// /* separate page for editing passwords (might make it more secure later, OTP
// or smth like that to email) */

// "use client";

// import { Card, Heading, Box, Button, Flex, TextField } from "@radix-ui/themes";
// import NextLink from "next/link";
// import { useState } from "react";
// import { editPassword } from "~/server/lib/auth";
// import { useAtom } from "jotai";
// import { userAtom } from "~/server/lib/stores";
// import toast from "react-hot-toast";

// import { ImEye, ImEyeBlocked } from "react-icons/im";

// export default function Page() {
//     const [user, setUser] = useAtom(userAtom);
//     const [toggle, setToggle] = useState<boolean>(false);

//     const handlePassword = async (e: FormData) => {
//         e.append("userId", user?.id ?? "");
//         const response = await editPassword(e);

//         if (response.error) {
//             toast.error(response.error);
//         } else {
//             toast.success("Password updated!");
//         }
//     };

//     return (
//         <div
//             className="mt-20 flex h-full w-full flex-1 flex-col 
//         items-center justify-center overflow-scroll"
//         >
//             <Card
//                 size={"4"}
//                 variant="surface"
//                 className="w-[300px] md:w-[400px]"
//             >
//                 <Heading size={"6"} mb="6">
//                     Edit Your Password
//                 </Heading>
//                 <form action={handlePassword}>
//                     <Box mb={"5"}>
//                         <div
//                             className="relative flex
//                             w-full flex-row items-center
//                             justify-end"
//                         >
//                             <TextField.Root
//                                 size={"2"}
//                                 variant="surface"
//                                 name="password"
//                                 autoComplete="current-password"
//                                 placeholder="Enter your new password"
//                                 type={toggle ? "text" : "password"}
//                                 className="w-full pr-10"
//                                 spellCheck={false}
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute right-4"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     setToggle(!toggle);
//                                 }}
//                             >
//                                 {!toggle && <ImEyeBlocked />}
//                                 {toggle && <ImEye />}
//                             </button>
//                         </div>
//                     </Box>
//                     <Flex gap={"2"}>
//                         <NextLink href="/edit-account">
//                             <Button size={"3"} variant="surface">
//                                 Back
//                             </Button>
//                         </NextLink>
//                         <Button size={"3"} variant="solid" type="submit">
//                             Save
//                         </Button>
//                     </Flex>
//                 </form>
//             </Card>
//         </div>
//     );
// }
