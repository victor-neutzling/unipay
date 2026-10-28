import { ShieldCheck } from "lucide-react";
import { Brand } from "./Brand";

type SiteHeaderProps = { accountInitial?: string };

export function SiteHeader({ accountInitial }: SiteHeaderProps) {
  return (
    <header className="topbar">
      <Brand />
      {accountInitial ? (
        <div className="top-actions">
          <span className="secure"><ShieldCheck size={15} /> Ambiente seguro</span>
          <span className="avatar" aria-label="Conta de usuário">{accountInitial}</span>
        </div>
      ) : null}
    </header>
  );
}
