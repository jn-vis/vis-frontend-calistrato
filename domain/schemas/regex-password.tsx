import React from 'react';

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const requirements = [
    { regex: /[0-9]/, label: '- Deve conter ao menos um número' },
    { regex: /[a-z]/, label: '- Deve conter ao menos uma letra minúscula' },
    { regex: /[A-Z]/, label: '- Deve conter ao menos uma letra maiúscula' },
    { regex: /[!@#&()–[\]{}:;',?/*~$^+=<>]/, label: '- Deve conter ao menos um caractere especial' },
    { regex: /.{8,}/, label: '- Deve conter no mínimo 8 caracteres' },
  ];

  return (
    <ul>
      {requirements.map((req, index) => (
        <li key={index} style={{ color: req.regex.test(password) ? 'green' : 'red' }}>
          {req.label}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRequirements;
