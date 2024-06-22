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
    sobreMim: z.string().min(1, 'Descrição deve ter no mínimo 100 caracteres'),
    empresasExcluidas: z.string().optional(),
    vagaExclusivaPCD: z.boolean().optional(),
    cargoRecenteAtual: z.string().optional(),
    cargoDesejado: z.string().optional(),
    experiencia: z.string().optional(),
    remoto: z.boolean().optional(),
    hibrido: z.boolean().optional(),
    presencial: z.boolean().optional(),
    clt: z.boolean().optional(),
    pj: z.boolean().optional(),
    btc: z.boolean().optional(),
    pcd: z.boolean().optional(),
    pagamentopj: z.string().optional(),
    pagamentoclt: z.string().optional(),
    pagamentobtc: z.string().optional(),
    pretensaoPJ: z.string().optional(),
    pretensaoCLT: z.string().optional(),
    estadoSelecionadoId: z.string().optional(),
    // anexoCurriculo: z.instanceof(File).optional(),
});
export type FormData = z.infer<typeof schema>;

interface FormularioCandidatoProps {
    candidatoId?: string;
}

const FormularioCandidato: React.FC<FormularioCandidatoProps> = ({ candidatoId }) => {
    const [stepper, setStepper] = useState<any>(1);
    const idCandidato = candidatoId ?? '';
    const { estados } = useFiltroCandidatoStore();

    const [inputStart, setInputStart] = useState<any>(20);
    const [inputEnd, setInputEnd] = useState<any>(40);

     const [inputStartClt, setInputStartClt] = useState<any>(20);
    const [inputEndClt, setInputEndClt] = useState<any>(40);

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });
    const queryClient = useQueryClient();
    const onSubmit = async (data: FormData) => {
        console.log('chamou', data);
        if (stepper < 3) {
            return;
        }

        const estadosComSelecao = estados.map((estado) => ({
            ...estado,
            selected: estado.id === data.estadoSelecionadoId,
        }));
        const formData = {
            sobreMim: data.sobreMim,
            empresasExcluidas: data.empresasExcluidas,
            vagaExclusivaPCD: data.vagaExclusivaPCD,
            cargoRecenteAtual: data.cargoRecenteAtual,
            cargoDesejado: data.cargoDesejado,
            experiencia: data.experiencia,
            estadoSelecionadoId: estadosComSelecao,
            pcd: data.pcd,
            clt: data.clt,
            pj: data.pj,
            btc: data.btc,
            remoto: data.remoto,
            hibrido: data.hibrido,
            presencial: data.presencial,
            pagamentopj: data.pagamentopj,
            pagamentoclt: data.pagamentoclt,
            pagamentobtc: data.pagamentobtc,
            pretensaoPJ: data.pretensaoPJ,
            pretensaoCLT: data.pretensaoCLT,
        };

        let response;

        const editarCandidato = makeRemoteEditCandidato(idCandidato);
        const addCandidato = makeRemoteAddCandidato();
        if (candidatoId) {
            response = await editarCandidato.edit(formData);
        } else {
            response = await addCandidato.add(formData);
        }

        // Atualiza o cache do React Query
        queryClient.setQueryData(['candidatos'], (oldData: ViewCandidatoModel[] | undefined) => {
            if (oldData) {
                if (candidatoId) {
                    // Atualiza candidato existente no cache
                    return oldData.map((candidato) => (candidato.id === response.id ? response : candidato));
                } else {
                    // Adiciona o nova candidato ao cache
                    return [...oldData, response];
                }
            }
        });
        return [response];
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
                                                        {...register('remoto')}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="custom_switch_checkbox1"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="relative text-white-dark checked:bg-none">Híbrido</span>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        {...register('hibrido')}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="custom_switch_checkbox1"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="relative text-white-dark checked:bg-none">Presencial</span>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        {...register('presencial')}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="custom_switch_checkbox1"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="estados">Selecione a região desejada para a vaga</label>
                                            <select {...register('estadoSelecionadoId')} id="estados" className="form-select text-white-dark" name="estados">
                                                {estados.map((estado: Estados) => (
                                                    <option key={estado.id} value={estado.id}>
                                                        {estado.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="empresasExcluidas">Empresas que você não quer que vejam seu currículo</label>
                                            <input {...register('empresasExcluidas')} id="empresasExcluidas" type="text" placeholder="Ex. Google" className="form-input" />
                                        </div>
                                        <div className="mb-5">
                                            <div className="mb-5">
                                                <label className="relative mb-2 font-bold checked:bg-none">Vaga exclusiva (PCD)</label>
                                                <div className="relative h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        {...register('vagaExclusivaPCD')}
                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                        id="vagaExclusivaPCD"
                                                    />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="anexoCurriculo">Anexar Currículo</label>
                                            <input id="anexoCurriculo" type="file" className="form-input" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mb-5">
                                {stepper === 2 && (
                                    <div>
                                        <div className="mb-5">
                                            <label htmlFor="cargoRecenteAtual">Cargo mais recente ou atual</label>
                                            <input {...register('cargoRecenteAtual')} id="cargoRecenteAtual" type="text" placeholder="Ex. Desenvolvedor Senior C#" className="form-input" />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="cargoDesejado">Cargo Desejado</label>
                                            <input {...register('cargoDesejado')} id="cargoDesejado" type="text" placeholder="Ex. Desenvolvedor Senior C#" className="form-input" />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="anosExperiencia">Anos de Experiência</label>
                                            <input {...register('experiencia')} id="anosExperiencia" type="number" placeholder="Ex. 4" className="form-input" />
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="sobreMim" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                                Sobre Mim
                                            </label>
                                            <textarea
                                                {...register('sobreMim')}
                                                id="sobreMim"
                                                className="block h-[250px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="Escreva informações sobre você e sua carreira...."
                                                required
                                            />
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
                                                            {...register('clt')}
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
                                                            {...register('pj')}
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
                                                <div className="mb-5 pt-5">
                                                    <Nouislider
                                                        connect
                                                        start={[1000, 4000]}
                                                        style={{ width: '100%' }}
                                                        behaviour="tap"
                                                        range={{ min: 0, max: 100000 }}
                                                        step={10}
                                                        onSlide={(render, handle, value, un, percent) => {
                                                            setInputStart(value[0].toFixed(0));
                                                            setInputEnd(value[1].toFixed(0));
                                                            const formattedValue = `${value[0].toFixed(2)} - ${value[1].toFixed(2)}`;
                                                            setValue('pretensaoPJ', formattedValue);
                                                        }}
                                                        // tooltips={true}
                                                    />
                                                    <div className="mb-4 mt-9 grid grid-cols-1 gap-8 lg:grid-cols-2">
                                                        <div className="mb-3">
                                                            <input
                                                                type="number"
                                                                className="form-input"
                                                                min="0"
                                                                disabled={true}
                                                                max="100000"
                                                                value={inputStart}
                                                                onChange={(e) => {
                                                                    setInputStart(e.target.value);
                                                                    setValue('pretensaoPJ', `${e.target.value} - ${inputEnd}`);
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="number"
                                                                className="form-input"
                                                                min="0"
                                                                disabled={true}
                                                                max="100000"
                                                                value={inputEnd}
                                                                onChange={(e) => {
                                                                    setInputEnd(e.target.value);
                                                                    setValue('pretensaoPJ', `${inputStart} - ${e.target.value}`);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-10">
                                                <p className="font-bold">Minha pretensão CLT</p>
                                            </div>
                                            <div className="mb-5">
                                                <div className="mb-5 w-full pt-5">
                                                    <Nouislider
                                                        connect
                                                        start={[1000, 4000]}
                                                        behaviour="tap"
                                                        range={{ min: 0, max: 100000 }}
                                                        step={10}
                                                        onSlide={(render: any, handle: any, value: any, un: any, percent: any) => {
                                                            const formattedValue = `${value[0].toFixed(2)} - ${value[1].toFixed(2)}`;
                                                            setValue('pretensaoCLT', formattedValue);
                                                            setInputStartClt(value[0].toFixed(0));
                                                            setInputEndClt(value[1].toFixed(0));
                                                        }}
                                                    />
                                                    <div className="mb-4 mt-9 grid grid-cols-1 gap-8 lg:grid-cols-2">
                                                        <div className="mb-3">
                                                            <input type="number" className="form-input" min="0" disabled={true} max="100000" value={inputStartClt} onChange={(e) => { setInputStartClt(e.target.value); setValue('pretensaoCLT', `${e.target.value} - ${inputEndClt}`); }} />
                                                        </div>
                                                        <div>
                                                            <input type="number" className="form-input" min="0" disabled={true} max="100000" value={inputEndClt} onChange={(e) => { setInputEndClt(e.target.value); setValue('pretensaoCLT', `${inputStartClt} - ${e.target.value}`); }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <div className="flex flex-row items-center gap-2">
                                                <p className="font-bold">Aceita receber pagamento em Bitcoin?</p>
                                            </div>
                                            <div className="mb-5 flex flex-row gap-2">
                                                <div className="relative h-6 w-12">
                                                    <input {...register('btc')} type="checkbox" className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="pagamentoBtc" />
                                                    <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <input name="valorBtc" type="text" placeholder="Ex. 0,039฿ " className="form-input" />
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
