import requests
import time

BOT_TOKEN   = "8566954882:AAHFX769zpn0d_CpQhEnM9V_Isv7TUwnT7s"
CHANNEL_ID  = "-1003758993082"
MINIAPP_URL = "https://narkoher.github.io/Masha/"
API         = f"https://api.telegram.org/bot{BOT_TOKEN}"

def get_updates(offset):
    try:
        r = requests.get(f"{API}/getUpdates", params={"offset": offset, "timeout": 30}, timeout=35)
        return r.json().get("result", [])
    except:
        time.sleep(3)
        return []

def send_to_channel(chat_id):
    requests.post(f"{API}/sendMessage", json={
        "chat_id": CHANNEL_ID,
        "text": "🃏 Нажми кнопку чтобы сыграть в картишки!",
        "reply_markup": {
            "inline_keyboard": [[{
                "text": "🃏 Сыграть в картишки",
                "web_app": {"url": MINIAPP_URL}
            }]]
        }
    })
    requests.post(f"{API}/sendMessage", json={
        "chat_id": chat_id,
        "text": "✅ Пост отправлен в канал!"
    })

print("✅ Бот запущен! Пиши /post в личку.")
offset = 0

while True:
    updates = get_updates(offset)
    for update in updates:
        offset = update["update_id"] + 1
        msg = update.get("message", {})
        if msg.get("text") == "/post":
            send_to_channel(msg["chat"]["id"])
            print(f"Пост отправлен по запросу от {msg['chat']['id']}")
