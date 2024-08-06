import React from 'react';
interface TextInputProps {
  type: string;
  placeholder: string;
  id: string;
  required: boolean;
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  minLengthError: string;
  maxLengthError: string;
  validMessage: string;
  label: string;
  key: number;
}
const TextInput: React.FC<TextInputProps> = ({ ...formDatas }) => {
  const {
    type,
    placeholder,
    id,
    required,
    minLength,
    maxLength,
    pattern,
    minLengthError,
    maxLengthError,
    validMessage,
    label,
  } = formDatas;
  return (
    <div>
      <label>{label}</label>
      <input></input>
      <span>Success Message</span>
      <span>Error Message</span>
    </div>
  );
};

export default TextInput;
