
import {
    Box,
    Text,
    Flex,
    Button,
    TextField,
} from '@radix-ui/themes';
import { RxPencil1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";
import { editPassword } from '~/server/lib/auth';
import toast from 'react-hot-toast';
import { ImEye, ImEyeBlocked } from "react-icons/im";

export default function EditPassword() {
    const [user, setUser] = useAtom(userAtom);
    const [toggleCheck, setToggleCheck] = useState<boolean>(false);
    const [eyeVisible, setEyeVisible] = useState<boolean>(false);
    const [toggleEye, setToggleEye] = useState<boolean>(false);
    const [passVal, setPassVal] = useState<string>("");

    const handleSubmit = async (e: FormData) => {
        e.append("userId", user?.id ?? "");
        let response = await editPassword(e);

        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success("Account updated successfully!");
            setUser(response.user || null);
        }
    };
    
    const handleInputChange = (e: any) => {
        setPassVal(e.target.value);
    };

    return (
        <form 
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                setToggleCheck(false);
                handleSubmit(new FormData(e.target as HTMLFormElement));
            }}
        >
            <Box mb={"5"}>
                <div
                className="relative flex
                w-full flex-row items-center
                justify-end"
                >
                    <TextField.Root
                        size={"2"}
                        variant="surface"
                        placeholder={`Enter your new password`}
                        className="w-full pr-10"
                        value={passVal}
                        type={toggleEye ? "text" : "password"}
                        name="password"
                        required
                        disabled={!toggleCheck}
                        onChange={handleInputChange}
                    />
                    <input type="hidden" name="password" value={passVal} />
                    <button
                        type="button"
                        className='absolute right-10'
                        onClick={(e) => {
                            e.preventDefault();
                            setToggleEye(!toggleEye);
                    }}>
                        {eyeVisible && (
                            toggleEye ? <ImEye /> : <ImEyeBlocked />
                        )}
                    </button>
                    <button
                        type="button"
                        className="absolute right-4"
                        onClick={(e) => {
                            e.preventDefault();
                            setEyeVisible(!eyeVisible);
                            setToggleCheck(!toggleCheck);
                        }}
                    >
                        {!toggleCheck && <RxPencil1 />}
                        {toggleCheck && <FaCheck />}
                    </button>
                </div>
                <Flex justify="end" mt={"6"}>
                    <Button size={"2"} variant="solid" type="submit">
                        Save
                    </Button>
                </Flex>
            </Box>
        </form>
    )
}

/* separate page for editing passwords (might make it more secure later, OTP
or smth like that to email) */