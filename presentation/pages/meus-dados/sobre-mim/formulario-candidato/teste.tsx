'use client';
import PanelCodeHighlight from '@/presentation/utils/panel-code-highlight';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import IconHome from '@/presentation/icons/icon-home';
import IconUser from '@/presentation/icons/icon-user';
import { IconListCheck } from '@/presentation/icons';
import useFiltroCandidatoStore from '@/presentation/pages/meu-recrutamento/minhas-vagas/store/filtro-candidato-store';
import { Estados } from '@/domain/models/view-vagas-model';
import { makeRemoteAddCandidato } from '@/main/factories/usecases/candidatos/remote-add-candidatos-factory';
import { makeRemoteEditCandidato } from '@/main/factories/usecases/candidatos/remote-edit-candidatos-factory';
import { ViewCandidatoModel } from '@/domain/models/view-canditato-model';
import { makeRemoteViewCandidatos } from '@/main/factories/usecases/candidatos/remote-view-candidatos-factory';
import Nouislider from '@x1mrdonut1x/nouislider-react';
import 'nouislider/distribute/nouislider.css';

export const schema = z.object({
    // tipoVagaBuscada: z.enum(['Remoto', 'Híbrido', 'Presencial']),
    // estadoSelecionadoId: z.string().optional(),
    empresasExcluidas: z.string().optional(),
    vagaExclusivaPCD: z.boolean(),
    // anexoCurriculo: z.instanceof(File).optional(),
    sobreMim: z.string().min(100, 'Descrição deve ter no mínimo 100 caracteres'),
    cargoRecenteAtual: z.string(),
    cargoDesejado: z.string(),
    experiencia: z.string(),
    profissaoFuncaoDesejada: z.string(),
    anosExperiencia: z.number(),
    // tipoContrato: z.enum(['CLT', 'PJ']),
    // pretensaoPJ: z.string().optional(),
    // pretensaoCLT: z.number().optional(),
    // pagamentoBtc: z.boolean(),
    // valorBtc: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;

interface FormularioCandidatoProps {
    candidatoId?: string;
}

const FormularioCandidato: React.FC<FormularioCandidatoProps> = ({ candidatoId }) => {
    const [stepper, setStepper] = useState<any>(1);
    const idCandidato = candidatoId ?? '';
    const router = useRouter();
    const {
        estadoSelecionadoId,
        estados,
        setRemoto,
        setPresencial,
        setHibrido,
        setClt,
        setPj,
        setBtc,
        setEstadoSelecionadoId,
        isRemoto,
        isPresencial,
        isHibrido,
        isClt,
        isPj,
        isBtc,
        isPcd,
        toggleBtc,
        toggleClt,
        togglePj,
        toggleRemoto,
        togglePresencial,
        toggleHibrido,
        togglePcd,
    } = useFiltroCandidatoStore();

    const { data, error } = useQuery({
        queryKey: ['vagas'],
        queryFn: async () => {
            const listaDeCandidatos = makeRemoteViewCandidatos();
            return listaDeCandidatos.findAll();
        },
    });

    const findCandidatoById = (id: string) => {
        return data?.find((candidato) => candidato.id === id);
    };

    const {
        // register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    useEffect(() => {
        if (idCandidato) {
            const candidatoData = findCandidatoById(idCandidato);
            if (candidatoData) {
                (Object.keys(candidatoData) as Array<keyof FormData>).forEach((key) => {
                    setValue(key, candidatoData[key]);
                });
                setClt(candidatoData.clt);
                setPj(candidatoData.pj);
                setBtc(candidatoData.btc);
                setRemoto(candidatoData.remoto);
                setHibrido(candidatoData.hibrido);
                setPresencial(candidatoData.presencial);
                setEstadoSelecionadoId(candidatoData.estados.find((estado) => estado.selected)?.id ?? '');
            }
        }
    }, [idCandidato, setValue, findCandidatoById, useFiltroCandidatoStore]);

    const resetFilters = () => {
        setRemoto(false);
        setPresencial(false);
        setHibrido(false);
        setClt(false);
        setPj(false);
        setBtc(false);
        setEstadoSelecionadoId('');
    };

    const queryClient = useQueryClient();
    const onSubmit = async (data: any) => {
        console.log('chamou' ,data)
        // if (stepper < 3) {
        //     return;
        // }
        // const estadosComSelecao = estados.map((estado) => ({
        //     ...estado,
        //     selected: estado.id === estadoSelecionadoId,
        // }));
        // const formData = {
        //     // id: idCandidato,
        //     // tipoVagaBuscada: isRemoto ? 'Remoto' : isHibrido ? 'Híbrido' : 'Presencial',
        //     // estadoSelecionadoId: estadoSelecionadoId,
        //     // empresasExcluidas: data.empresasExcluidas,
        //     vagaExclusivaPCD: isPcd,
        //     // anexoCurriculo: data.anexoCurriculo,
        //     sobreMim: data.sobreMim,
        //     cargoRecenteAtual: data.cargoRecenteAtual,
        //     cargoDesejado: data.cargoDesejado,
        //     experiencia: data.experiencia,
        //     profissaoFuncaoDesejada: data.profissaoFuncaoDesejada,
        //     anosExperiencia: data.anosExperiencia,
        //     // tipoContrato: isClt ? 'CLT' : 'PJ',
        //     // pretensaoPJ: data.pretensaoPJ ?? '',
        //     // pretensaoCLT: data.pretensaoCLT ?? 0,
        //     // pagamentoBtc: isBtc,
        //     // valorBtc: data.valorBtc ?? '',
        // };

        // let response;

        // const editarCandidato = makeRemoteEditCandidato(idCandidato);
        // const addCandidato = makeRemoteAddCandidato();
        // if (candidatoId) {
        //     response = await editarCandidato.edit(formData);
        // } else {
        //     response = await addCandidato.add(formData);
        // }

        // // Atualiza o cache do React Query
        // queryClient.setQueryData(['candidatos'], (oldData: ViewCandidatoModel[] | undefined) => {
        //     if (oldData) {
        //         if (candidatoId) {
        //             // Atualiza candidato existente no cache
        //             return oldData.map((candidato) => (candidato.id === response.id ? response : candidato));
        //         } else {
        //             // Adiciona o nova candidato ao cache
        //             return [...oldData, response];
        //         }
        //     }

        //     return [response];
        // });

        // reset();
        // resetFilters();

        // router.push('/meu-recrutamento/minhas-vagas');
        // return response;
    };

    const nextStep = async () => {
        setStepper(stepper + 1);
    };

    const widthMap = {
        1: 'w-[10%]',
        2: 'w-[50%]',
        3: 'w-[85%]',

        default: 'w-[90%]',
    };

    const width = widthMap[stepper as keyof typeof widthMap] || widthMap.default;

    // const [valuePj, setValuePj] = useState({
    //     minimo: 500,
    //     maximo: 4000,
    // });

    // const [valueClt, setValueClt] = useState({
    //     minimo: 500,
    //     maximo: 4000,
    // });

    // const onSidePj = (render: any, handle: any, value: any, un: any, percent: any) => {
    //     setValuePj({
    //         minimo: value[0],
    //         maximo: value[1],
    //     });
    // };

    // const onSideClt = (render: any, handle: any, value: any, un: any, percent: any) => {
    //     setValueClt({
    //         minimo: value[0],
    //         maximo: value[1],
    //     });
    // };

    return (
        <PanelCodeHighlight title="Cadastro Candidato">
            <div className="mb-5">
                <div className="inline-block w-full">
                    <div className="relative z-[1] overflow-x-auto">
                        <div className={`${width} absolute top-[30px] -z-[1] m-auto h-1 w-[15%] bg-primary transition-[width] ltr:left-0 rtl:right-0`}></div>
                        <ul className="mb-5 grid min-w-[500px] grid-cols-3">
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${stepper === 1 ? '!border-primary !bg-primary text-white' : ''}
                    flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={nextStep}
                                >
                                    <IconHome />
                                </button>
                                <span className={`${stepper === 1 ? 'text-primary ' : ''}text-center mt-2 block`}>Dados Gerais</span>
                            </li>
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${stepper === 2 ? '!border-primary !bg-primary text-white' : ''}
                                                flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={nextStep}
                                >
                                    <IconUser className="h-5 w-5" />
                                </button>
                                <span className={`${stepper === 2 ? 'text-primary ' : ''}text-center mt-2 block`}>Dados da Carreira</span>
                            </li>
                            <li className="mx-auto flex flex-col items-center">
                                <button
                                    type="button"
                                    className={`${stepper === 3 ? '!border-primary !bg-primary text-white' : ''}
                                                flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                                    onClick={nextStep}
                                >
                                    <IconListCheck className="h-5 w-5" />
                                </button>
                                <span className={`${stepper === 3 ? 'text-primary ' : ''}text-center mt-2 block`}>Dados Salariais</span>
                            </li>
                        </ul>
                    </div>
                    <div>

<form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                {stepper === 1 && (
                                    <div className="mb-5">
                                        <label htmlFor="web" className="font-bold">
                                            Tipo de vaga buscada
                                        </label>
                                        <div className="mb-5 flex flex-row gap-6">
                                            <div>
                                                <span className="relative text-white-dark checked:bg-none">Remoto</span>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        // {...register('tipoVagaBuscada', { setValueAs: () => 'Remoto' })}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="remoto"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="relative text-white-dark checked:bg-none">Híbrido</span>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        // {...register('tipoVagaBuscada', { setValueAs: () => 'Híbrido' })}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="hibrido"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="relative text-white-dark checked:bg-none">Presencial</span>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        // {...register('tipoVagaBuscada', { setValueAs: () => 'Presencial' })}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="presencial"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="estados">Selecione a região desejada para a vaga</label>
                                            <select
                                            //  {...register('estadoSelecionadoId')}
                                            id="estados" className="form-select text-white-dark" name="estados">
                                                {estados.map((estado: Estados) => (
                                                    <option key={estado.id} value={estado.id}>
                                                        {estado.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="empresasExcluidas">Empresas que você não quer que vejam seu currículo</label>
                                            <input
                                            // {...register('empresasExcluidas')}
                                             id="empresasExcluidas" type="text" placeholder="Ex. Google" className="form-input" />
                                        </div>
                                        <div className="mb-5">
                                            <div className="mb-5">
                                                <label className="relative mb-2 font-bold checked:bg-none">Vaga exclusiva (PCD)</label>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        // {...register('vagaExclusivaPCD')}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="vagaExclusivaPCD"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="anexoCurriculo">Anexar Currículo</label>
                                            <input
                                            //  {...register('anexoCurriculo')}
                                             id="anexoCurriculo" type="file" className="form-input" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mb-5">
                                {stepper === 2 && (
                                    <div>
                                        <div className="mb-5">
                                            <label htmlFor="cargoRecenteAtual">Cargo mais recente ou atual</label>
                                            <input
                                            // {...register('cargoRecenteAtual')}

                                            id="cargoRecenteAtual" type="text" placeholder="Ex. Desenvolvedor Senior C#" className="form-input" />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="cargoDesejado">Cargo Desejado</label>
                                            <input
                                            // {...register('cargoDesejado')}
                                             id="cargoDesejado" type="text" placeholder="Ex. Desenvolvedor Senior C#" className="form-input" />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="anosExperiencia">Anos de Experiência</label>
                                            <input
                                            // {...register('anosExperiencia', { valueAsNumber: true })}
                                             id="anosExperiencia" type="number" placeholder="Ex. 4" className="form-input" />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="sobreMim" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Sobre Mim
                                            </label>
                                            <textarea
                                                // {...register('sobreMim')}
                                                id="sobreMim"
                                                className="block h-[250px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="Escreva informações sobre você e sua carreira...."
                                                required
                                            />
                                            {/* {errors.sobreMim && <p className="mt-1 text-red-500">{errors.sobreMim.message}</p>} */}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                {stepper === 3 && (
                                    <div>
                                        <div className="mb-5">
                                            <label className="relative mb-2 font-bold checked:bg-none">Tipo de Contrato</label>
                                            <div className="flex flex-row gap-8">
                                                <div className="mb-5 text-center">
                                                    <span className="relative text-center text-white-dark checked:bg-none">CLT</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            checked={isClt}
                                                            onChange={toggleClt}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>
                                                <div className="mb-5 text-center">
                                                    <span className="relative text-white-dark checked:bg-none">PJ</span>
                                                    <div className="relative h-6 w-12">
                                                        <input
                                                            checked={isPj}
                                                            onChange={togglePj}
                                                            type="checkbox"
                                                            className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                            id="custom_switch_checkbox1"
                                                        />
                                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-10">
                                                <p className="font-bold">Minha pretensão PJ</p>
                                            </div>
                                            <div className="mb-5">
                                                {/* <div className="mb-5 pt-5">
                                                    <Nouislider
                                                        connect
                                                        start={[1000, 4000]}
                                                        behaviour="tap"
                                                        range={{
                                                            min: [0],
                                                            '10%': [500, 500],
                                                            '50%': [4000, 1000],
                                                            max: [100000],
                                                        }}
                                                        // onSlide={onSidePj}
                                                        onSlide={(render: any, handle: any, value: any, un: any, percent: any) => {
                                                            setValue('pretensaoPJ', `${value[0]} - ${value[1]}`);
                                                        }}
                                                        tooltips={true}
                                                    />
                                                </div> */}
                                            </div>
                                            <div className="mb-10">
                                                <p className="font-bold">Minha pretensão CLT</p>
                                            </div>
                                            <div className="mb-5">
                                                {/* <div className="mb-5 w-full pt-5">
                                                    <Nouislider
                                                        connect
                                                        start={[1000, 4000]}
                                                        behaviour="tap"
                                                        range={{
                                                            min: [0],
                                                            '10%': [500, 500],
                                                            '50%': [4000, 1000],
                                                            max: [100000],
                                                        }}
                                                        // onSlide={onSideClt}
                                                        onSlide={(render: any, handle: any, value: any, un: any, percent: any) => {
                                                            setValue('pretensaoCLT', value[1]);
                                                        }}
                                                        tooltips={true}
                                                    />
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <div className="flex flex-row items-center gap-2">
                                                <p className="font-bold">Aceita receber pagamento em Bitcoin?</p>
                                            </div>
                                            <div className="mb-5 flex flex-row gap-2">
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        checked={isBtc}
                                                        // {...register('pagamentoBtc')}
                                                        onChange={toggleBtc}
                                                        type="checkbox"
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="pagamentoBtc"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <input
                                                // {...register('valorBtc')}
                                                 name="valorBtc" type="text" placeholder="Ex. 0,039฿ " className="form-input" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className={`btn btn-primary ${stepper === 1 ? 'hidden' : ''}`} onClick={() => setStepper(stepper > 1 ? stepper - 1 : 1)}>
                                    Voltar
                                </button>
                                {stepper < 3 ? (
                                    <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={nextStep}>
                                        Avançar
                                    </button>
                                ) : null}
                                {stepper === 3 ? (
                                    <button type="submit" className="btn btn-primary">
                                        Salvar Curriculo
                                    </button>
                                ) : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default FormularioCandidato;
