import { ViewVagasModel } from "@/domain/models/view-vagas-model";

export interface VagasContextType {
    recordsData: {
        ativas: ViewVagasModel[];
        encerradas: ViewVagasModel[];
    };
    currentDate: Date;
}

export interface VagasProviderProps {
    children: React.ReactNode;
}
