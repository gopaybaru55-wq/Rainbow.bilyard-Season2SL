const players = Array.from({ length: 32 }, (_, index) => ({
  number: index + 1,
  name: `Peserta ${String(index + 1).padStart(2, "0")}`,
}));

const ballColors = [
  "#e8c641", "#3974c5", "#c7483d", "#744c9b", "#e98732",
  "#3d9b8a", "#933b36", "#222522", "#dfb944",
];

const playerGrid = document.querySelector("#player-grid");
const searchInput = document.querySelector("#player-search");
const countLabel = document.querySelector("#roster-count");

function renderPlayers(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase("id");
  const visiblePlayers = players.filter((player) =>
    player.name.toLocaleLowerCase("id").includes(normalizedQuery)
      || String(player.number).includes(normalizedQuery)
  );

  playerGrid.replaceChildren();

  for (const player of visiblePlayers) {
    const ballNumber = ((player.number - 1) % 9) + 1;
    const card = document.createElement("article");
    card.className = "player-card";
    card.style.setProperty("--ball-color", ballColors[ballNumber - 1]);

    const ball = document.createElement("span");
    ball.className = "ball";
    ball.setAttribute("aria-label", `Bola nomor ${ballNumber}`);
    ball.textContent = String(ballNumber);

    const info = document.createElement("span");
    info.className = "player-info";

    const number = document.createElement("span");
    number.className = "player-number";
    number.textContent = `PLAYER ${String(player.number).padStart(2, "0")}`;

    const name = document.createElement("span");
    name.className = "player-name";
    name.textContent = player.name;

    info.append(number, name);
    card.append(ball, info);
    playerGrid.append(card);
  }

  countLabel.textContent = String(visiblePlayers.length);
}

renderPlayers();
searchInput.addEventListener("input", (event) => renderPlayers(event.currentTarget.value));
