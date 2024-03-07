import IconX from '@/components/icon/icon-x';
import { Transition, Dialog } from '@headlessui/react';
import  { Fragment, useState } from 'react';

type ModalConfirmarExclusaoProps = {
    label: string;
};

const ModalConfirmarExclusao: React.FC<ModalConfirmarExclusaoProps> = ({ label }) => {
    const [modal1, setModal1] = useState(false);
    return (
        <div className="mb-5">
        <div className="flex items-center justify-center">
            <button type="button" className="btn btn-primary dropdown-toggle"  onClick={() => setModal1(true)}>
               {label}
            </button>
        </div>
        <Transition appear show={modal1} as={Fragment}>
            <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <div className="text-lg font-bold">Confirme a exclusão</div>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <p>
                                        Tem certeza que deseja realmente excluir?
                                    </p>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                            Não
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal1(false)}>
                                            Sim
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
     );
}

export default ModalConfirmarExclusao;
