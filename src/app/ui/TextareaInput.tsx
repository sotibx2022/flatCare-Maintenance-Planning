import React from 'react';
interface TextAreaProps {
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
const TextareaInput: React.FC<TextAreaProps> = ({ ...formdats }) => {
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
  } = formdats;
  return (
    <div>
      <label>{label}</label>
      <textarea placeholder={placeholder} id={id}></textarea>
      <span>Success Message</span>
      <span>Error Message</span>
    </div>
  );
};

export default TextareaInput;
