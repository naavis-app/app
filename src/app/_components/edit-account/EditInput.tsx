
import {TextField} from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '~/server/lib/stores';
import { RxPencil1 } from 'react-icons/rx';
import { FaCheck } from 'react-icons/fa';

export default function EditableInput({ name, placeholder }: 
    {name: string, placeholder: string}) {
    const [user, setUser] = useAtom(userAtom);
    const [currField, setCurrField] = useState(name);
    const [val, setVal] = useState<string>(user?.firstname!);
    const [toggle, setToggle] = useState<boolean>(false);
    
    useEffect(() => {
        switch(currField) {
            case 'firstname':
                setVal(user?.firstname!);
                break;
            case 'lastname':
                setVal(user?.lastname!);
                break;
            case 'email':
                setVal(user?.email!);
                break;
            case 'username':
                setVal(user?.username!);
                break;
            default:
                setVal('');
        }
    }, []);

    const handleInputChange = (e: any) => {
        setVal(e.target.value);
    }

    return (
        <div className="flex flex-row
        items-center justify-end w-full
        relative">
            <TextField.Root
                size={"2"}
                variant="surface"
                name={name}
                placeholder={`Enter your ${placeholder}`}
                className="w-full pr-10"
                value={val}
                type="text"
                required
                disabled={!toggle}
                onChange={handleInputChange}
            />
            <button
            className="absolute right-4"
            onClick={(e) => {
                e.preventDefault();
                setToggle(!toggle);
            }}>
                {!toggle && <RxPencil1 />}
                {toggle && <FaCheck />}
            </button>
        </div>
    )
}