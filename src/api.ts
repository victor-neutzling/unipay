export type User = {
  name: string;
  email: string;
  pixKey: string;
};

export type Transaction = {
  id: string;
  title: string;
  detail: string;
  date: string;
  amount: number;
  kind: "in" | "out";
};

const USER_STORAGE_KEY = "unipay-user";
const pause = (duration = 200) => new Promise((resolve) => setTimeout(resolve, duration));

/** Local demo API. Replace these methods with HTTP requests when a backend exists. */
export const fakeApi = {
  async login(email: string, password: string): Promise<User> {
    await pause();
    // TODO(backend): POST /auth/login and use a secure session or access token.
    if (!email || password.length < 4) {
      throw new Error("Confira seu e-mail e sua senha.");
    }

    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      const user = JSON.parse(savedUser) as User;
      if (user.email.toLowerCase() !== email.toLowerCase()) {
        throw new Error("Não encontramos uma conta com esse e-mail.");
      }
      return user;
    }

    return {
      name: email.split("@")[0].replace(/[._-]/g, " "),
      email,
      pixKey: email,
    };
  },

  async register(name: string, email: string): Promise<User> {
    await pause();
    // TODO(backend): POST /users and generate the PIX key server-side.
    const user = { name, email, pixKey: email };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async getTransactions(): Promise<Transaction[]> {
    await pause();
    // TODO(backend): GET /accounts/me/transactions.
    return [
      { id: "tx-01", title: "Salário", detail: "Empresa Acme Ltda.", date: "Hoje, 09:42", amount: 5200, kind: "in" },
      { id: "tx-02", title: "Mercado Natural", detail: "Compra no débito", date: "Hoje, 08:16", amount: 86.4, kind: "out" },
      { id: "tx-03", title: "PIX recebido", detail: "De Marina Costa", date: "Ontem, 18:32", amount: 145, kind: "in" },
      { id: "tx-04", title: "Café Aurora", detail: "Compra no débito", date: "Ontem, 14:05", amount: 24.5, kind: "out" },
      { id: "tx-05", title: "Internet fibra", detail: "Pagamento de conta", date: "27 out, 10:21", amount: 119.9, kind: "out" },
    ];
  },

  async transferPix(_key: string, _amount: number): Promise<{ id: string }> {
    await pause();
    // TODO(backend): POST /pix/transfers and return a server-generated receipt.
    return { id: `PIX${Date.now()}` };
  },
};
