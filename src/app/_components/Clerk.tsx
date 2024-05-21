import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import { Button, Link } from '@radix-ui/themes';

// import Signup from './Signup';

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