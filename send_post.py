import os
import requests

BOT_TOKEN   = "8566954882:AAHFX769zpn0d_CpQhEnM9V_Isv7TUwnT7s"
CHANNEL_ID  = "-1003758993082"
MINIAPP_URL = "https://narkoher.github.io/Masha/"
CAPTION     = os.environ.get("CAPTION", "Текст поста")
BUTTON_TEXT = os.environ.get("BUTTON_TEXT", "🃏 Сыграть в картишки")
PHOTO_URL   = os.environ.get("PHOTO_URL", "")

keyboard = {
    "inline_keyboard": [[{
        "text": BUTTON_TEXT,
        "web_app": {"url": MINIAPP_URL}
    }]]
}

if PHOTO_URL:
    method = "sendPhoto"
    payload = {
        "chat_id": CHANNEL_ID,
        "photo": PHOTO_URL,
        "caption": CAPTION,
        "reply_markup": keyboard
    }
else:
    method = "sendMessage"
    payload = {
        "chat_id": CHANNEL_ID,
        "text": CAPTION,
        "reply_markup": keyboard
    }

resp = requests.post(
    f"https://api.telegram.org/bot{BOT_TOKEN}/{method}",
    json=payload
)

result = resp.json()
if result.get("ok"):
    print("✅ Пост успешно отправлен в канал!")
else:
    print(f"❌ Ошибка: {result.get('description')}")
    exit(1)
