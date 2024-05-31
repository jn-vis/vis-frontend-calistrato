import { ViewVagasModel } from "@/domain/models/view-vagas-model";
import {Estados } from "@/domain/vagas/usecases/edit-vagas";

export interface VagasContextType {
    recordsData: {
        ativas: ViewVagasModel[];
        encerradas: ViewVagasModel[];
    };
    currentDate: Date;
    findVagaById: (id: string) => ViewVagasModel | undefined;
}

export interface VagasProviderProps {
    children: React.ReactNode;
}
