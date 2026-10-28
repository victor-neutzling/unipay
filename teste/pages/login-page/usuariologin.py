import time
from datetime import datetime
from pathlib import Path
from PIL import Image


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
        campo_usuario = navegador.find_element(
            By.ID,

            "login-email"
        )
        campo_usuario.send_keys("teste@gmail.com")
        time.sleep(2)

        # Preenche a senha
        campo_senha = navegador.find_element(
            By.ID,
            "login-password"
        )
        campo_senha.send_keys("teste_password")
        time.sleep(2)

        # Clica no botão de login
        botao_login = navegador.find_element(
            By.ID,
            "login-submit"
        )
        botao_login.click()

        # Aguarda a página do menu
        titulo_menu = WebDriverWait(
            navegador,
            10
        ).until(
            EC.visibility_of_element_located(
                (By.CLASS_NAME, "side-label")
            )
        )

        # Valida o resultado
        assert titulo_menu.text == "MENU"

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