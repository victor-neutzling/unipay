import { ArrowLeftRight, ArrowRight, Home, LogOut, Wallet } from "lucide-react";
import { Brand } from "./Brand";

type AccountSidebarProps = { onPix: () => void; onLogout: () => void };

export function AccountSidebar({ onPix, onLogout }: AccountSidebarProps) {
  return (
    <>
      <aside className="sidebar">
        <Brand className="side-brand" />
        <div className="side-label">MENU</div>
        <button id="nav-home" className="nav-item active"><Home size={17} /> Início</button>
        <button id="nav-pix" className="nav-item" onClick={onPix}><ArrowLeftRight size={17} /> Fazer um PIX</button>
        <button className="nav-item"><Wallet size={17} /> Cartões</button>
        <div className="side-bottom">
          <div className="help-card"><span>✳</span><strong>Estamos por aqui.</strong><small>Precisa de ajuda? Fale com a gente.</small><a href="#">Falar com suporte <ArrowRight size={13} /></a></div>
          <button id="logout" className="logout" onClick={onLogout}><LogOut size={16} /> Sair da conta</button>
        </div>
      </aside>
      <nav className="mobile-nav" aria-label="Navegação principal">
        <button className="active"><Home size={19} /><span>Início</span></button>
        <button onClick={onPix}><ArrowLeftRight size={19} /><span>PIX</span></button>
        <button><Wallet size={19} /><span>Cartões</span></button>
        <button onClick={onLogout}><LogOut size={19} /><span>Sair</span></button>
      </nav>
    </>
  );
}
