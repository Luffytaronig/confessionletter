/* =========================================================
   EDIT ME: the letter text. Use \n\n for a paragraph break.
   The phrase below (TRIGGER_PHRASE) must appear verbatim
   somewhere in LETTER_TEXT — it's the moment the teddy blushes hardest.
   ========================================================= */
const LETTER_TEXT =
`Dear you,

Okay... I honestly don't know how to say this without getting nervous.

I've been wanting to tell you something for a while.

Somehow, you became someone I look forward to seeing.

Your smile makes my day a little better.

Your presence makes ordinary moments feel a little more special.

And every time I see you, I catch myself thinking...

"Why do I like this person so much?"

I don't know exactly when it happened.

I just know that somewhere along the way...

I started liking you.

Maybe more than I probably should.

I'm not asking you to give me an answer right away.

I just wanted you to know.

Because keeping this little secret to myself was getting harder.

So...

I like you.

A lot.

And maybe, just maybe...

I'd like to know if I could be someone special to you too.

— From someone who has been quietly rooting for you`;

const TRIGGER_PHRASE = "I like you.";

const FLOWER_MESSAGES = [
  "You deserve beautiful things.",
  "You make ordinary days feel special.",
  "Someone thinks you're pretty amazing.",
  "This flower reminded me of you.",
  "Okay... this one is my favorite."
];

/* =========================================================
   AMBIENT BACKGROUND
   ========================================================= */
function buildAmbient() {
  const stars = document.getElementById('stars');
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 55 + 'vh';
    s.style.animationDelay = (Math.random() * 4) + 's';
    stars.appendChild(s);
  }

  const fireflies = document.getElementById('fireflies');
  for (let i = 0; i < 12; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = Math.random() * 100 + 'vw';
    f.style.top = 20 + Math.random() * 65 + 'vh';
    f.style.animationDelay = (Math.random() * 9) + 's';
    f.style.animationDuration = (7 + Math.random() * 5) + 's';
    fireflies.appendChild(f);
  }

  const clouds = document.getElementById('clouds');
  for (let i = 0; i < 4; i++) {
    const c = document.createElement('div');
    c.className = 'cloud';
    const w = 90 + Math.random() * 100;
    c.style.width = w + 'px';
    c.style.height = w * 0.35 + 'px';
    c.style.top = (5 + Math.random() * 20) + 'vh';
    c.style.animationDuration = (50 + Math.random() * 30) + 's';
    c.style.animationDelay = (-Math.random() * 40) + 's';
    clouds.appendChild(c);
  }

  spawnPetalBatch(14);
  spawnHeartBatch(3);
}

function spawnPetalBatch(count) {
  const field = document.getElementById('petals');
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    p.style.animationDuration = (9 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.width = p.style.height = (7 + Math.random() * 9) + 'px';
    field.appendChild(p);
    setTimeout(() => p.remove(), 22000);
  }
}

function spawnHeartBatch(count) {
  const field = document.getElementById('bgHearts');
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'bg-heart';
    h.textContent = '❤';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.setProperty('--hx', (Math.random() * 100 - 50) + 'px');
    h.style.animationDuration = (10 + Math.random() * 8) + 's';
    h.style.animationDelay = (Math.random() * 6) + 's';
    field.appendChild(h);
    setTimeout(() => h.remove(), 24000);
  }
}

setInterval(() => spawnPetalBatch(2), 5000);
setInterval(() => spawnHeartBatch(1), 6000);

/* =========================================================
   SHARED TOOLTIP
   ========================================================= */
const tooltip = document.getElementById('floatingTooltip');
let tooltipTimer = null;
function showTooltip(message, duration = 2600) {
  clearTimeout(tooltipTimer);
  tooltip.textContent = message;
  tooltip.classList.add('show');
  tooltipTimer = setTimeout(() => tooltip.classList.remove('show'), duration);
}

/* =========================================================
   MUSIC (optional — add your own music.mp3 next to this file)
   ========================================================= */
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicNotesField = document.getElementById('musicNotes');
bgMusic.volume = 0.25;
let musicPlaying = false;

musicToggle.addEventListener('click', () => {
  if (!musicPlaying) {
    bgMusic.play().catch(() => { /* no music.mp3 present, or autoplay blocked */ });
    musicPlaying = true;
    spawnMusicNotes();
  } else {
    bgMusic.pause();
    musicPlaying = false;
  }
  musicToggle.classList.toggle('playing', musicPlaying);
  musicToggle.setAttribute('aria-pressed', String(musicPlaying));
  musicToggle.setAttribute('aria-label', musicPlaying ? 'Pause music' : 'Play music');
});

function spawnMusicNotes() {
  for (let i = 0; i < 4; i++) {
    const n = document.createElement('span');
    n.className = 'music-note-float';
    n.textContent = '♪';
    n.style.left = (Math.random() * 20 - 10) + 'px';
    n.style.top = '4px';
    n.style.animationDelay = (i * 0.2) + 's';
    musicNotesField.appendChild(n);
    setTimeout(() => n.remove(), 1800);
  }
}

/* =========================================================
   HELPERS: floating hearts, sparkles, scatter petals
   ========================================================= */
function spawnRisingHearts(originEl, count = 4) {
  const rect = originEl.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = '❤';
    h.style.left = (rect.left + rect.width / 2 + (Math.random() * 30 - 15)) + 'px';
    h.style.top = rect.top + 'px';
    h.style.animationDelay = (i * 0.15) + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2400);
  }
}

function spawnSparkles(originEl, count = 14) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 3;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 90;
    s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

function spawnScatterPetals(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'scatter-petal';
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 50;
    p.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--sy', Math.sin(angle) * dist - 20 + 'px');
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 950);
  }
}

/* =========================================================
   PAGE TRANSITIONS
   ========================================================= */
function goToPage(fromEl, toEl) {
  if (!fromEl || !toEl) {
    console.error("Page transition failed:", fromEl, toEl);
    return;
  }

  console.log(`Going from #${fromEl.id} to #${toEl.id}`);

  fromEl.classList.add("leaving");

  setTimeout(() => {
    fromEl.hidden = true;
    fromEl.style.display = "none";
    fromEl.classList.remove("leaving");

    toEl.hidden = false;
    toEl.style.display = "flex";
    toEl.classList.add("page-entering");

    requestAnimationFrame(() => {
      toEl.classList.remove("page-entering");
    });

    toEl.dispatchEvent(new CustomEvent("page:shown"));
  }, 850);
}

const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const page5 = document.getElementById('page5');

/* =========================================================
   PAGE 1 — FLOWERS + TEDDY + CONFESS BUTTON
   ========================================================= */
document.querySelectorAll('#bouquet1 .flower').forEach((flower) => {
  flower.addEventListener('click', () => {
    flower.classList.add('bloomed');
    if (flower.dataset.kind === 'rose') spawnScatterPetals(flower);
    spawnRisingHearts(flower, 2);
    const msg = FLOWER_MESSAGES[Math.floor(Math.random() * FLOWER_MESSAGES.length)];
    showTooltip(msg);
  });
});

// Easter egg: double-click the biggest flower
const biggestFlower = document.querySelector('[data-biggest="true"]');
if (biggestFlower) {
  biggestFlower.addEventListener('dblclick', (e) => {
    e.preventDefault();
    showTooltip("Okay fine... you're my favorite person. 💗", 3200);
    spawnSparkles(biggestFlower, 20);
  });
}

// Teddy bear: click cycle (wave -> blush -> heart + speech), hover reaction, nose sneeze
const teddy = document.getElementById('teddy');
const teddySpeech = document.getElementById('teddySpeech');
let teddyStage = 0;

teddy.addEventListener('click', (e) => {
  if (e.target.closest('#teddyNose')) return; // nose has its own handler
  teddyStage++;
  teddy.classList.remove('waving', 'blushing', 'hearting');

  if (teddyStage === 1) {
    teddy.classList.add('waving');
  } else if (teddyStage === 2) {
    teddy.classList.add('blushing');
  } else if (teddyStage >= 3) {
    teddy.classList.add('hearting', 'blushing');
    teddySpeech.textContent = "I have something to tell you... 👉👈";
    teddySpeech.hidden = false;
    teddySpeech.style.animation = 'none';
    requestAnimationFrame(() => { teddySpeech.style.animation = ''; });
  }
});

teddy.addEventListener('mouseenter', () => {
  if (teddyStage < 2) teddy.classList.add('blushing');
});
teddy.addEventListener('mouseleave', () => {
  if (teddyStage < 2) teddy.classList.remove('blushing');
});

// Easter egg: click the teddy's nose
const teddyNose = document.getElementById('teddyNose');
if (teddyNose) {
  teddyNose.addEventListener('click', (e) => {
    e.stopPropagation();
    showTooltip("Achoo! 😭🧸", 2200);
    spawnRisingHearts(teddy, 4);
  });
}

// Easter egg: click the moon 5 times
const moon = document.getElementById('moon');
let moonClicks = 0;
moon.addEventListener('click', () => {
  moonClicks++;
  if (moonClicks >= 5) {
    showTooltip("Psst... I really like you. 🤫❤️", 3400);
    moonClicks = 0;
  }
});

// Easter egg: "are you still here?" after 20 seconds on page 1
setTimeout(() => {
  if (!page1.hidden) {
    teddySpeech.textContent = "Are you still here? 👉👈";
    teddySpeech.hidden = false;
    teddySpeech.style.animation = 'none';
    requestAnimationFrame(() => { teddySpeech.style.animation = ''; });
  }
}, 20000);

const confessBtn = document.getElementById("confessBtn");

if (confessBtn) {
  confessBtn.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("CONFESSION BUTTON CLICKED");

    spawnRisingHearts(confessBtn, 6);
    goToPage(page1, page2);
  });
} else {
  console.error("Could not find #confessBtn");
}

/* =========================================================
   PAGE 2 — FLOWER REVEAL SEQUENCE
   ========================================================= */
page2.addEventListener('page:shown', runFlowerReveal);

function runFlowerReveal() {
  const flowers = page2.querySelectorAll('.reveal-flower');
  const line1 = document.getElementById('revealLine1');
  const line2 = document.getElementById('revealLine2');
  const moreBtn = document.getElementById('moreBtn');

  flowers.forEach((f, i) => {
    setTimeout(() => {
      f.classList.add('blooming');
      spawnSparkles(f, 8);
    }, 500 + i * 550);
  });

  const afterFlowers = 500 + flowers.length * 550 + 400;

  setTimeout(() => { line1.hidden = false; }, afterFlowers);
  setTimeout(() => { line2.hidden = false; }, afterFlowers + 900);
  setTimeout(() => { moreBtn.hidden = false; }, afterFlowers + 1700);
}

const moreBtn = document.getElementById('moreBtn');
moreBtn.addEventListener('click', () => {
  goToPage(page2, page3);
});

/* =========================================================
   PAGE 3 — ENVELOPE
   ========================================================= */
const envelope = document.getElementById('envelope');
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  envelope.classList.add('open');
  spawnRisingHearts(envelope, 5);
  spawnSparkles(envelope, 14);
  document.body.classList.add('dimmed');

  setTimeout(() => {
    goToPage(page3, page4);
  }, 1400);
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openEnvelope();
  }
});

/* =========================================================
   PAGE 4 — TYPEWRITER LETTER + TEDDY REACTION
   ========================================================= */
page4.addEventListener('page:shown', startLetter);

const letterBody = document.getElementById('letterBody');
const teddyReading = document.getElementById('teddyReading');

function startLetter() {
  teddyReading.classList.add('nervous', 'blushing');
  letterBody.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '\u00A0';

  let i = 0;
  let triggered = false;
  const speed = 14; // ms per character — unhurried, readable

  function step() {
    if (i < LETTER_TEXT.length) {
      letterBody.textContent = LETTER_TEXT.slice(0, i + 1);
      letterBody.appendChild(cursor);
      i++;

      if (!triggered && LETTER_TEXT.slice(0, i).includes(TRIGGER_PHRASE)) {
        triggered = true;
        teddyReading.classList.remove('nervous');
        teddyReading.classList.add('excited');
        spawnRisingHearts(teddyReading, 6);
      }

      setTimeout(step, speed);
    } else {
  cursor.remove();

  const letterNextBtn = document.getElementById("letterNextBtn");

  setTimeout(() => {
    letterNextBtn.hidden = false;
  }, 700);
}
  }
  step();
}

/* =========================================================
   PAGE 5 — THE BIG QUESTION
   ========================================================= */
page5.addEventListener('page:shown', runQuestionSequence);

function runQuestionSequence() {
  const questionMain = document.getElementById('questionMain');
  const questionButtons = document.getElementById('questionButtons');

  setTimeout(() => { questionMain.hidden = false; }, 900);
  setTimeout(() => { questionButtons.hidden = false; }, 1700);
}

const yesBtn = document.getElementById('yesBtn');
const timeBtn = document.getElementById('timeBtn');
const questionButtons = document.getElementById('questionButtons');
const yesResponse = document.getElementById('yesResponse');
const timeResponse = document.getElementById('timeResponse');

yesBtn.addEventListener('click', () => {

  questionButtons.hidden = true;
  questionMain.hidden = true;
  questionLead.hidden = true;

  timeResponse.hidden = true;
  yesResponse.hidden = false;

  spawnRisingHearts(yesBtn, 8);
  triggerFinale();
});


timeBtn.addEventListener('click', () => {

  questionButtons.hidden = true;
  questionMain.hidden = true;
  questionLead.hidden = true;

  yesResponse.hidden = true;
  timeResponse.hidden = false;

  spawnRisingHearts(timeBtn, 3);
});

function triggerFinale() {
  const finale = document.getElementById('finale');
  finale.classList.add('active');

  const confettiColors = ['#C24C5E', '#D3AD73', '#F3D3DA', '#E7DEF2', '#CB8B98'];

  for (let i = 0; i < 40; i++) {
    const h = document.createElement('div');
    h.className = 'finale-heart';
    h.textContent = '❤';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.setProperty('--hx', (Math.random() * 100 - 50) + 'px');
    h.style.animationDelay = (Math.random() * 1.4) + 's';
    finale.appendChild(h);
  }

  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'finale-spark';
    s.style.left = '50vw';
    s.style.top = '45vh';
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 340;
    s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    s.style.animationDelay = (Math.random() * 0.9) + 's';
    finale.appendChild(s);
  }

  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'finale-petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    p.style.animationDelay = (Math.random() * 1.1) + 's';
    finale.appendChild(p);
  }

  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'finale-confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.animationDelay = (Math.random() * 1) + 's';
    finale.appendChild(c);
  }

  setTimeout(() => {
    finale.classList.remove('active');
    finale.innerHTML = '';
  }, 4500);
}

/* =========================================================
   INIT
   ========================================================= */
buildAmbient();

const letterNextBtn = document.getElementById("letterNextBtn");

if (letterNextBtn) {
  letterNextBtn.addEventListener("click", () => {
    spawnRisingHearts(letterNextBtn, 5);
    goToPage(page4, page5);
  });
}
