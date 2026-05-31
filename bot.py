```python
import requests
import time

BOT_TOKEN = "8566954882:AAHFX769zpn0d_CpQhEnM9V_Isv7TUwnT7s"

CHANNEL_ID = "-1003758993082"

API = f"https://api.telegram.org/bot{BOT_TOKEN}"

STARTAPP_URL = "https://t.me/masha_durak_bot?startapp=play"

requests.post(
    f"{API}/deleteWebhook",
    json={"drop_pending_updates": True}
)

print("✅ Бот запущен")


def get_updates(offset):
    try:
        r = requests.post(
            f"{API}/getUpdates",
            json={
                "offset": offset,
                "timeout": 20
            },
            timeout=25
        )

        data = r.json()

        if not data.get("ok"):
            return []

        return data.get("result", [])

    except Exception as e:
        print("Ошибка:", e)
        time.sleep(3)
        return []


def send_game_post(chat_id):
    requests.post(
        f"{API}/sendMessage",
        json={
            "chat_id": chat_id,
            "text": "🃏 Дурак с Машей\n\nСможешь обыграть Машу?",
            "reply_markup": {
                "inline_keyboard": [[
                    {
                        "text": "🎮 Играть",
                        "url": STARTAPP_URL
                    }
                ]]
            }
        }
    )


offset = 0

while True:
    updates = get_updates(offset)

    for update in updates:
        offset = update["update_id"] + 1

        if "message" not in update:
            continue

        msg = update["message"]
        text = msg.get("text", "")

        if text == "/start":
            send_game_post(msg["chat"]["id"])

        elif text == "/post":
            send_game_post(CHANNEL_ID)
```
