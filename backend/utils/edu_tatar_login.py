from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def registration(login, password):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    driver.get("https://edu.tatar.ru/login/")
    driver.find_element(By.XPATH, "//html/body/div[4]/div[1]/div[2]/form/div[4]/input[1]").send_keys(login)
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div[2]/form/div[4]/input[2]").send_keys(password)
    driver.find_element(By.XPATH, "/html/body/div[4]/div[1]/div[2]/form/div[4]/div/button").click()
    return driver.page_source


def get_info(login: str, password: str):
    text = registration(login, password)
    soup = bs(text, 'html.parser')
    td_arr = soup.findAll('td')
    return {'name': td_arr[1].text,
            'role': td_arr[5].text.replace('\n', ' ').replace(' ', '')
            }

