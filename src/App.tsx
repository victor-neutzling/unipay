import { useState, type FormEvent } from "react";
import { fakeApi, type User } from "./api";
import { FrontPage } from "./pages/FrontPage";
import { LoginPage } from "./pages/LoginPage";
import { PixPage } from "./pages/PixPage";
import { RegisterPage } from "./pages/RegisterPage";
import type { PageName, PixStep } from "./types";

export default function App() {
  const [page, setPage] = useState<PageName>("login");
  const [pixStep, setPixStep] = useState<PixStep>("key");
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [recipientKey, setRecipientKey] = useState("");
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const account = await fakeApi.login(email, password);
      setUser(account);
      setPassword("");
      setPage("home");
    } catch (loginError) {
      setError((loginError as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const account = await fakeApi.register(name, email);
      setNotice(`Cadastro realizado! Sua chave PIX é ${account.pixKey}`);
      setPassword("");
      setPage("login");
    } catch (registrationError) {
      setError((registrationError as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
    setPassword("");
  };

  const handlePixTransfer = async () => {
    setBusy(true);
    setError("");
    try {
      const result = await fakeApi.transferPix(recipientKey, Number(amount.replace(",", ".")));
      setReceipt(result.id);
      setPixStep("done");
    } catch (transferError) {
      setError((transferError as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (page === "register") {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onBack={() => { setError(""); setPage("login"); }}
        name={name} setName={setName}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        error={error} busy={busy}
      />
    );
  }

  if (page === "home" && user) {
    return <FrontPage user={user} onPix={() => { setError(""); setPixStep("key"); setRecipientKey(""); setAmount(""); setPage("pix"); }} onLogout={handleLogout} />;
  }

  if (page === "pix") {
    return (
      <PixPage
        step={pixStep} setStep={setPixStep}
        pixKey={recipientKey} setPixKey={setRecipientKey}
        amount={amount} setAmount={setAmount}
        error={error} busy={busy} receipt={receipt}
        onTransfer={handlePixTransfer} onHome={() => setPage("home")}
      />
    );
  }

  return (
    <LoginPage
      onLogin={handleLogin}
      onRegister={() => { setError(""); setNotice(""); setPage("register"); }}
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      error={error} busy={busy} notice={notice}
    />
  );
}
