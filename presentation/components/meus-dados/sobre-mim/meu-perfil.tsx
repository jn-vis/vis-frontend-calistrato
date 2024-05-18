import IconCalendar from '@/presentation/icons/icon-calendar';
import IconCoffee from '@/presentation/icons/icon-coffee';
import IconMail from '@/presentation/icons/icon-mail';
import IconMapPin from '@/presentation/icons/icon-map-pin';
import IconPencilPaper from '@/presentation/icons/icon-pencil-paper';
import Link from 'next/link';

const MeuPerfil = () => {
    return (
        <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Informações sobre mim</h5>
                    <Link href="/users/user-account-settings" className="btn btn-primary rounded-full p-2 ltr:ml-auto rtl:mr-auto">
                        <IconPencilPaper />
                    </Link>
                </div>
                <div className="mb-5">
                    <ul className="m-auto mt-5 flex max-w-[800px] flex-col space-y-4 font-semibold text-white-dark">
                        <li className="flex items-center gap-2">
                            <IconCoffee className="shrink-0" /> Cargo mais Recente ou Atual: Desenvolvedor FullStack
                        </li>
                        <li className="flex items-center gap-2">
                            <IconCalendar className="shrink-0" />
                            Anos de Experiência: 5 anos
                        </li>
                        <li className="flex items-center gap-2">
                            <IconMapPin className="shrink-0" />
                            Pretensão Salarial Pj: 12000
                        </li>
                        <li className="flex items-center gap-2">
                            <IconMapPin className="shrink-0" />
                            Pretensão Salarial Clt: 10000
                        </li>
                        <li className="flex items-center gap-2">
                            <IconMapPin className="shrink-0" />
                            Tipo de vagas: Ti
                        </li>
                        <li>
                            <button className="flex items-center gap-2">
                                <IconMail className="h-5 w-5 shrink-0" />
                                <span className="truncate text-primary">daniel@gmail.com</span>
                            </button>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Minhas Observações</h5>
                    <Link href="/users/user-account-settings" className="btn btn-primary rounded-full p-2 ltr:ml-auto rtl:mr-auto">
                        <IconPencilPaper />
                    </Link>
                </div>
                <div className="mb-5">
                    <div className="mt-2">
                        <textarea
                            name="descricao"
                            value="Sou um desenvolvedor que busco recolocação profissional, tenho ótimo relacionamento interpessoal"
                            rows={6}
                            id="descricao"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeuPerfil;
