export async function generateStaticParams() {
    return [{ params: {} }];
}

export default function Page() {
    return (
        <div className="flex h-full w-full flex-1 items-center justify-center">
            Sign in
        </div>
    );
}
