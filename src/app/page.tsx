import Tagline from "./_components/Tagline";

export default async function Home() {
    return (
        <>
            <div className="absolute h-full w-full">
                <div
                    className="h-[100vh]"
                    style={{
                        backgroundImage: "url(./bg.svg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Tagline />
                </div>
            </div>
        </>
    );
}
