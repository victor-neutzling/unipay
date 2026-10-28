import type { FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { TextField } from "../components/AuthFields";
import { AuthLayout } from "../components/AuthLayout";
import { PrimaryButton } from "../components/PrimaryButton";
import { SiteHeader } from "../components/SiteHeader";

export type RegisterPageProps = {
  onRegister: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  busy: boolean;
};

export function RegisterPage({ onRegister, onBack, name, setName, email, setEmail, password, setPassword, error, busy }: RegisterPageProps) {
  return (
    <>
      <SiteHeader />
      <AuthLayout register>
        <button id="back-login" className="back-link" onClick={onBack}><ArrowLeft size={16} /> Voltar ao login</button>
        <span className="eyebrow">CADASTRO GRATUITO</span>
        <h2>Vamos começar<br />pelo começo.</h2>
        <p className="subtext">Preencha seus dados para abrir sua conta.</p>
        <form id="register-form" onSubmit={onRegister}>
          <TextField id="register-name" label="Nome completo" placeholder="Como podemos te chamar?" value={name} onChange={setName} required minLength={2} />
          <TextField id="register-email" label="E-mail" type="email" placeholder="voce@email.com" value={email} onChange={setEmail} required />
          <TextField id="register-password" label="Crie sua senha" type="password" placeholder="Mínimo de 4 caracteres" value={password} onChange={setPassword} required minLength={4} />
          <div className="pix-notice"><span className="pix-icon">✳</span><span><strong>Sua chave PIX será criada no cadastro</strong><small>Vamos usar seu e-mail como chave PIX.</small></span></div>
          {error && <p className="error-msg" role="alert">{error}</p>}
          <PrimaryButton id="register-submit" type="submit" disabled={busy}>{busy ? "Criando conta…" : "Criar minha conta"}</PrimaryButton>
        </form>
        <p className="legal">Seus dados são protegidos e criptografados.</p>
      </AuthLayout>
    </>
  );
}
