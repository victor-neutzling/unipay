import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { AccessHint, PasswordField, TextField } from "../components/AuthFields";
import { AuthLayout } from "../components/AuthLayout";
import { Brand } from "../components/Brand";
import { PrimaryButton } from "../components/PrimaryButton";
import { SiteHeader } from "../components/SiteHeader";

export type LoginPageProps = {
  onLogin: (event: FormEvent<HTMLFormElement>) => void;
  onRegister: () => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  busy: boolean;
  notice: string;
};

export function LoginPage({ onLogin, onRegister, email, setEmail, password, setPassword, error, busy, notice }: LoginPageProps) {
  return (
    <>
      <SiteHeader />
      <AuthLayout>
        <div className="mobile-brand"><Brand /></div>
        <span className="eyebrow">BEM-VINDA(O) DE VOLTA</span>
        <h2>Que bom ter<br />você por aqui.</h2>
        <p className="subtext">Acesse sua conta para continuar.</p>
        <form id="login-form" onSubmit={onLogin}>
          <TextField id="login-email" label="E-mail" type="email" placeholder="voce@email.com" value={email} onChange={setEmail} required />
          <PasswordField value={password} onChange={setPassword} />
          <AccessHint />
          {notice && <p className="success-msg" role="status">{notice}</p>}
          {error && <p className="error-msg" role="alert">{error}</p>}
          <PrimaryButton id="login-submit" type="submit" disabled={busy}>{busy ? "Entrando…" : "Entrar na minha conta"}</PrimaryButton>
        </form>
        <div className="divider"><span />ou<span /></div>
        <p className="signup-line">Ainda não tem uma conta? <button id="go-register" onClick={onRegister}>Abra sua conta <ArrowRight size={14} /></button></p>
        <p className="legal">Ao continuar, você concorda com nossos <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>.</p>
      </AuthLayout>
    </>
  );
}
