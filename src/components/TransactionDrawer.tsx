import { ArrowDownLeft, ArrowUpRight, X } from "lucide-react";
import type { Transaction } from "../api";

const formatMoney = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type TransactionDrawerProps = { transaction: Transaction; onClose: () => void };

export function TransactionDrawer({ transaction, onClose }: TransactionDrawerProps) {
  const incoming = transaction.kind === "in";
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="transaction-drawer" onClick={(event) => event.stopPropagation()} aria-label="Detalhes da movimentação">
        <div className="drawer-head"><span className="eyebrow">DETALHES DA MOVIMENTAÇÃO</span><button id="close-drawer" onClick={onClose} aria-label="Fechar detalhes"><X size={20} /></button></div>
        <div className={`drawer-icon ${transaction.kind}`}>{incoming ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}</div>
        <h2>{transaction.title}</h2>
        <p>{transaction.detail}</p>
        <strong className={`drawer-amount ${transaction.kind}`}>{incoming ? "+" : "−"} {formatMoney(transaction.amount)}</strong>
        <div className="drawer-info">
          <span>Data e horário<strong>{transaction.date}</strong></span>
          <span>Tipo de movimentação<strong>{incoming ? "Entrada" : "Saída"}</strong></span>
          <span>Identificador<strong>{transaction.id.toUpperCase()}</strong></span>
          <span>Status<strong className="receipt-status">Concluída</strong></span>
        </div>
        <button id="drawer-ok" className="drawer-done" onClick={onClose}>Tudo certo</button>
      </aside>
    </div>
  );
}
