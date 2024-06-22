'use client';

import { makeRemoteViewCandidatos } from '@/main/factories/usecases/candidatos/remote-view-candidatos-factory';
import { IconPrinter } from '@/presentation/icons';
import IconPencilPaper from '@/presentation/icons/icon-pencil-paper';
import { useQuery } from '@tanstack/react-query';

const PreviewCandidatoComponent = () => {
    const { data, error } = useQuery({
        queryKey: ['vagas'],
        queryFn: async () => {
            const listaDeCandidatos = makeRemoteViewCandidatos();
            return listaDeCandidatos.findAll();
        },
    });

    return (
        <div>
            {data?.map((candidato) => (
                <div className="panel" key={candidato.id}>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-2 px-4">
                            <h2 className="text-2xl font-semibold uppercase">Daniel Calistrato</h2>
                        </div>
                        <div className="ml-4 flex flex-row justify-between gap-4">
                        <button type="button" className="btn btn-primary gap-2">
                    <IconPrinter />
                    Download Currículo
                </button>
                            <button type="button" className="btn btn-primary gap-2">
                                <IconPencilPaper />
                                Editar Currículo
                            </button>
                        </div>
                    </div>
                    <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
                    <div className="grid grid-cols-3 justify-between gap-6 lg:flex-row">
                        <div className="flex-1">
                            <div className="flex flex-col gap-4 space-y-1 text-white-dark">
                                <div>
                                    E-mail: <span className="font-semibold text-black dark:text-white">danesrj00@gmail.com</span>
                                </div>
                                <div>
                                    Sistema de trabalho Preferido: <span className="font-semibold text-black dark:text-white">{candidato.remoto ? 'Remoto' : 'Presencial'}</span>
                                </div>
                                <div>
                                    Minha Região: <span className="font-semibold text-black dark:text-white">São Paulo</span>
                                </div>
                                <div>
                                    Empresas não desejadas: <span className="font-semibold text-black dark:text-white">{candidato.empresasExcluidas}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col gap-4 space-y-1 text-white-dark">
                                <div>
                                    Cargo mais recente ou atual: <span className="font-semibold text-black dark:text-white">{candidato.cargoRecenteAtual}</span>
                                </div>
                                <div>
                                    Cargo Desejado: <span className="font-semibold text-black dark:text-white">{candidato.cargoDesejado}</span>
                                </div>
                                <div>
                                    Experiência: <span className="font-semibold text-black dark:text-white">{candidato.experiencia}</span>
                                </div>
                                <div>
                                    Tipo de Contrato preferido:{' '}
                                    <span className="font-semibold text-black dark:text-white">
                                        {candidato.clt === 'true' ? 'CLT' : 'PJ'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 space-y-1 text-white-dark">
                            <div>
                                Pretensão PJ: <span className="font-semibold text-black dark:text-white">{candidato.pretensaoPJ}</span>
                            </div>
                            <div>
                                Pretensão CLT: <span className="font-semibold text-black dark:text-white">{candidato.pretensaoCLT}</span>
                            </div>
                            <div>
                                Pretensão BTC: <span className="font-semibold text-black dark:text-white">0</span>
                            </div>
                            <div>
                                Reputação: <span className="font-semibold text-black dark:text-white">80%</span>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
                    <div className="mt-6">
                        <h2 className="font-semibold"> Sobre o Candidato</h2>
                        <textarea rows={4} disabled className="form-textarea h-[250px] ltr:rounded-l-none rtl:rounded-r-none">
                            {candidato.sobreMim}
                        </textarea>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PreviewCandidatoComponent;
