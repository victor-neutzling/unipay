# UniPay

Protótipo de uma interface bancária brasileira, desenvolvido com React, TypeScript e Vite.

## Executar a aplicação web

Na pasta `unipay`, instale as dependências e inicie o servidor de desenvolvimento:

```sh
npm install
npm run dev
```

Abra o endereço local exibido pelo Vite, normalmente `http://localhost:5173`.

## Criar e executar o ambiente virtual de Python

O ambiente virtual e as dependências Python ficam na pasta `teste`, separados das dependências da aplicação web. Os comandos abaixo consideram que o terminal está na pasta `unipay`.

1. Acesse a pasta `teste`:

   ```sh
   cd teste
   ```

2. Crie o ambiente virtual:

   ```sh
   python -m venv .venv
   ```

3. Ative o ambiente virtual:

   **PowerShell (Windows):**

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

   **Prompt de Comando (Windows):**

   ```bat
   .venv\Scripts\activate.bat
   ```

   **macOS ou Linux:**

   ```sh
   source .venv/bin/activate
   ```

4. Instale as dependências listadas em `requirements.txt`:

   ```sh
   python -m pip install -r requirements.txt
   ```

Com o ambiente ativado, execute os comandos Python necessários a partir da pasta `teste`. Para sair do ambiente virtual, use:

```sh
deactivate
```

## Estrutura do projeto

- `src/pages/` contém as páginas inicial, de login, de cadastro e do PIX.
- `src/components/` contém componentes compartilhados de layout, navegação, saldo, extrato e transações.
- `src/api.ts` contém uma API local simulada. Substitua os métodos indicados por requisições ao backend quando uma API estiver disponível.
- `teste/requirements.txt` lista as dependências Python usadas na pasta `teste`.

O cadastro de conta usa o endereço de e-mail como chave PIX de demonstração. Os controles da interface têm atributos HTML `id` descritivos para inspeção no navegador e futuras automações.
