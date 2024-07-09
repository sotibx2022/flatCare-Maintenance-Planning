import React, { useState } from 'react'
interface PasswordInputProps {
  placeholder: string,
  value: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
}
const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, name, onChange, onBlur }) => {
  const [showPassword, setShowPassword] = useState(false);
  let inputType = showPassword ? "text" : "password";
  return (
    <div className='form_Item'>
      <input type={inputType} placeholder={placeholder} value={value} name={name} onChange={onChange} autoComplete='off' onBlur={onBlur}></input>
      <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
    </div>
  )
}

export default PasswordInput