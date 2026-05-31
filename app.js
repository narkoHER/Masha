const suits = [
  { id: "spades", symbol: "♠", red: false },
  { id: "clubs", symbol: "♣", red: false },
  { id: "hearts", symbol: "♥", red: true },
  { id: "diamonds", symbol: "♦", red: true },
];
const ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const values = Object.fromEntries(ranks.map((rank, index) => [rank, index]));

const mashaScenes = [
  "./assets/masha/stage-0.jpg",
  "./assets/masha/stage-1.jpg",
  "./assets/masha/stage-2.jpg",
  "./assets/masha/stage-3.jpg",
  "./assets/masha/stage-4.jpg",
  "./assets/masha/stage-5.jpg",
  "./assets/masha/stage-6.jpg",
];

const removedItems = ["кроссовки", "кофта", "шорты", "топ", "украшения", "последний образ"];

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
  takeBtn: document.querySelector("#takeBtn"),
  doneBtn: document.querySelector("#doneBtn"),
  passBtn: document.querySelector("#passBtn"),
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
let campaign = newCampaign();

function newCampaign() {
  return {
    lives: 3,
    stage: 0,
    round: 1,
    difficulty: 1,
    finished: false,
  };
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
    message: `Партия ${campaign.round}. Маша играет на уровне ${campaign.difficulty}.`,
    over: false,
    resultHandled: false,
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
    state.message = "У Маши младший козырь. Она начинает.";
  } else {
    state.attacker = "player";
    state.defender = "opponent";
    state.phase = "attack";
    state.message = "Твой первый ход. Выбирай карту для атаки.";
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

function canAttackWith(card) {
  if (!state.table.length) return true;
  const tableRanks = state.table.flatMap((pair) => [pair.attack.rank, pair.defense?.rank]).filter(Boolean);
  return tableRanks.includes(card.rank) && state.table.length < Math.min(6, defenderHand().length);
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
  if (state.phase === "attack" && state.attacker === "player" && canAttackWith(card)) {
    const played = removeCard(state.player, card.id);
    state.table.push({ attack: played, defense: null });
    state.phase = "opponent-defense";
    state.message = `Ты ходишь ${label(played)}. Маша думает, чем крыть.`;
    render();
    window.setTimeout(opponentDefend, 650);
    return;
  }
  if (state.phase === "defense" && state.defender === "player") {
    const openPair = state.table.find((pair) => !pair.defense);
    if (!openPair || !cardBeats(card, openPair.attack)) return;
    const played = removeCard(state.player, card.id);
    openPair.defense = played;
    state.phase = "after-player-defense";
    state.message = `Есть. ${label(played)} бьет ${label(openPair.attack)}.`;
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
  state.table.push({ attack: removeCard(state.opponent, card.id), defense: null });
  state.phase = "defense";
  state.message = `Маша подкидывает ${label(card)}. Твоя защита.`;
  render();
}

function opponentDefend() {
  if (state.over) return;
  const openPair = state.table.find((pair) => !pair.defense);
  if (!openPair) return;
  const defense = chooseDefenseCard(state.opponent, openPair.attack);
  if (!defense) {
    state.opponent.push(...collectTable());
    state.message = "Маша берет карты и чуть прищуривается.";
    endRound("player");
    return;
  }
  openPair.defense = removeCard(state.opponent, defense.id);
  const extra = chooseThrowIn(state.player);
  state.phase = "attack";
  state.message = extra ? "Маша отбилась. Можно подкинуть по достоинству или закрыть." : "Маша отбилась. Можно закрывать.";
  render();
}

function afterPlayerDefense() {
  if (state.over) return;
  const extra = chooseThrowIn(state.opponent);
  if (extra && state.table.length < Math.min(6, state.player.length + state.table.length)) {
    state.table.push({ attack: removeCard(state.opponent, extra.id), defense: null });
    state.phase = "defense";
    state.message = `Маша подкидывает ${label(extra)}.`;
    render();
    return;
  }
  state.phase = "can-finish";
  state.message = "Маша больше не подкидывает. Жми «Бито».";
  render();
}

function chooseAttackCard(hand) {
  const candidates = [...hand].filter(canAttackWith);
  if (!candidates.length) return null;
  if (campaign.difficulty < 4) return candidates.sort(sortCards)[0];
  return candidates
    .map((card) => ({ card, pressure: playerDefenseOptions(card), trump: card.suit === state.trump.suit ? 1 : 0 }))
    .sort((a, b) => a.pressure - b.pressure || a.trump - b.trump || a.card.value - b.card.value)[0].card;
}

function chooseDefenseCard(hand, attack) {
  const options = [...hand].filter((card) => cardBeats(card, attack)).sort(sortCards);
  if (!options.length) return null;
  if (Math.random() < opponentMistakeChance()) return null;
  return options[0];
}

function chooseThrowIn(hand) {
  if (!state.table.length) return null;
  if (hand === state.opponent && Math.random() > throwInAggression()) return null;
  const ranksOnTable = new Set(state.table.flatMap((pair) => [pair.attack.rank, pair.defense?.rank]).filter(Boolean));
  return [...hand].filter((card) => ranksOnTable.has(card.rank)).sort(sortCards)[0] ?? null;
}

function playerDefenseOptions(attack) {
  return state.player.filter((card) => cardBeats(card, attack)).length;
}

function opponentMistakeChance() {
  return Math.max(0.03, 0.32 - campaign.difficulty * 0.045);
}

function throwInAggression() {
  return Math.min(0.96, 0.42 + campaign.difficulty * 0.08);
}

function playerTake() {
  if (state.defender !== "player" || state.phase !== "defense") return;
  state.player.push(...collectTable());
  state.message = "Ты забираешь карты. Маша сохраняет ход.";
  endRound("opponent");
}

function finishBeat() {
  if (!state.table.length || state.table.some((pair) => !pair.defense)) return;
  state.discard += state.table.flatMap((pair) => [pair.attack, pair.defense]).length;
  state.table = [];
  const next = state.defender;
  state.attacker = next;
  state.defender = next === "player" ? "opponent" : "player";
  drawUp();
  checkGameOver();
  if (state.over) return render();
  state.phase = state.attacker === "player" ? "attack" : "opponent-attack";
  state.message = state.attacker === "player" ? "Бито. Теперь твоя атака." : "Бито. Теперь Маша атакует.";
  render();
  if (state.attacker === "opponent") window.setTimeout(opponentAttack, 700);
}

function passThrowIn() {
  if (state.phase === "can-finish" || state.phase === "after-player-defense") finishBeat();
}

function endRound(nextAttacker) {
  state.table = [];
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
  if (winner === "player") state.message = "Ты выиграл партию. Маша выполняет условие.";
  if (winner === "masha") state.message = "Маша выиграла партию. Одно сердце сгорает.";
  if (winner === "draw") state.message = "Ничья. Раунд не меняет счет.";
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
  }

  if (winner === "masha") {
    campaign.lives = Math.max(0, campaign.lives - 1);
    kicker = "Поражение";
    title = campaign.lives ? "Минус одно сердце" : "Сердца закончились";
    text = campaign.lives ? "Маша оставляет свой текущий образ. Попробуй отыграться." : "Серия проиграна. Можно начать заново.";
  }

  campaign.finished = campaign.stage >= 6 || campaign.lives <= 0;
  if (!campaign.finished) campaign.round += 1;

  ui.resultImage.src = mashaScenes[campaign.stage || previousStage];
  ui.resultKicker.textContent = kicker;
  ui.resultTitle.textContent = title;
  ui.resultText.textContent = text;
  ui.nextRoundBtn.textContent = campaign.finished ? "Начать заново" : "Следующая партия";
  renderCampaign();
  ui.resultDialog.showModal();
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

  ui.trumpCard.replaceChildren(cardElement(state.trump, { disabled: true }));
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
        ((state.phase === "attack" && state.attacker === "player" && canAttackWith(card)) ||
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
  const canFinish = state.table.length > 0 && state.table.every((pair) => pair.defense);
  ui.takeBtn.disabled = !canTake || state.over;
  ui.doneBtn.disabled = !canFinish || state.over;
  ui.passBtn.disabled = !(state.phase === "after-player-defense" || state.phase === "can-finish") || state.over;
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
ui.passBtn.addEventListener("click", passThrowIn);
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
