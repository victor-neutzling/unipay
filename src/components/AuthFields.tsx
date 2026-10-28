import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

type TextFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
};

export function TextField({ id, label, type = "text", placeholder, value, onChange, required = false, minLength }: TextFieldProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        minLength={minLength}
      />
    </>
  );
}

type PasswordFieldProps = { value: string; onChange: (value: string) => void; id?: string };

export function PasswordField({ value, onChange, id = "login-password" }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <label htmlFor={id}>Senha</label>
      <div className="password-wrap">
        <input id={id} type={visible ? "text" : "password"} placeholder="Sua senha" value={value} onChange={(event) => onChange(event.target.value)} required />
        <button type="button" className="eye" onClick={() => setVisible(!visible)} aria-label={visible ? "Ocultar senha" : "Mostrar senha"}>
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </>
  );
}

export function AccessHint() {
  return <div className="form-meta"><span><LockKeyhole size={13} /> Acesso protegido</span><a href="#" onClick={(event) => event.preventDefault()}>Esqueceu a senha?</a></div>;
}
