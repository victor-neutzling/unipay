import type { ChangeEvent } from "react";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { PrimaryButton } from "../components/PrimaryButton";
import { Brand } from "../components/Brand";
import type { PixStep } from "../types";

const formatMoney = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type PixPageProps = {
  step: PixStep;
  setStep: (step: PixStep) => void;
  pixKey: string;
  setPixKey: (key: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  error: string;
  busy: boolean;
  receipt: string;
  onTransfer: () => void;
  onHome: () => void;
};

export function PixPage(props: PixPageProps) {
  const { step, setStep, pixKey, setPixKey, amount, setAmount, error, busy, receipt, onTransfer, onHome } = props;
  const numericAmount = Number(amount.replace(",", "."));
  const goBack = () => step === "key" ? onHome() : setStep("key");
  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value.replace(/[^\d,.]/g, ""));

  return (
    <main className="pix-layout">
      <header className="pix-top"><button id="pix-back" className="back-link" onClick={goBack}><ArrowLeft size={16} /> Voltar</button><Brand className="pix-brand" /><span className="secure"><ShieldCheck size={15} /> Ambiente seguro</span></header>
      {step !== "done" && <div className="progress"><span className="done" /><span className={step === "amount" ? "done" : ""} /></div>}
      <div className="pix-content">
        {step === "key" && <>
          <span className="step-label">PIX <span>·</span> PASSO 1 DE 2</span>
          <h1>Pra quem vai<br />esse PIX?</h1>
          <p>Digite a chave PIX de quem vai receber.</p>
          <label htmlFor="pix-recipient-key">Chave PIX do destinatário</label>
          <div className="pix-input-wrap"><span>✳</span><input id="pix-recipient-key" value={pixKey} onChange={(event) => setPixKey(event.target.value)} placeholder="CPF, e-mail, telefone ou chave aleatória" autoComplete="off" /></div>
          {error && <p className="error-msg" role="alert">{error}</p>}
          <div className="tip"><ShieldCheck size={17} /><span><strong>Confira os dados antes de continuar.</strong><small>Você poderá revisar tudo antes de confirmar.</small></span></div>
          <PrimaryButton id="pix-next-key" disabled={!pixKey.trim()} onClick={() => setStep("amount")}>Continuar</PrimaryButton>
          <div className="pix-trust"><LockKeyhole size={13} /> Suas transações são protegidas por criptografia</div>
        </>}
        {step === "amount" && <>
          <span className="step-label">PIX <span>·</span> PASSO 2 DE 2</span>
          <h1>Quanto você<br />quer enviar?</h1>
          <p>O valor será transferido na hora.</p>
          <label htmlFor="pix-amount-input">Valor do PIX</label>
          <div className="amount-input-wrap"><span>R$</span><input id="pix-amount-input" inputMode="decimal" value={amount} onChange={updateAmount} placeholder="0,00" autoFocus /></div>
          <div className="recipient-pill"><span className="recipient-avatar">{pixKey.slice(0, 1).toUpperCase()}</span><span><small>ENVIANDO PARA</small><strong>{pixKey}</strong></span><button onClick={() => setStep("key")} aria-label="Editar chave PIX"><ArrowRight size={15} /></button></div>
          {error && <p className="error-msg" role="alert">{error}</p>}
          <PrimaryButton id="pix-confirm" disabled={!numericAmount || busy} onClick={onTransfer}>{busy ? "Enviando…" : "Confirmar PIX"}</PrimaryButton>
          <div className="pix-trust"><LockKeyhole size={13} /> Confira o valor e destinatário antes de confirmar</div>
        </>}
        {step === "done" && <div className="done-state">
          <div className="done-check"><Check size={34} /></div><span className="step-label">PIX REALIZADO</span>
          <h1>Pronto. Foi<br />rapidinho, né?</h1><p>Seu PIX de <strong>{formatMoney(numericAmount)}</strong> foi enviado.</p>
          <div className="receipt"><span>DESTINATÁRIO<strong>{pixKey}</strong></span><span>VALOR<strong>{formatMoney(numericAmount)}</strong></span><span>COMPROVANTE<strong>{receipt}</strong></span><span>STATUS<strong className="receipt-status">Concluído</strong></span></div>
          <PrimaryButton id="pix-finish" onClick={onHome}>Voltar para o início</PrimaryButton>
        </div>}
      </div>
    </main>
  );
}
