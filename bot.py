import requests
import time

BOT_TOKEN   = "8566954882:AAHFX769zpn0d_CpQhEnM9V_Isv7TUwnT7s"
CHANNEL_ID  = "-1003758993082"
MINIAPP_URL = "https://narkoher.github.io/Masha/"
API         = f"https://api.telegram.org/bot{BOT_TOKEN}"

# Удаляем вебхук чтобы не было конфликтов с polling
r = requests.post(f"{API}/deleteWebhook", json={"drop_pending_updates": True})
print("deleteWebhook:", r.json())

# Проверяем бота
r = requests.get(f"{API}/getMe")
print("getMe:", r.json())

def get_updates(offset):
    try:
        # Используем POST + json чтобы allowed_updates правильно передался
        r = requests.post(f"{API}/getUpdates", json={
            "offset": offset,
            "timeout": 10,
            "allowed_updates": ["message", "inline_query"]
        }, timeout=15)
        data = r.json()
        if not data.get("ok"):
            print("Ошибка getUpdates:", data)
        return data.get("result", [])
    except Exception as e:
        print(f"Ошибка: {e}")
        time.sleep(3)
        return []

def handle_inline(query):
    print(f"Инлайн-запрос от {query['from']['id']}: '{query.get('query', '')}'")
    r = requests.post(f"{API}/answerInlineQuery", json={
        "inline_query_id": query["id"],
        "cache_time": 0,
        "results": [{
            "type": "article",
            "id": "play",
            "title": "🃏 Играть ♠️",
            "description": "Отправить кнопку с игрой в канал",
            "input_message_content": {
                "message_text": "🃏 Нажми кнопку чтобы сыграть в картишки!"
            },
            "reply_markup": {
                "inline_keyboard": [[{
                    "text": "Играть ♠️",
                    "web_app": {"url": MINIAPP_URL}
                }]]
            }
        }]
    })
    print("answerInlineQuery:", r.json())

def handle_message(msg):
    if msg.get("text") == "/post":
        r = requests.post(f"{API}/sendMessage", json={
            "chat_id": CHANNEL_ID,
            "text": "🃏 Нажми кнопку чтобы сыграть в картишки!",
            "reply_markup": {
                "inline_keyboard": [[{
                    "text": "Играть ♠️",
                    "web_app": {"url": MINIAPP_URL}
                }]]
            }
        })
        print("sendMessage в канал:", r.json())

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
