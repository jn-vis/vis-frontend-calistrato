import Link from 'next/link';
const ComponentsDashboard = () => {

    return (
        <>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Home
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Pendente</span>
                    </li>
                </ul>
                </div>
        </>
    );
};

export default ComponentsDashboard;
