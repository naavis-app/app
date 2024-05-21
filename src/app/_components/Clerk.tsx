import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

// import Signup from './Signup';

export default function Clerk() {
    return (
        <ClerkProvider>
            <SignedOut>
            <SignInButton />
            </SignedOut>
            <SignedIn>
            <UserButton />
            </SignedIn>
      </ClerkProvider>
    );
}