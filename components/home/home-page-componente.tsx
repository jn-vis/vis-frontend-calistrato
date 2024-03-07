import Link from 'next/link';
const HomePage = () => {
    return (
        <>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="panel flex justify-center items-center mt-6 h-[calc(100vh-16rem)]">
                <div className="mb-5 flex flex-col items-center justify-between dark:text-white-light">
                    <h5 className="text-lg font-semibold">Seja Bem Vindo a JobsNow</h5>
                    <p>Seu Buscador de currículos</p>
                </div>
            </div>
        </>
    );
};

export default HomePage;
