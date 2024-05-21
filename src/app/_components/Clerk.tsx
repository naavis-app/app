import {
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import { Button, Link } from '@radix-ui/themes';

export default function Clerk() {
    return (
        <>
            <SignedOut>
                <Link href="/sign-in"><Button>Sign in</Button></Link>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
}