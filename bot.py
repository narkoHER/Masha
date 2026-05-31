import requests
import time

BOT_TOKEN   = "8566954882:AAHFX769zpn0d_CpQhEnM9V_Isv7TUwnT7s"
CHANNEL_ID  = "-1003758993082"
MINIAPP_URL = "https://narkoher.github.io/Masha/"
API         = f"https://api.telegram.org/bot{BOT_TOKEN}"

def get_updates(offset):
    try:
        r = requests.get(f"{API}/getUpdates", params={
            "offset": offset,
            "timeout": 30,
            "allowed_updates": ["message", "inline_query"]
        }, timeout=35)
        return r.json().get("result", [])
    except:
        time.sleep(3)
        return []

def handle_inline(query):
    requests.post(f"{API}/answerInlineQuery", json={
        "inline_query_id": query["id"],
        "cache_time": 0,
        "results": [{
            "type": "article",
            "id": "play",
            "title": "🃏 Сыграть в картишки",
            "description": "Отправить кнопку с игрой в канал",
            "input_message_content": {
                "message_text": "🃏 Нажми кнопку чтобы сыграть в картишки!"
            },
            "reply_markup": {
                "inline_keyboard": [[{
                    "text": "🃏 Сыграть в картишки",
                    "web_app": {"url": MINIAPP_URL}
                }]]
            }
        }]
    })
    print("Ответил на инлайн-запрос")

def handle_message(msg):
    if msg.get("text") == "/post":
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
            "chat_id": msg["chat"]["id"],
            "text": "✅ Пост отправлен в канал!"
        })

print("✅ Бот запущен!")
offset = 0

while True:
    updates = get_updates(offset)
    for update in updates:
        offset = update["update_id"] + 1
        if "inline_query" in update:
            handle_inline(update["inline_query"])
        elif "message" in update:
            handle_message(update["message"])
