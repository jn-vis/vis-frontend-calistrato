// store.ts
import create from 'zustand';

interface Estado {
  id: string;
  nome: string;
  selected: boolean;
}

interface StoreState {
  isRemoto: boolean;
  isHibrido: boolean;
  isPresencial: boolean;
  isPcd: boolean;
  isClt: boolean;
  isPj: boolean;
  isBtc: boolean;
  estadoSelecionadoId: string | undefined;
  estados: Estado[];
  toggleClt: () => void;
  togglePj: () => void;
  toggleBtc: () => void;
  togglePcd: () => void;
  toggleRemoto: () => void;
  toggleHibrido: () => void;
  togglePresencial: () => void;
  setRemoto: (value: boolean) => void;
  setHibrido: (value: boolean) => void;
  setPresencial: (value: boolean) => void;
  setClt: (value: boolean) => void;
  setPj: (value: boolean) => void;
  setBtc: (value: boolean) => void;
  setEstados: (estado: Estado[]) => void;
  setEstadoSelecionadoId: (id: string) => void;
}

const useFiltroCandidatoStore = create<StoreState>((set, get) => ({
  isRemoto: true,
  isHibrido: false,
  isPresencial: false,
  isPcd: false,
  isClt: false,
  isPj: false,
  isBtc: false,
  estadoSelecionadoId: undefined,
  estados: [
    { id: "1", nome: "Acre", selected: false },
    { id: "2", nome: "Alagoas", selected: false },
    { id: "3", nome: "Amapá", selected: false },
    { id: "4", nome: "Amazonas", selected: false },
    { id: "5", nome: "Bahia", selected: false },
  ],
  toggleClt: () => set({ isClt: !get().isClt, isPj: false, isBtc: false }),
  togglePj: () => set({ isPj: !get().isPj, isClt: false, isBtc: false }),
  toggleBtc: () => set({ isBtc: !get().isBtc, isClt: false, isPj: false }),
  togglePcd: () => set({ isPcd: !get().isPcd }),
  toggleRemoto: () => set({ isRemoto: !get().isRemoto, isHibrido: false, isPresencial: false }),
  toggleHibrido: () => set({ isHibrido: !get().isHibrido, isRemoto: false, isPresencial: false }),
  togglePresencial: () => set({ isPresencial: !get().isPresencial, isRemoto: false, isHibrido: false }),

  setRemoto: (value) => set({ isRemoto: value }),
  setHibrido: (value) => set({ isHibrido: value }),
  setPresencial: (value) => set({ isPresencial: value }),
  setClt: (value) => set({ isClt: value }),
  setPj: (value) => set({ isPj: value }),
  setBtc: (value) => set({ isBtc: value }),
  setEstados: (estados: Estado[]) => set({ estados }),
  setEstadoSelecionadoId: (id: string | undefined) => set((state) => ({
    estadoSelecionadoId: id,
    estados: state.estados.map(estado => ({
      ...estado,
      selected: estado.id === id
    }))
  })),
}));

export default useFiltroCandidatoStore;

