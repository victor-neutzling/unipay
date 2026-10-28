import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  register?: boolean;
};

export function AuthLayout({ children, register = false }: AuthLayoutProps) {
  return (
    <main className="auth-layout">
      <section className={`welcome-panel${register ? " register-panel" : ""}`}>
        <div className="welcome-content">
          <span className="eyebrow light"><span className="live-dot" /> {register ? "SUA NOVA CONTA COMEÇA AQUI" : "SEU DINHEIRO, MAIS LEVE"}</span>
          {register ? (
            <h1>Mais liberdade<br />para fazer o<br />que <em>importa.</em></h1>
          ) : (
            <h1>Uma vida mais<br /><em>simples</em> começa<br />por aqui.</h1>
          )}
          <p>{register ? "Abra sua conta digital em poucos passos. Sem complicação, sem tarifas escondidas." : "Seu dinheiro em movimento, com liberdade e tranquilidade em cada escolha."}</p>
          <div className="welcome-foot"><span>{register ? "ABRA SUA CONTA" : "FEITO PARA A VIDA REAL"}</span><span>{register ? "02 — 03" : "01 — 03"}</span></div>
        </div>
        <div className="orb orb-one" /><div className="orb orb-two" /><div className="panel-lines" />
      </section>
      <section className="form-side"><div className="auth-card">{children}</div></section>
    </main>
  );
}
