/* this route is for github authentication, where a user
must enter their email after registering with github 
(as getting emails from github accounts is tricky and 
unreliable [and we need those emails!]) */

"use client";

import { Card, Heading, Box, Button, TextField } from "@radix-ui/themes";
import { emailSubmit } from "~/server/lib/githubemail";
import React from "react";

export default function Page() {
    return (
        <div
            className="flex h-full w-full flex-1 flex-col
        items-center justify-center overflow-scroll"
        >
            <div className="w-[300px] md:w-[400px]">
                <Card
                    size={"4"}
                    variant="surface"
                    className="w-[300px] md:w-[400px]"
                >
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
