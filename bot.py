import uuid
import logging
from telegram import (
    Update,
    InlineQueryResultArticle,
    InputTextMessageContent,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
)
from telegram.ext import Application, InlineQueryHandler

logging.basicConfig(level=logging.INFO)

BOT_TOKEN   = "8566954882:AAHFX769zpn0d_CpQhEnM9V_Isv7TUwnT7s"
MINIAPP_URL = "https://narkoher.github.io/Masha/"

async def inline_query(update: Update, context):
    results = [
        InlineQueryResultArticle(
            id=str(uuid.uuid4()),
            title="🃏 Сыграть в картишки",
            description="Отправить кнопку с игрой в канал",
            input_message_content=InputTextMessageContent(
                "🃏 Нажми кнопку чтобы сыграть в картишки!"
            ),
            reply_markup=InlineKeyboardMarkup([[
                InlineKeyboardButton(
                    "🃏 Сыграть в картишки",
                    url=MINIAPP_URL
                )
            ]])
        )
    ]
    await update.inline_query.answer(results, cache_time=0)

def main():
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(InlineQueryHandler(inline_query))
    print("✅ Бот запущен!")
    app.run_polling()

if __name__ == "__main__":
    main()
