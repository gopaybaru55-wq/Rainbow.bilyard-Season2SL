/* ===== EDIT DATA DI SINI ===== */
const WELCOME = "SELAMAT DATANG DI TOURNAMENT BILLIARD RAINBOW SEASON 2 2026  ★  9 BALL  ★  32 PLAYERS  ★  DOUBLE ELIMINATION  ★  SEMOGA SUKSES DAN MAIN SPORTIF";

// Ganti logo dengan nama file gambar, misal "img/sponsor1.png". Kosongkan untuk teks saja.
const SPONSORS = [
  { name: "SPONSOR 1", logo: "" },
  { name: "SPONSOR 2", logo: "" },
  { name: "SPONSOR 3", logo: "" },
  { name: "SPONSOR 4", logo: "" },
  { name: "SPONSOR 5", logo: "" },
];

// Ganti dengan 32 nama peserta asli
const PLAYERS = Array.from({ length: 32 }, (_, i) => "PEMAIN " + String(i + 1).padStart(2, "0"));
/* ============================= */

const BALLS = {
  1: "#f5c400", 2: "#1747c4", 3: "#d7261e", 4: "#5b2a86",
  5: "#f26b0f", 6: "#0e7a3b", 7: "#8a1f1f", 8: "#111111", 9: "#f5c400",
};
const ball = (n, size) =>
  `<span class="ball${n === 9 ? " stripe" : ""}" style="--c:${BALLS[n]};--s:${size}px"><i>${n}</i></span>`;

// Bola hero 1-9
document.getElementById("heroBalls").innerHTML = [1,2,3,4,5,6,7,8,9].map(n => ball(n, 46)).join("");

// Ticker (diduplikasi agar berjalan mulus)
const t = `<span>${WELCOME}</span>`;
document.getElementById("ticker").innerHTML = t.repeat(4);

// Sponsor
document.getElementById("sponsors").innerHTML = SPONSORS.map(s =>
  `<div class="sponsor" tabindex="0">${s.logo ? `<img src="${s.logo}" alt="${s.name}">` : s.name}</div>`
).join("");

// Peserta
const box = document.getElementById("players");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

function render(list) {
  box.innerHTML = list.map(p =>
    `<article class="card" tabindex="0">${ball(p.no % 9 || 9, 54)}
      <div class="info"><div class="seed">NO. ${String(p.no).padStart(2, "0")}</div><div class="name">${p.name}</div></div></article>`
  ).join("");
  count.textContent = `${list.length} / ${PLAYERS.length}`;
  empty.hidden = list.length > 0;
}
const all = PLAYERS.map((name, i) => ({ no: i + 1, name }));
render(all);

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  render(all.filter(p => p.name.toLowerCase().includes(q)));
});

// Glow mengikuti kursor
box.addEventListener("pointermove", e => {
  const c = e.target.closest(".card");
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", e.clientX - r.left + "px");
  c.style.setProperty("--my", e.clientY - r.top + "px");
});
