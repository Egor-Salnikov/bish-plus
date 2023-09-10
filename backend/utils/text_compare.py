import requests

API_URL = "https://api-inference.huggingface.co/models/uaritm/multilingual_en_ru_uk"
headers = {"Authorization": "Bearer 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"}


def compare(right_answer, given_answer):
    payload = {
        "inputs": {
            "source_sentence": right_answer,
            "sentences": [
                given_answer,
            ]
        },
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    if response is None or len(response.json()) == 0:
        return ""
    res = str(response.json()[0] * 100)
    res = res[:res.index('.')]

    return res

