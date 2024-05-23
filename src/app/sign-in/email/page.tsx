"use client";

import {
    Card,
    Heading,
    Box,
    Button,
    TextField
} from "@radix-ui/themes";
import { emailSubmit } from "~/server/lib/githubemail";

export default function Page() {
    return (
        <div className="flex h-full w-full flex-1 flex-col
        items-center justify-center overflow-scroll">
            <div className="w-[400px]">
                <Card size={"4"} variant="surface" style={{ width: "400px" }}>
                    <Heading size={"6"} mb="6">
                        Enter your email
                    </Heading>
                    <form action={emailSubmit}>
                        <Box mb={"5"}>
                            <TextField.Root
                            size={"2"}
                            variant="surface"
                            name="email"
                            placeholder="contact@locationapp.org"
                            />
                        </Box>
                        <Button size={"3"} variant="solid">
                            Continue
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}