import {  useState } from 'react';
import Select from 'react-select';
import { useAuth } from '../../presentation/contexts/authContext';
import { GenericModal } from './modal-generics';



type RegistrationFormProps = {
    onSubmit: (option1: string, option2: string) => void;
};

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
    const options = [
      { value: 'linkedin', label: 'Por alguém ou por anúncio no linkedin' },
      { value: 'telegram', label: 'Grupos de vagas no telegram' },
      { value: 'indicacao', label: 'Indicação de amigos' },
      { value: 'outros', label: 'outros' },
    ];

    const options1 = [
      { value: 'salarios', label: 'Salários e Empregos' },
      { value: 'curriculos', label: 'Ver currículos' },
    ];

    const [selectedOption1, setSelectedOption1] = useState(options[0].value);
    const [selectedOption2, setSelectedOption2] = useState(options1[0].value);

    const handleOption1Change = (newValue: { value: string; label: string; } | null) => {
        if (newValue) {
            setSelectedOption1(newValue.value);
        }
    };

    const handleOption2Change = (newValue: { value: string; label: string; } | null) => {
        if (newValue) {
            setSelectedOption2(newValue.value);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(selectedOption1, selectedOption2);
    };

    return (
      <form onSubmit={handleSubmit}>
        <h5>Como você nos conheceu?</h5>
        <div className="mb-5">
          <Select defaultValue={options[0]} options={options} isSearchable={false} onChange={handleOption1Change} />
        </div>
        <h5>Qual seu objetivo?</h5>
        <div className="mb-5">
          <Select defaultValue={options1[0]} options={options1} isSearchable={false} onChange={handleOption2Change} />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Enviar
        </button>
      </form>
    );
};

export const RegistrationModal = () => {
    const {handleRegistration, setModal, modal, user} = useAuth();

    return (
      <GenericModal isOpen={modal === 'registration'} onClose={() => setModal(null)} title="Perguntas para te conhecer">
        <RegistrationForm onSubmit={(option1, option2) => handleRegistration(option1, option2)} />
      </GenericModal>
    );
};
