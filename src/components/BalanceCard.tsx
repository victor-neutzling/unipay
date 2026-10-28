import { Eye, EyeOff } from "lucide-react";

type BalanceCardProps = { hidden: boolean; onToggle: () => void };

export function BalanceCard({ hidden, onToggle }: BalanceCardProps) {
  return (
    <section className="balance-card" aria-label="Saldo da conta">
      <div className="balance-copy">
        <span>Saldo disponível <button id="toggle-balance" className="balance-toggle" onClick={onToggle} aria-label={hidden ? "Mostrar saldo" : "Ocultar saldo"}>{hidden ? <Eye size={16} /> : <EyeOff size={16} />}</button></span>
        <strong>{hidden ? "R$ ••••••" : "R$ 8.425,60"}</strong>
        <small><span className="balance-arrow">↗</span> Seu dinheiro está pronto para você.</small>
      </div>
      <div className="balance-art"><div className="art-ring ring-a" /><div className="art-ring ring-b" /><span>u.</span></div>
      <div className="balance-foot"><span>CONTA UNIPAY <i /> FINAL 2048</span><span>✳ UNIPAY</span></div>
    </section>
  );
}
