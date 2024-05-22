
export default function Page() {
    return (
        <div className="flex h-full w-full flex-1 
        items-center justify-center text-white"
        >
            Sign in
        </div>
    );
}


export async function generateStaticParams() {
    return [{ params: {} }];
}
