import { ArrowDownLeft, ArrowRight, ArrowUpRight, ChevronRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Transaction, User } from "../api";

const formatMoney = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type TransactionListProps = { transactions: Transaction[]; user: User; onSelect: (transaction: Transaction) => void };

export function TransactionList({ transactions, user, onSelect }: TransactionListProps) {
  const [copied, setCopied] = useState(false);
  const copyPixKey = async () => {
    await navigator.clipboard?.writeText(user.pixKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="statement">
      <div className="statement-heading"><div><span className="eyebrow">MOVIMENTAÇÕES</span><h2>Seu extrato</h2></div><button className="see-all">Ver tudo <ArrowRight size={15} /></button></div>
      <div className="statement-list">
        {transactions.map((transaction) => {
          const incoming = transaction.kind === "in";
          return (
            <button key={transaction.id} className="transaction" id={`transaction-${transaction.id}`} onClick={() => onSelect(transaction)}>
              <span className={`tx-icon ${transaction.kind}`}>{incoming ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</span>
              <span className="tx-main"><strong>{transaction.title}</strong><small>{transaction.detail}</small></span>
              <span className="tx-date">{transaction.date}</span>
              <strong className={`tx-amount ${transaction.kind}`}>{incoming ? "+" : "−"} {formatMoney(transaction.amount)}</strong>
              <ChevronRight className="tx-chevron" size={16} />
            </button>
          );
        })}
      </div>
      <div className="pix-key-row"><span className="pix-key-symbol">✳</span><span><small>SUA CHAVE PIX</small><strong id="account-pix-key">{user.pixKey}</strong></span><button id="copy-pix-key" onClick={copyPixKey}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copiada" : "Copiar"}</button></div>
    </section>
  );
}
