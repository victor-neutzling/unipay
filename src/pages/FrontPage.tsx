import { useEffect, useState } from "react";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { fakeApi, type Transaction, type User } from "../api";
import { AccountSidebar } from "../components/AccountSidebar";
import { BalanceCard } from "../components/BalanceCard";
import { TransactionDrawer } from "../components/TransactionDrawer";
import { TransactionList } from "../components/TransactionList";

type FrontPageProps = { user: User; onPix: () => void; onLogout: () => void };

export function FrontPage({ user, onPix, onLogout }: FrontPageProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [balanceHidden, setBalanceHidden] = useState(false);

  useEffect(() => {
    fakeApi.getTransactions().then(setTransactions);
  }, []);

  return (
    <main className="dashboard">
      <AccountSidebar onPix={onPix} onLogout={onLogout} />
      <section className="dash-main">
        <div className="dash-header">
          <div><span className="eyebrow">QUARTA-FEIRA, 28 DE OUTUBRO</span><h1>Bom dia, {user.name.split(" ")[0]} <span className="wave">✳</span></h1><p>Aqui está o resumo da sua conta.</p></div>
          <div className="dash-user"><span className="online-dot" /> Conta pessoal <span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span></div>
        </div>
        <BalanceCard hidden={balanceHidden} onToggle={() => setBalanceHidden(!balanceHidden)} />
        <div className="quick-row">
          <button id="make-pix" className="quick-action pix-action" onClick={onPix}><span className="quick-icon">✳</span><span><strong>Fazer PIX</strong><small>Envie em segundos</small></span><ArrowRight size={17} /></button>
          <button className="quick-action"><span className="quick-icon pale">＋</span><span><strong>Adicionar dinheiro</strong><small>Traga dinheiro pra cá</small></span><ArrowRight size={17} /></button>
        </div>
        <TransactionList transactions={transactions} user={user} onSelect={setSelectedTransaction} />
        <footer className="dash-footer"><span>UniPay Instituição de Pagamento S.A. · CNPJ 00.000.000/0001-00</span><span>Feito para a vida real <span className="footer-star">✳</span></span></footer>
      </section>
      {selectedTransaction && <TransactionDrawer transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
    </main>
  );
}
