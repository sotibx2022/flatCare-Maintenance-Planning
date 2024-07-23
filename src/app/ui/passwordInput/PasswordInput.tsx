import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
interface PasswordInputProps {
  placeholder: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  id,
  onChange,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  return (
    <div className="form_Item" style={{ position: 'relative' }}>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        name={id}
        onChange={onChange}
        autoComplete="off"
        onBlur={onBlur}
        style={{ paddingRight: '30px', paddingLeft: '30px' }}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#29030d',
        }}
      ></span>
    </div>
  );
};

export default PasswordInput;
