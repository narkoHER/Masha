const suits = [
  { id: "spades", symbol: "♠", red: false },
  { id: "clubs", symbol: "♣", red: false },
  { id: "hearts", symbol: "♥", red: true },
  { id: "diamonds", symbol: "♦", red: true },
];
const ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const values = Object.fromEntries(ranks.map((rank, index) => [rank, index]));

const mashaScenes = [
  "./assets/masha/stage-0.png",
  "./assets/masha/stage-1.png",
  "./assets/masha/stage-2.png",
  "./assets/masha/stage-3.png",
  "./assets/masha/stage-4.png",
  "./assets/masha/stage-5.png",
  "./assets/masha/stage-6.png",
];

// Обновленные этапы раздевания по ТЗ
const removedItems = ["обувь", "топик", "шортики", "лифчик", "украшения", "трусики"];

const mashaLines = {
  intro: [
    ["Начнем спокойно. Я пока просто присматриваюсь.", "Первые карты многое говорят. Особенно когда их держишь ты.", "Не нервничай, я еще добрая.", "Давай без паники. Сначала разминка.", "Я люблю смотреть, как человек делает первый ход.", "Карты на стол, смелость в глаза.", "Сегодня я проверяю не удачу, а выдержку.", "Если проиграешь быстро, я сделаю вид, что не заметила."],
    ["Уже теплее. Теперь я буду чуть внимательнее.", "Ты прошел первый раунд, значит, можно играть острее.", "Мне нравится, когда соперник начинает верить в себя.", "Посмотрим, сколько уверенности останется через пару ходов.", "Я запомнила твой стиль. Не благодари.", "На этом уровне я уже не отдаю карты просто так.", "Давай, удиви меня еще раз.", "Одежда на мне держится крепче, чем твоя стратегия."],
    ["Теперь я считаю не только карты, но и твои ошибки.", "Ты зашел далеко. Придется играть аккуратнее.", "Если хочешь следующий образ, заслужи его.", "Мне нравится твое упрямство. Почти.", "Тут уже нельзя просто бросать мелочь и надеяться.", "Я начинаю видеть, какие карты ты бережешь.", "Давай без случайных побед. Только красиво.", "Каждый твой промах я складываю в отдельную стопку."],
    ["Вот теперь интересно. Я уже играю всерьез.", "Ты хотел сложнее? Я услышала.", "С этого момента я буду давить на слабые места.", "Победишь здесь — я признаю, что ты опасен.", "Ты все еще хочешь играть на раздевание? Смело.", "Мне нравится, когда ставка становится личной.", "Ошибешься — и я сама начну выбирать, что с тебя снять.", "Не отвлекайся на мой взгляд. Хотя можешь попробовать."],
    ["Пятый уровень. Теперь я считаю почти все, что видела.", "Я уже знаю, какие масти ты не любишь.", "Сейчас я буду собирать комбинации, а не просто ходить.", "Ты близко. Поэтому я буду вредной.", "Еще шаг, и одежда перестанет быть главной ставкой.", "Я не буду жульничать. Мне достаточно твоих ошибок.", "Давай честно: ты уже думаешь не только о картах.", "Если дойдешь до финала, сыграем на желания?"],
    ["Финальный темп. Тут я улыбаюсь только после ошибок.", "Теперь каждый ход должен быть точным.", "Я помню почти весь стол. А ты?", "Последний уровень не про удачу, милый.", "Победишь — получишь желание. Проиграешь — мое.", "Я не читаю твою руку. Ты сам все выдаешь.", "Давай сыграем так, будто назад уже нельзя.", "Когда закончится одежда, начнутся правила повеселее."],
  ],
  playerAttack: [
    ["Мелко начинаешь. Осторожный?", "Такой ход можно простить. Один раз.", "Я бы сказала смело, но пока рано.", "Хм. Ты правда этого хотел?", "Легкая карта, легкий взгляд.", "Проверяешь меня? Миленько.", "Я пока не впечатлена.", "Это разминка или уже план?"],
    ["Уже увереннее. Мне нравится.", "Не самый плохой выбор.", "Ты начал кусаться. Записываю.", "Вот так лучше, не прячься.", "Смотри, я могу и ответить.", "Пытаешься выманить мои хорошие карты?", "Мне нравится, когда ты рискуешь.", "Твой ход стал симпатичнее."],
    ["Интересно. Ты начал подбирать темп.", "Я вижу, что ты держишь кое-что вкусное.", "Хочешь заставить меня тратить старшие?", "Неплохо, но я не отдаю контроль.", "Ты учишься. Это даже опасно.", "Такой ход уже приходится уважать.", "Давай, покажи вторую часть плана.", "Если это ловушка, она почти милая."],
    ["Вот это уже дерзко.", "Ты давишь? Мне нравится, продолжай.", "Ход с характером. Наконец-то.", "Не отвлекайся, я тоже умею кусаться.", "Еще так походишь — начну ревновать к твоим картам.", "Ты хочешь снять с меня еще один слой? Тогда точнее.", "Смелый ход. Посмотрим, выдержишь ли ответ.", "Я вижу азарт. Он тебе идет."],
    ["Ты собрал комбинацию? Наконец-то.", "Это уже похоже на расчет.", "Хорошо. Теперь я должна думать.", "Не думай, что я не заметила подготовку.", "Ты подводишь меня к козырям? Хитро.", "Если это сработает, я буду недовольна красиво.", "Еще один такой ход — и я начну играть на желания.", "Ты стал опасным. Очень не вовремя."],
    ["Сильный ход. Я это запомню.", "Теперь ты играешь как человек, которому есть что терять.", "Красиво. Почти слишком красиво.", "Ты заставляешь меня считать глубже.", "Вот это уже финальный уровень.", "Если победишь такой игрой, желание будет честным.", "Ты правда хочешь оставить меня без вариантов?", "Мне нравится твоя наглость. Но я ее накажу."],
  ],
  mashaBeats: [
    ["Крыто. Я же не совсем подарок.", "Нет, так просто не пройдет.", "Мимо моей слабости. Попробуй еще.", "Я это закрываю.", "Аккуратно, но недостаточно.", "Видишь? Я тоже умею.", "Эту я забираю из воздуха.", "Пока не страшно."],
    ["Крыто, и довольно легко.", "Ты почти заставил меня задуматься.", "Неплохо, но карта у меня нашлась.", "Я держала это как раз для тебя.", "Такой ход я ожидала.", "Еще немного давления, и будет интересно.", "Я пока сохраняю лицо. И карты.", "Не расстраивайся, ты был близко."],
    ["Крыто. Я не отдаю темп.", "Ты хотел заставить меня потратить старшую? Не вышло.", "Хорошая попытка. Я видела ее заранее.", "Мне пришлось раскрыться, но не слишком.", "Эта карта была не случайной.", "Я закрываю и смотрю, что ты спрятал.", "Твой план стал понятнее.", "Еще один слой твоей стратегии снят."],
    ["Крыто. И да, я довольна собой.", "Ты давишь, я выгибаюсь, но не ломаюсь.", "Не так быстро, охотник.", "Мне нравится твоя уверенность. Особенно когда она ошибается.", "Закрываю. Что снимем с тебя, если сорвешься?", "Ты хотел зрелище? Получай отбой.", "Эта карта спасла мой образ.", "Я пока одета. А ты пока надеешься."],
    ["Крыто расчетом, не удачей.", "Я видела этот ранг на столе и ждала.", "Ты строишь красиво, но я считаю.", "Мне пришлось отдать ресурс. Значит, ход был хороший.", "Не думай, что я трачу козыри без причины.", "Я закрыла, но ты заставил меня уважать ход.", "Еще немного — и я начну злиться по-настоящему.", "С такими атаками желания становятся ближе."],
    ["Крыто. На финале слабых ответов нет.", "Я закрываю и оставляю тебе минимум воздуха.", "Твой ход силен, но не смертелен.", "Я считаю стол, милый. Все честно.", "Ты почти поймал меня. Почти.", "Эта защита стоит дорого, но она стоит того.", "Я не дам финал бесплатно.", "Крыто. Желание пока остается при мне."],
  ],
  mashaTakes: [
    ["Ладно, беру. Только не празднуй.", "Забираю. Бывает.", "Хм. Неприятно, но терпимо.", "Я возьму и сделаю вид, что так задумано.", "Смотри не улыбайся слишком широко.", "Карты ко мне, взгляд к тебе.", "Ладно, подкидывай, если есть смелость.", "Я беру. Но память у меня хорошая."],
    ["Беру. Ты начинаешь раздражать приятно.", "Ладно, этот раунд за тобой.", "Подкидывай, если рука не дрожит.", "Я возьму, но потом верну с процентами.", "Неплохо поймал.", "Не радуйся, это еще не победа.", "Беру и запоминаю ранг.", "Хорошо, ты вынудил."],
    ["Беру. Значит, у тебя есть связка.", "Ты красиво меня прижал.", "Ладно, добавляй, если подготовил пару.", "Я возьму эти карты, но потом ими же накажу.", "Вот это уже похоже на игру.", "Ты заставил меня раскрыться. Цени.", "Беру и пересчитываю варианты.", "Хорошо. Этот кусочек партии твой."],
    ["Беру. Довольный? Пока рано.", "Подкидывай еще. Я выдержу.", "Ты хочешь раздеть меня ходами? Тогда не останавливайся.", "Ладно, твоя наглость сработала.", "Я беру, но потом сама выберу ставку.", "Этот раунд стал горячее.", "Добавляй пару. Не делай вид, что ее нет.", "Ты поймал меня. Мне это даже нравится."],
    ["Беру. Редко, но метко.", "Ты заставил меня собрать лишнее. Умно.", "Подкидывай все, что подходит. Я хочу увидеть жадность.", "Хорошая комбинация. Не испорти ее.", "Беру и начинаю мстить уже в голове.", "Ты считает лучше, чем я думала.", "Если так продолжишь, придется играть на желания.", "Ладно. Один красивый удар тебе засчитан."],
    ["Беру. На финале это дорого.", "Ты выбил из меня ресурс. Уважаю.", "Подкидывай. Финал любит жестокость.", "Хорошо поймал. Но теперь у меня больше карт для ответа.", "Это была сильная атака.", "Я беру, но желание все еще не твое.", "Ты умеешь давить. Проверим, умеешь ли завершать.", "Вот теперь я правда злюсь."],
  ],
  playerDefense: [
    ["Отбился. Не ожидала.", "Ладно, ты живой.", "Неплохо для начала.", "У тебя нашлась карта. Чудо.", "Хорошо, не беру тебя на испуг.", "Ты умеешь закрываться.", "Пока держишься.", "Я почти поверила, что ты растерялся."],
    ["Красиво закрыл.", "Так, так, ты не просто кликаешь.", "Мне придется искать угол получше.", "Хороший ответ.", "Ты защищаешься увереннее.", "Я это запомню.", "Отбой с характером.", "Ты начинаешь мешать моим планам."],
    ["Умная защита.", "Ты сохранил важные карты? Интересно.", "Вижу расчет.", "Не отдал лишнее. Молодец.", "Я бы сыграла похоже.", "Ты начал понимать темп.", "Эта защита была не случайной.", "Мне нравится, когда ты не сдаешься."],
    ["Увернулся красиво.", "Ты хочешь, чтобы я старалась сильнее?", "Хорошо закрыл. Почти дерзко.", "Ты держишь удар. Приятно.", "Не думай, что я не найду новый.", "Я бы сняла с тебя самоуверенность первой.", "Ты защищаешься слишком мило.", "Ладно, этот выпад пережил."],
    ["Сильная защита. Я пересчитаю.", "Ты не дал мне темп. Уважаю.", "Такой ответ ломает простые планы.", "Ты оставил козырь? Умно.", "Я вижу, что ты бережешь старшие.", "Отлично, теперь партия стала настоящей.", "Ты играешь так, будто хочешь желание.", "Хорошо. Очень хорошо."],
    ["Идеальная защита почти раздражает.", "Ты читаешь меня? Опасная привычка.", "Финальный ответ принят.", "Ты сохранил баланс. Редко.", "Теперь мне придется строить длиннее.", "С таким отбоем желание уже пахнет близко.", "Ты не сломался. Значит, я усилюсь.", "Снимаю шляпу. Образно."],
  ],
  mashaAttack: [
    ["Держи.", "Посмотрим, что у тебя есть.", "Не прячь глаза.", "Проверим масть.", "Это маленькая проверка.", "Я начну нежно.", "Твоя очередь нервничать.", "Ну-ка."],
    ["Держи и не жалуйся.", "Я хочу увидеть твою защита.", "Теперь мой темп.", "Проверю твою руку.", "Эта карта просилась на стол.", "Не расслабляйся.", "Ты слишком удобно сидишь.", "Начинаю давить."],
    ["Я пойду туда, где тебе неудобно.", "Посмотрим, сохранил ли ты ответ.", "Эта атака не случайная.", "Я помню, что ты уже тратил.", "Держи задачку.", "Сейчас узнаем, где у тебя пусто.", "Я выбираю давление.", "Тебе придется раскрыться."],
    ["Держи. И не смотри так на меня.", "Я атакую, а ты красиво выкручивайся.", "Если возьмешь, я буду довольна.", "Проверю, насколько ты собран.", "Хочу увидеть, как ты нервничаешь.", "Моя очередь раздевать твою уверенность.", "Ты просил игру поживее.", "Лови мой каприз."],
    ["Я выбираю карту с расчетом.", "Этот ход должен забрать твой ресурс.", "Мне интересно, сколько защит у тебя осталось.", "Я давлю на вероятную пустоту.", "Без читов, только память.", "Сейчас проверим мои подсчеты.", "Если возьмешь, ставка станет вкуснее.", "Я подбираю ключ к твоей руке."],
    ["Финальная атака не бывает случайной.", "Я ставлю тебя перед выбором.", "Сейчас ты либо читаешь меня, либо берешь.", "Я помню стол. И твои привычки.", "Этот ход должен вскрыть остатки.", "Держи. Желание ждет победителя.", "Я играю честно, но жестко.", "Покажи, достоин ли финала."],
  ],
  playerTakes: [
    ["Бери. Карты любят компанию.", "Упс. Рука стала тяжелее.", "Ничего, подержишь.", "Я знала, что эта карта тебе понравится.", "Вот теперь у тебя выбор побольше.", "Не грусти, это опыт.", "Брать тоже надо красиво.", "Собирай, собирай."],
    ["Бери, герой.", "Тебе идет полная рука.", "Я бы посочувствовала, но не буду.", "Кажется, ты копишь не то.", "Вот так выглядит мой темп.", "Ты сам попросил продолжение.", "Неприятно? Отлично.", "Я начинаю получать удовольствие."],
    ["Бери. Это была маленькая ловушка.", "Ты открыл слабую масть.", "Я запишу, где у тебя провал.", "Эти карты расскажут мне больше.", "Ты взял, а я получила информацию.", "Хорошо, теперь я знаю чуть больше.", "Не все потери видны сразу.", "Ты дал мне темп."],
    ["Бери. И не отвлекайся на мои губы.", "Я бы сняла с тебя одну лишнюю надежду.", "Рука тяжелая, взгляд горячий.", "Кажется, я начала тебя раздевать первой.", "Еще пара таких взятий — и будем менять ставки.", "Ты так мило сопротивляешься.", "Бери, пока я улыбаюсь.", "Мне нравится, когда ты попадаешься."],
    ["Бери. Я строила это два хода.", "Сработало. Значит, я считала верно.", "Ты взял именно там, где я ждала.", "Теперь твоя рука шумит громче.", "Я забрала темп без лишнего риска.", "Хорошая партия становится лучше.", "Твоя одежда тоже могла бы быть ставкой.", "Ты проиграл эпизод, не войну. Пока."],
    ["Бери. Финал ошибок не прощает.", "Я вскрыла слабость. Спасибо.", "Эти карты могут решить желание.", "Ты взял, а я почти вижу остаток.", "Сложный противник не обязан быть нечестным.", "Я просто слушаю стол внимательнее.", "Теперь каждый твой ход будет тяжелее.", "Ты еще можешь победить. Но уже не бесплатно."],
  ],
  beat: [
    ["Чисто.", "Раунд закрыт.", "Ладно, убрали.", "Без лишней драмы.", "Идем дальше.", "Пока ровно.", "Стол снова пустой.", "Следующий."],
    ["Закрыли. Но я смотрела.", "Хороший маленький обмен.", "Темп поменялся.", "Я запомнила эти карты.", "Партия дышит.", "Неплохо разошлись.", "Дальше будет веселее.", "Я уже выбираю следующий угол."],
    ["Раунд чистый, информация осталась.", "Я видела, что ушло.", "Теперь стол говорит больше.", "Этот обмен был полезный.", "Дальше решения станут жестче.", "Ты сохранил кое-что. Я заметила.", "Хорошо, считаем дальше.", "Пауза перед давлением."],
    ["Закрыли. Не расслабляйся.", "Красивый отбой, почти интимный.", "Стол пустой, но напряжение осталось.", "Мне нравится этот темп.", "Еще один раунд ближе к ставкам.", "Ты держишься. Это заводит игру.", "Ладно, я дам тебе вдохнуть.", "Следующий ход будет острее."],
    ["Закрыли с пользой.", "Я обновила счет в голове.", "Хороший обмен ресурсов.", "Теперь я точнее вижу остатки.", "Без шума, но с последствиями.", "Каждая закрытая карта сужает мир.", "Ты тоже считаешь? Надеюсь.", "Желания любят точность."],
    ["Раунд закрыт. Финал стал уже.", "Я помню этот обмен.", "Теперь ошибок почти не осталось.", "Чисто, но дорого.", "Тишина перед последней ставкой.", "Хороший стол. Опасный стол.", "Каждая карта теперь слишком громкая.", "Дальше будет либо красиво, либо больно."],
  ],
  win: [
    ["Ладно. Ты заслужил.", "Хорошо сыграл.", "Я держу слово.", "Не привыкай к победам.", "Твой раунд.", "Можешь улыбнуться. Чуть-чуть.", "Ты был убедителен.", "Я признаю: красиво."],
    ["Ты снял с меня первый слой уверенности.", "Победа тебе к лицу.", "Ладно, я немного впечатлена.", "Не думала, что ты так быстро разгонишься.", "Договор есть договор.", "Следующая партия будет менее нежной.", "Смотри не зазнайся.", "Ты сделал игру теплее."],
    ["Хорошо. Следующий образ твой.", "Ты играешь лучше, чем шутишь.", "Я начинаю относиться к тебе серьезно.", "Победа красивая, спорить не буду.", "Еще один шаг, и ставки станут личными.", "Ты вытащил это не случайно.", "Мне даже хочется реванш.", "Не думай, что я сдаюсь."],
    ["Дерзкий. Ладно, получай награду.", "Ты добрался туда, где я начинаю краснеть.", "С такой игрой можно просить больше.", "Победа принята. Но я запомню.", "Ты красиво меня раздел на картах.", "Еще шаг — и я начну спрашивать желания.", "Мне нравится твоя наглость.", "Ты победил, но теперь я опаснее."],
    ["Пятый шаг. Очень смело.", "Ты почти дошел до желания.", "Эта победа была расчетом. Уважаю.", "Ладно, теперь я играю на максимум.", "Ты умеешь доводить до интересного.", "Еще немного — и одежда станет скучной ставкой.", "Я не обещаю быть послушной в финале.", "Ты заслужил финальный взгляд."],
    ["Финал твой. Желание выбираешь аккуратно.", "Ты победил честно. Это заводит сильнее.", "Ладно, чемпион, договор есть договор.", "Ты прошел меня без читов. Красиво.", "Теперь игра на желания звучит справедливо.", "Я не думала, что ты дойдешь до конца.", "Победа твоя. Но реванш будет опасным.", "Хорошо. Сегодня ты снял с меня все сомнения."],
  ],
  lose: [
    ["Минус сердечко.", "Я забрала этот раунд.", "Не переживай, у тебя еще есть шанс.", "Слишком рано расслабился.", "Я же предупреждала.", "Партия моя.", "Сердце сгорело красиво.", "Давай еще, не прячься."],
    ["Я выиграла. И мне нравится твое лицо.", "Минус сердце, плюс опыт.", "Ты был близко. Почти мило.", "Я оставляю образ при себе.", "Еще один такой раунд — и я начну командовать.", "Не сдавайся, мне еще интересно.", "Сердце ушло ко мне.", "Проигрывать тоже надо с достоинством."],
    ["Я прочитала тебя лучше.", "Этот раунд мой по делу.", "Ты дал мне слишком много информации.", "Минус сердце за невнимательность.", "Я начинаю видеть твои привычки.", "Не расстраивайся, это было полезно. Для меня.", "Ты проиграл не картам, а темпу.", "Я забираю раунд и настроение."],
    ["Я выиграла. Что снимем с тебя первым?", "Минус сердце. Одежду пока оставлю.", "Ты хотел дерзости — получил.", "Я могу раздевать не только взглядом.", "Этот раунд был мой. И ты это почувствовал.", "Если проиграешь еще, желания выберу я.", "Ты мило падаешь в ловушки.", "Мне нравится быть опасной."],
    ["Я выиграла расчетом.", "Минус сердце, потому что я считала точнее.", "Ты ошибся на два хода раньше.", "Я не жульничала. Ты сам показал дорогу.", "Этот раунд доказал, что финал будет жестким.", "Я оставляю ставку при себе.", "Еще ошибка — и желание станет моим.", "Ты все еще можешь победить, но уже должен думать."],
    ["Финальный раунд мой.", "Минус сердце. На этом уровне это больно.", "Я видела линию раньше тебя.", "Ты проиграл честной памяти.", "Желание ускользает.", "Я забираю этот финал взглядом и расчетом.", "Не злись. Лучше считай.", "Ты силен, но я была точнее."],
  ],
  draw: [
    ["Ничья. Скучно.", "Никто не упал.", "Ладно, переиграем.", "Ровно вышло.", "Я не люблю ничьи.", "Слишком аккуратно.", "Без победителя, без награды.", "Еще раз."],
    ["Ничья, но я кое-что заметила.", "Ровно, зато стало теплее.", "Ты держался неплохо.", "Никто не получил лишнего.", "Переиграем красивее.", "Не самый плохой исход.", "Я ожидала большего.", "Ставки ждут."],
    ["Ничья тоже дает информацию.", "Мы оба сохранили лицо.", "Равный обмен.", "Я запомнила достаточно.", "Следующий раунд решит больше.", "Слишком чисто для удовольствия.", "Хорошо, еще один заход.", "Результат нулевой, напряжение нет."],
    ["Ничья. А я уже хотела ставку.", "Ты избежал наказания.", "Я тоже ничего не сняла. Обидно.", "Переиграем, пока не станет жарче.", "Ровно, но с искрой.", "Ты ушел от меня красиво.", "Никто не разделся. Пока.", "Хорошо, продолжаем флиртовать картами."],
    ["Ничья на этом уровне редкость.", "Мы оба считали неплохо.", "Информация осталась, награда нет.", "Следующая ошибка будет дороже.", "Ровно. Почти профессионально.", "Желание подождет.", "Ты держишь темп.", "Партия не решила, но подсказала."],
    ["Финальная ничья. Напряженно.", "Никто не получил желание.", "Мы оба выжили.", "Это не конец, это пауза.", "Слишком точная игра с обеих сторон.", "Я не отпускаю тебя так просто.", "Переиграем до настоящего ответа.", "Желание зависло между нами."],
  ],
};

const ui = {
  modeLabel: document.querySelector("#modeLabel"),
  lives: document.querySelector("#lives"),
  turnLabel: document.querySelector("#turnLabel"),
  opponentLine: document.querySelector("#opponentLine"),
  opponentHand: document.querySelector("#opponentHand"),
  playerHand: document.querySelector("#playerHand"),
  playerCount: document.querySelector("#playerCount"),
  battlefield: document.querySelector("#battlefield"),
  trumpCard: document.querySelector("#trumpCard"),
  deckCount: document.querySelector("#deckCount"),
  discardCount: document.querySelector("#discardCount"),
  deckPanel: document.querySelector(".deck-panel"),
  deckCard: document.querySelector(".deck-card"),
  takeBtn: document.querySelector("#takeBtn"),
  doneBtn: document.querySelector("#doneBtn"),
  newGameBtn: document.querySelector("#newGameBtn"),
  helpBtn: document.querySelector("#helpBtn"),
  helpDialog: document.querySelector("#helpDialog"),
  mashaPortrait: document.querySelector("#mashaPortrait"),
  clothesTrack: document.querySelector("#clothesTrack"),
  resultDialog: document.querySelector("#resultDialog"),
  resultImage: document.querySelector("#resultImage"),
  resultKicker: document.querySelector("#resultKicker"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText"),
  nextRoundBtn: document.querySelector("#nextRoundBtn"),
};

let state;
let campaign = loadCampaign();

function newCampaign() {
  return {
    lives: 3,
    stage: 0,
    round: 1,
    difficulty: 1,
    finished: false,
  };
}

function storageKey() {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  return `durak-masha-progress:${user?.id ?? "local"}`;
}

function loadCampaign() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey()) ?? "null");
    if (!saved || typeof saved !== "object") return newCampaign();
    return {
      lives: clampNumber(saved.lives, 0, 3, 3),
      stage: clampNumber(saved.stage, 0, 6, 0),
      round: clampNumber(saved.round, 1, 999, 1),
      difficulty: clampNumber(saved.difficulty, 1, 6, 1),
      finished: Boolean(saved.finished),
    };
  } catch {
    return newCampaign();
  }
}

function saveCampaign() {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(campaign));
  } catch {
    // Progress persistence is best-effort when storage is unavailable.
  }
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function makeDeck() {
  return suits.flatMap((suit) =>
    ranks.map((rank) => ({
      id: `${rank}-${suit.id}`,
      rank,
      value: values[rank],
      suit: suit.id,
      symbol: suit.symbol,
      red: suit.red,
    })),
  );
}

function shuffle(cards) {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function resetCampaign() {
  campaign = newCampaign();
  saveCampaign();
  startMatch();
}

function startMatch() {
  const deck = shuffle(makeDeck());
  const trump = deck[deck.length - 1];
  state = {
    deck,
    trump,
    player: [],
    opponent: [],
    table: [],
    discard: 0,
    phase: "attack",
    attacker: "player",
    defender: "opponent",
    message: randomLine("intro"),
    over: false,
    resultHandled: false,
    firstBout: true,
    pendingTake: null,
    seenCardIds: new Set(),
    knownPlayerCardIds: new Set(),
  };
  drawUp();
  pickFirstAttacker();
  render();
  if (state.attacker === "opponent") {
    window.setTimeout(opponentAttack, 700);
  }
}

function pickFirstAttacker() {
  const playerLow = lowestTrump(state.player);
  const opponentLow = lowestTrump(state.opponent);
  if (opponentLow && (!playerLow || opponentLow.value < playerLow.value)) {
    state.attacker = "opponent";
    state.defender = "player";
    state.phase = "opponent-attack";
    state.message = randomLine("mashaAttack");
  } else {
    state.attacker = "player";
    state.defender = "opponent";
    state.phase = "attack";
    state.message = randomLine("intro");
  }
}

function lowestTrump(hand) {
  return hand.filter((card) => card.suit === state.trump.suit).sort(sortCards)[0];
}

function drawUp() {
  for (const side of [state.attacker, state.defender]) {
    const hand = side === "player" ? state.player : state.opponent;
    while (hand.length < 6 && state.deck.length) hand.push(state.deck.shift());
    hand.sort(sortCards);
  }
}

function sortCards(a, b) {
  const aTrump = a.suit === state.trump?.suit ? 1 : 0;
  const bTrump = b.suit === state.trump?.suit ? 1 : 0;
  return aTrump - bTrump || a.suit.localeCompare(b.suit) || a.value - b.value;
}

function cardBeats(defense, attack) {
  if (defense.suit === attack.suit && defense.value > attack.value) return true;
  return defense.suit === state.trump.suit && attack.suit !== state.trump.suit;
}

// -------------------------------------------------------------
// ИСПРАВЛЕНИЕ: Жесткий контроль лимита карт для подкидывания
// -------------------------------------------------------------
function canAttackWith(card) {
  if (!state.table.length) return true;
  const tableRanks = state.table.flatMap((pair) => [pair.attack.rank, pair.defense?.rank]).filter(Boolean);
  
  const defender = state.defender === "player" ? state.player : state.opponent;
  const defendedCount = state.table.filter(p => p.defense).length;
  
  // Игрок физически не может подкинуть больше карт, чем было в руке Маши изначально
  const maxAllowedAttacks = Math.min(attackLimit(), defender.length + defendedCount);
  
  return tableRanks.includes(card.rank) && state.table.length < maxAllowedAttacks;
}

function attackLimit() {
  return state.firstBout ? 5 : 6;
}

function removeCard(hand, cardId) {
  const index = hand.findIndex((card) => card.id === cardId);
  return index >= 0 ? hand.splice(index, 1)[0] : null;
}

function playerHand() {
  return state.player;
}

function opponentHand() {
  return state.opponent;
}

function defenderHand() {
  return state.defender === "player" ? state.player : state.opponent;
}

function onPlayerCard(card) {
  if (state.over) return;
  if ((state.phase === "attack" || state.phase === "throw-to-taker") && state.attacker === "player" && canAttackWith(card)) {
    const played = removeCard(state.player, card.id);
    rememberSeen(played);
    state.knownPlayerCardIds.delete(played.id);
    state.table.push({ attack: played, defense: null });
    if (state.phase === "throw-to-taker") {
      state.message = randomLine("mashaTakes");
      render();
      return;
    }
    state.phase = "opponent-defense";
    state.message = randomLine("playerAttack");
    render();
    window.setTimeout(opponentDefend, 650);
    return;
  }
  if (state.phase === "defense" && state.defender === "player") {
    const openPair = state.table.find((pair) => !pair.defense);
    if (!openPair || !cardBeats(card, openPair.attack)) return;
    const played = removeCard(state.player, card.id);
    rememberSeen(played);
    state.knownPlayerCardIds.delete(played.id);
    openPair.defense = played;
    state.phase = "after-player-defense";
    state.message = randomLine("playerDefense");
    render();
    window.setTimeout(afterPlayerDefense, 650);
  }
}

function opponentAttack() {
  if (state.over || state.attacker !== "opponent") return;
  const card = chooseAttackCard(state.opponent);
  if (!card) {
    finishBeat();
    return;
  }
  const played = removeCard(state.opponent, card.id);
  rememberSeen(played);
  state.table.push({ attack: played, defense: null });
  state.phase = "defense";
  state.message = randomLine("mashaAttack");
  render();
}

function opponentDefend() {
  if (state.over) return;
  const openPair = state.table.find((pair) => !pair.defense);
  if (!openPair) return;
  
  const defense = chooseDefenseCard(state.opponent, openPair.attack);
  if (!defense) {
    state.pendingTake = "opponent";
    state.phase = "throw-to-taker";
    state.message = randomLine("mashaTakes");
    render();
    return;
  }
  
  const played = removeCard(state.opponent, defense.id);
  rememberSeen(played);
  openPair.defense = played;
  
  // Убран мусорный код с выбором карт для игрока
  state.phase = "attack";
  state.message = randomLine("mashaBeats");
  render();
}

function afterPlayerDefense() {
  if (state.over) return;
  
  // ИСПРАВЛЕНИЕ: Маша подкидывает строго по правилам лимита карт
  const defendedCount = state.table.filter(p => p.defense).length;
  const maxAllowed = Math.min(attackLimit(), state.player.length + defendedCount);
  const extra = chooseThrowIn(state.opponent);
  
  if (extra && state.table.length < maxAllowed) {
    const played = removeCard(state.opponent, extra.id);
    rememberSeen(played);
    state.table.push({ attack: played, defense: null });
    state.phase = "defense";
    state.message = randomLine("mashaAttack");
    render();
    return;
  }
  state.phase = "can-finish";
  state.message = randomLine("beat");
  render();
}

function chooseAttackCard(hand) {
  const candidates = [...hand].filter(canAttackWith);
  if (!candidates.length) return null;
  return candidates
    .map((card) => ({ card, score: attackScore(card) }))
    .sort((a, b) => a.score - b.score || sortCards(a.card, b.card))[0].card;
}

function chooseDefenseCard(hand, attack) {
  const options = [...hand].filter((card) => cardBeats(card, attack)).sort(sortCards);
  if (!options.length) return null;
  if (shouldTakeInsteadOfDefend(options[0], attack)) return null;
  if (Math.random() < opponentMistakeChance()) return null;
  return options.map((card) => ({ card, score: defenseScore(card, attack) })).sort((a, b) => a.score - b.score)[0].card;
}

function chooseThrowIn(hand) {
  if (!state.table.length) return null;
  if (hand === state.opponent && Math.random() > throwInAggression()) return null;
  const ranksOnTable = new Set(state.table.flatMap((pair) => [pair.attack.rank, pair.defense?.rank]).filter(Boolean));
  const options = [...hand].filter((card) => ranksOnTable.has(card.rank));
  if (!options.length) return null;
  if (hand !== state.opponent) return options.sort(sortCards)[0];
  return options.map((card) => ({ card, score: attackScore(card) - duplicateRankBonus(card) })).sort((a, b) => a.score - b.score)[0].card;
}

function attackScore(card) {
  const trumpPenalty = card.suit === state.trump.suit ? 24 - campaign.difficulty * 2 : 0;
  const highPenalty = campaign.difficulty < 3 ? card.value * 2.2 : card.value * 0.75;
  const duplicateBonus = duplicateRankBonus(card);
  const knownPlayerPenalty = knownPlayerCanBeat(card) ? 7 - campaign.difficulty : 0;
  const pressureBonus = campaign.difficulty >= 4 ? (14 - estimatedUnknownDefenses(card)) * 1.15 : 0;
  const suitVoidBonus = campaign.difficulty >= 5 ? likelyPlayerShortSuitBonus(card) : 0;
  return trumpPenalty + highPenalty + knownPlayerPenalty - duplicateBonus - pressureBonus - suitVoidBonus;
}

function defenseScore(card, attack) {
  const trumpCost = card.suit === state.trump.suit && attack.suit !== state.trump.suit ? 18 - campaign.difficulty * 2 : 0;
  const highCost = card.value * (campaign.difficulty < 3 ? 2.4 : 1.1);
  const duplicateSave = duplicateRankBonus(card) * 0.4;
  const lateValue = campaign.difficulty >= 5 && card.suit === state.trump.suit ? -2 : 0;
  return trumpCost + highCost - duplicateSave + lateValue;
}

// -------------------------------------------------------------
// ИСПРАВЛЕНИЕ: Умный алгоритм решения "Взять или отбиться"
// -------------------------------------------------------------
function shouldTakeInsteadOfDefend(bestDefense, attack) {
  const isTrumpDefense = bestDefense.suit === state.trump.suit;
  const isTrumpAttack = attack.suit === state.trump.suit;
  const onlyTrumpCanBeat = isTrumpDefense && !isTrumpAttack;
  const valueDifference = bestDefense.value - attack.value;

  if (campaign.difficulty >= 4) {
    // УМНАЯ МАША: Берет карты, чтобы не тратить козыри и сильные карты на мелочь
    if (onlyTrumpCanBeat && bestDefense.value >= 5 && attack.value <= 3) return true;
    if (!onlyTrumpCanBeat && valueDifference >= 5 && state.deck.length > 0) return true;
    return false;
  }

  // Для низких уровней сложности остается шанс случайной сдачи
  const saveGoodCardsChance = campaign.difficulty === 1 ? 0.42 : 0.22;
  const expensiveSameSuit = !onlyTrumpCanBeat && valueDifference > 3;
  return (onlyTrumpCanBeat || expensiveSameSuit) && Math.random() < saveGoodCardsChance;
}

function duplicateRankBonus(card) {
  return state.opponent.filter((owned) => owned.rank === card.rank).length > 1 ? 5 + campaign.difficulty : 0;
}

function knownPlayerCanBeat(attack) {
  if (campaign.difficulty < 5) return false;
  return [...state.knownPlayerCardIds]
    .map((id) => findCardById(id))
    .filter(Boolean)
    .some((card) => cardBeats(card, attack));
}

function estimatedUnknownDefenses(attack) {
  return makeDeck().filter((card) => {
    if (state.seenCardIds.has(card.id)) return false;
    if (state.opponent.some((owned) => owned.id === card.id)) return false;
    return cardBeats(card, attack);
  }).length;
}

function likelyPlayerShortSuitBonus(card) {
  const seenSuitCount = [...state.seenCardIds].map(findCardById).filter((seen) => seen?.suit === card.suit).length;
  return Math.min(6, seenSuitCount * 0.45);
}

function findCardById(cardId) {
  const [rank, ...suitParts] = cardId.split("-");
  const suitId = suitParts.join("-");
  const suit = suits.find((item) => item.id === suitId);
  return suit ? { id: cardId, rank, value: values[rank], suit: suit.id, symbol: suit.symbol, red: suit.red } : null;
}

function rememberSeen(card) {
  if (card) state.seenCardIds.add(card.id);
}

// -------------------------------------------------------------
// ИСПРАВЛЕНИЕ: Прогрессия ошибок и агрессии Маши
// -------------------------------------------------------------
function opponentMistakeChance() {
  if (campaign.difficulty >= 5) return 0; // Маша перестает ошибаться
  return Math.max(0.05, 0.35 - campaign.difficulty * 0.08);
}

function throwInAggression() {
  if (campaign.difficulty >= 6) return 1.0; // В финале всегда подкидывает всё
  return Math.min(0.95, 0.50 + campaign.difficulty * 0.1);
}

// -------------------------------------------------------------
// ИСПРАВЛЕНИЕ: Маша наказывает игрока, подкидывая карты, когда он берет
// -------------------------------------------------------------
function playerTake() {
  if (state.defender !== "player" || state.phase !== "defense") return;
  
  // Маша докидывает всё что может вдогонку
  let extra;
  while (true) {
    const defendedCount = state.table.filter(p => p.defense).length;
    const maxAllowed = Math.min(attackLimit(), state.player.length + defendedCount);
    
    if (state.table.length >= maxAllowed) break;
    
    extra = chooseThrowIn(state.opponent);
    if (!extra) break;
    
    const played = removeCard(state.opponent, extra.id);
    rememberSeen(played);
    state.table.push({ attack: played, defense: null });
  }

  const takenCards = collectTable();
  takenCards.forEach((card) => state.knownPlayerCardIds.add(card.id));
  state.player.push(...takenCards);
  state.message = randomLine("playerTakes");
  endRound("opponent");
}

function finishBeat() {
  if (state.phase === "throw-to-taker" && state.pendingTake === "opponent") {
    state.opponent.push(...collectTable());
    state.message = randomLine("mashaTakes");
    endRound("player");
    return;
  }
  if (!state.table.length || state.table.some((pair) => !pair.defense)) return;
  state.discard += state.table.flatMap((pair) => [pair.attack, pair.defense]).length;
  state.table = [];
  state.firstBout = false;
  const next = state.defender;
  state.attacker = next;
  state.defender = next === "player" ? "opponent" : "player";
  drawUp();
  checkGameOver();
  if (state.over) return render();
  state.phase = state.attacker === "player" ? "attack" : "opponent-attack";
  state.message = randomLine("beat");
  render();
  if (state.attacker === "opponent") window.setTimeout(opponentAttack, 700);
}

function endRound(nextAttacker) {
  state.table = [];
  state.pendingTake = null;
  state.firstBout = false;
  state.attacker = nextAttacker;
  state.defender = nextAttacker === "player" ? "opponent" : "player";
  drawUp();
  checkGameOver();
  if (state.over) return render();
  state.phase = state.attacker === "player" ? "attack" : "opponent-attack";
  render();
  if (state.attacker === "opponent") window.setTimeout(opponentAttack, 750);
}

function collectTable() {
  return state.table.flatMap((pair) => [pair.attack, pair.defense]).filter(Boolean);
}

function checkGameOver() {
  if (state.deck.length || (state.player.length && state.opponent.length)) return;
  if (!state.player.length && !state.opponent.length) {
    finishMatch("draw");
  } else if (!state.player.length) {
    finishMatch("player");
  } else {
    finishMatch("masha");
  }
}

function finishMatch(winner) {
  if (state.resultHandled) return;
  state.over = true;
  state.resultHandled = true;
  if (winner === "player") state.message = randomLine("win");
  if (winner === "masha") state.message = randomLine("lose");
  if (winner === "draw") state.message = randomLine("draw");
  render();
  window.setTimeout(() => showResult(winner), 500);
}

function showResult(winner) {
  const previousStage = campaign.stage;
  let title = "Ничья";
  let kicker = "Раунд без потерь";
  let text = "Никто не продвинулся. Следующая партия начнется с той же сложности.";

  if (winner === "player") {
    campaign.stage = Math.min(6, campaign.stage + 1);
    campaign.difficulty = Math.min(6, campaign.stage + 1);
    kicker = `Победа ${campaign.stage}/6`;
    title = campaign.stage >= 6 ? "Финал открыт" : `Маша снимает: ${removedItems[campaign.stage - 1]}`;
    text = campaign.stage >= 6 ? "Ты прошел всю серию партий." : "Следующая партия будет сложнее.";
    state.message = randomLine("win");
  }

  if (winner === "masha") {
    campaign.lives = Math.max(0, campaign.lives - 1);
    kicker = "Поражение";
    title = campaign.lives ? "Минус одно сердце" : "Сердца закончились";
    text = campaign.lives ? "Маша оставляет свой текущий образ. Попробуй отыграться." : "Серия проиграна. Можно начать заново.";
    state.message = randomLine("lose");
  }

  if (winner === "draw") state.message = randomLine("draw");

  campaign.finished = campaign.stage >= 6 || campaign.lives <= 0;
  if (!campaign.finished) campaign.round += 1;
  saveCampaign();

  ui.resultImage.src = mashaScenes[campaign.stage || previousStage];
  ui.resultKicker.textContent = kicker;
  ui.resultTitle.textContent = title;
  ui.resultText.textContent = text;
  ui.nextRoundBtn.textContent = campaign.finished ? "Начать заново" : "Следующая партия";
  renderCampaign();
  ui.resultDialog.showModal();
}

function randomLine(type) {
  const levels = mashaLines[type] ?? mashaLines.intro;
  const stageIndex = Math.min(levels.length - 1, Math.max(0, campaign.difficulty - 1));
  const pool = levels[stageIndex] ?? levels[0] ?? [];
  return pool[Math.floor(Math.random() * pool.length)] ?? "Я смотрю на тебя и жду ход.";
}

function label(card) {
  return `${card.rank}${card.symbol}`;
}

function cardElement(card, options = {}) {
  const button = document.createElement("button");
  button.className = `card ${card.red ? "red" : ""} ${options.playable ? "can-play" : ""}`;
  button.type = "button";
  button.disabled = Boolean(options.disabled);
  button.setAttribute("aria-label", label(card));
  button.innerHTML = `<span class="rank">${card.rank}</span><span class="suit">${card.symbol}</span><span class="corner">${card.rank}</span>`;
  if (options.onClick) button.addEventListener("click", () => options.onClick(card));
  return button;
}

function render() {
  document.body.dataset.phase = state.phase;
  ui.turnLabel.textContent = state.over
    ? "Партия окончена"
    : state.defender === "player" && state.phase === "defense"
      ? "Ты отбиваешься"
      : state.attacker === "player"
        ? "Твой ход"
        : "Ход Маши";
  ui.opponentLine.textContent = state.message;
  ui.deckCount.textContent = state.deck.length;
  ui.discardCount.textContent = state.discard;
  ui.playerCount.textContent = state.player.length;
  renderCampaign();

  ui.deckPanel.classList.toggle("empty", state.deck.length === 0);
  if (state.deck.length === 0) {
    ui.deckCount.textContent = "козырь";
    ui.trumpCard.classList.add("empty");
    ui.trumpCard.replaceChildren(trumpSuitElement());
  } else {
    ui.trumpCard.classList.remove("empty");
    ui.trumpCard.replaceChildren(cardElement(state.trump, { disabled: true }));
  }
  ui.opponentHand.replaceChildren(
    ...state.opponent.map(() => {
      const card = document.createElement("div");
      card.className = "card-back";
      card.style.marginLeft = "-22px";
      return card;
    }),
  );

  ui.battlefield.replaceChildren(
    ...state.table.map((pair) => {
      const el = document.createElement("div");
      el.className = "pair";
      el.append(cardElement(pair.attack, { disabled: true }));
      if (pair.defense) el.append(cardElement(pair.defense, { disabled: true }));
      const defenseCard = el.lastElementChild;
      if (pair.defense && defenseCard) defenseCard.classList.add("defense");
      return el;
    }),
  );

  ui.playerHand.replaceChildren(
    ...playerHand().map((card) => {
      const playable =
        !state.over &&
        (((state.phase === "attack" || state.phase === "throw-to-taker") && state.attacker === "player" && canAttackWith(card)) ||
          (state.phase === "defense" &&
            state.defender === "player" &&
            state.table.some((pair) => !pair.defense && cardBeats(card, pair.attack))));
      return cardElement(card, {
        playable,
        disabled: !playable,
        onClick: onPlayerCard,
      });
    }),
  );

  const canTake = state.defender === "player" && state.phase === "defense" && state.table.some((pair) => !pair.defense);
  const canFinish =
    (state.phase === "throw-to-taker" && state.pendingTake === "opponent") ||
    (state.table.length > 0 && state.table.every((pair) => pair.defense));
  ui.takeBtn.disabled = !canTake || state.over;
  ui.doneBtn.disabled = !canFinish || state.over;
  ui.doneBtn.textContent = state.phase === "throw-to-taker" ? "Хватит" : "Бито";
}

function trumpSuitElement() {
  const badge = document.createElement("div");
  badge.className = `trump-suit ${state.trump.red ? "red" : ""}`;
  badge.innerHTML = `<span>${state.trump.symbol}</span>`;
  return badge;
}

function renderCampaign() {
  ui.modeLabel.textContent = `Партия ${campaign.round} · сложность ${campaign.difficulty}`;
  ui.lives.textContent = "♥".repeat(campaign.lives) + "♡".repeat(3 - campaign.lives);
  ui.mashaPortrait.src = mashaScenes[campaign.stage];
  ui.clothesTrack.replaceChildren(
    ...removedItems.map((_, index) => {
      const dot = document.createElement("span");
      dot.className = index < campaign.stage ? "done" : "";
      return dot;
    }),
  );
}

ui.takeBtn.addEventListener("click", playerTake);
ui.doneBtn.addEventListener("click", finishBeat);
ui.newGameBtn.addEventListener("click", resetCampaign);
ui.helpBtn.addEventListener("click", () => ui.helpDialog.showModal());
ui.nextRoundBtn.addEventListener("click", (event) => {
  event.preventDefault();
  ui.resultDialog.close();
  if (campaign.finished) resetCampaign();
  else startMatch();
});

window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();

startMatch();