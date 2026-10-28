import time
from datetime import datetime
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def capturar_tela(navegador, resultado):
    # Identifica a pasta onde está o arquivo test_login.py
    pasta_raiz = Path(__file__).resolve().parent

    # Obtém a data e a hora da execução
    data_hora = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

    # Salva a imagem diretamente na pasta do teste
    caminho_imagem = (
        pasta_raiz
        / f"login_{resultado}_{data_hora}.png"
    )

    # Captura a tela e informa se a operação funcionou
    imagem_salva = navegador.save_screenshot(
        str(caminho_imagem)
    )

    if imagem_salva:
        print(f"\nEvidência salva em: {caminho_imagem}")
    else:
        print("\nNão foi possível salvar a evidência.")


def test_login_com_sucesso():
    navegador = webdriver.Chrome()

    try:
        navegador.maximize_window()

        # Acessa a página
        navegador.get("http://localhost:5173/")
        time.sleep(2)

        # Preenche o usuário
        botao_register = navegador.find_element(
            By.ID,
            "go-register"
        )
        botao_register.click()
        time.sleep(2)

        # Preenche o nome
        campo_nome = navegador.find_element(
            By.ID,
            "register-name"
        )
        campo_nome.send_keys("nome_teste")
        time.sleep(2)

        # Preenche o email
        campo_email = navegador.find_element(
            By.ID,
            "register-email"
        )
        campo_email.send_keys("teste@email.com")
        time.sleep(2)

        # Preenche a senha
        campo_senha = navegador.find_element(
            By.ID,
            "register-password"
        )
        campo_senha.send_keys("teste")
        time.sleep(2)

        # Clica no botão de cadastrar
        botao_cadastrar = navegador.find_element(
            By.ID,
            "register-submit"
        )
        botao_cadastrar.click()

        time.sleep(2)
        # Aguarda a página de produtos
        titulo_login = WebDriverWait(
            navegador,
            10
        ).until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, "h2")
            )
        )
        # Valida o resultado
        assert titulo_login.text == "Que bom ter\nvocê por aqui."

        # Captura a evidência de sucesso
        capturar_tela(navegador, "sucesso")

    except Exception:
        # Captura a evidência de falha
        capturar_tela(navegador, "falha")

        # Informa a falha ao pytest
        raise

    finally:
        # Executado antes de fechar o navegador,
        # independentemente do resultado do teste
        print("\nO navegador será fechado em 5 segundos...")
        time.sleep(5)

        navegador.quit()