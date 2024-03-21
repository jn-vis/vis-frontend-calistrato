'use client';
import { getTranslation } from '@/i18n';
import React, { useState } from 'react';
import { estados } from '../../jsons-mock/estados';
import { pcd } from '../../jsons-mock/pcd';
import { tipoVaga } from '../../jsons-mock/tipo-vaga';
import Dropdown from '@/components/utils/dropdown';
import IconCaretDown from '@/components/icon/icon-caret-down';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ModalConfirmarExclusao from './modal-confirma-exclusao';
export const SobreMimComponente = () => {
    const { t } = getTranslation();

    const [checkHomeOffice, setCheckHomeOffice] = useState(true);
    const [checkPcd, setCheckPcd] = useState(false);

    const handleChangeHome = () => {
        setCheckHomeOffice(!checkHomeOffice);
    };

    const handleChangePcd = () => {
        setCheckPcd(!checkPcd);
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    return (
        <div className="pt-5">
                <div>
                    <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                        <h6 className="mb-5 text-lg font-bold">{t('information about me')}</h6>
                        <div className="mt-3 flex flex-row gap-6 pb-4 sm:col-span-2">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="btn btn-primary dropdown-toggle"
                                    button={
                                        <>
                                            Download
                                            <span>
                                                <IconCaretDown className="inline-block ltr:ml-1 rtl:mr-1" />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[170px]">
                                        <li>
                                            <button type="button">Arquivo</button>
                                        </li>
                                        <li>
                                            <button type="button">Texto</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                            {/* <ModalConfirmarExclusao>Excluir</ModalConfirmarExclusao> */}

                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <div>
                                        <label className="inline-flex cursor-pointer">
                                            <input type="checkbox" className="form-checkbox" onChange={handleChangeHome} checked={checkHomeOffice} />
                                            <span className="relative text-white-dark checked:bg-none">Somente Home Office</span>
                                        </label>
                                    </div>
                                    <label htmlFor="country">Selecione a região da Vaga requerida</label>
                                    <select disabled={checkHomeOffice} id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                        {estados.map((estado) => {
                                            return <option value={estado.id}>{estado.nome}</option>;
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <div>
                                        <label className="inline-flex cursor-pointer">
                                            <input checked={checkPcd} onChange={handleChangePcd} type="checkbox" className="form-checkbox" />
                                            <span className="relative text-white-dark checked:bg-none">Necessidades especiais (PCD)</span>
                                        </label>
                                    </div>
                                    <label htmlFor="country">Selecione a deficiência</label>
                                    <select disabled={!checkPcd} id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                        {pcd.map((pcd) => {
                                            return <option value={pcd.id}>{pcd.nome}</option>;
                                        })}
                                    </select>
                                </div>
                                {/* <div>
                                    <label className="inline-flex cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="relative text-white-dark checked:bg-none">Início Imediato</span>
                                    </label>
                                </div> */}
                                <div>
                                    <label htmlFor="address">Empresas que você não quer que vejam seu currículo</label>
                                    <input id="address" type="text" placeholder="Ex. Google" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="address">Anexar Currículo</label>
                                    <input id="address" type="file" placeholder="New York" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="location">Observações</label>
                                    <input id="location" type="text" placeholder="Escreva alguma coisa que achar necessário" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="phone">Cargo mais recente ou atual</label>
                                    <input id="phone" type="text" placeholder="Ex. Desenvolvedor Senior C#" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="email">Profissão ou função desejada</label>
                                    <input id="email" type="email" placeholder="Ex. Desenvolvedor Senior Java" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="web">Anos de Experiência</label>
                                    <input id="web" type="text" placeholder="Ex. 4 anos" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="country">Tipo de Vaga</label>
                                    <select id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                        {tipoVaga.map((vaga) => (
                                            <option value={vaga.id}>{vaga.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="web">Pretensão Mensal Pessoa Jurídica</label>
                                    <input id="web" type="text" placeholder="Ex. R$15.000,00" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="web">Pretensão Mensal Carteira Assinada</label>
                                    <input id="web" type="text" placeholder="Ex. R$10.000,00" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="web">Pretensão Mensal BTC</label>
                                    <input id="web" type="text" placeholder="Ex. 0,039฿ " className="form-input" />
                                </div>

                                <div className="mt-3 sm:col-span-2">
                                    <button type="button" className="btn btn-primary">
                                        Salvar Currículo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

        </div>
    );
};
