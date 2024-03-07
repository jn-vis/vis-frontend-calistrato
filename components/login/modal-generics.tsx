import IconX from '@/components/icon/icon-x';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface GenericsModaisProps {
    isOpen: boolean;
    onClose: () => void;
    title:string
    children:any
    infoModalLogin?:string
}

export const GenericModal = ({ isOpen, onClose, title, children, infoModalLogin }: GenericsModaisProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
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
                            <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 px-4 py-1 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                    <h5>{title}</h5>
                                    <button type="button" onClick={onClose} className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">{children}</div>
                                <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                                    <p className="text-center text-sm text-white-dark dark:text-white-dark/70">{infoModalLogin}</p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
