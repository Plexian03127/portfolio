/* =============================================
   app.js — Portfolio Logic
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderBasicInfo();
  renderAbout();
  renderVideos();
  renderPosters();
  renderContact();
  initLightbox();
  initScrollAnimations();
});

/* ── NAV ────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });
}

/* ── BASIC INFO ─────────────────────────────── */
function renderBasicInfo() {
  const c = CONFIG;
  setText("nav-name", c.name);
  setText("hero-tag", c.tagline);
  setText("footer-copy", `© ${new Date().getFullYear()} ${c.name}. All rights reserved.`);

  const titleEl = document.querySelector(".hero-title");
  if (titleEl && c.heroTitle.length >= 2) {
    titleEl.innerHTML = `
      <span class="line">${c.heroTitle[0]}</span>
      <span class="line accent">${c.heroTitle[1]}</span>
    `;
  }

  const subEl = document.getElementById("hero-sub");
  if (subEl) subEl.innerHTML = c.heroBio.replace(/\n/g, "<br>");
}

/* ── ABOUT ──────────────────────────────────── */
function renderAbout() {
  const c = CONFIG;
  setText("about-name", c.name);
  setText("about-bio", c.aboutBio);
  setText("about-heading", ""); // rebuild
  const heading = document.getElementById("about-heading");
  if (heading) heading.innerHTML = `안녕하세요,<br><em id="about-name">${c.name}</em>입니다.`;

  // Skills
  const skillsList = document.getElementById("about-skills-list");
  if (skillsList) {
    skillsList.innerHTML = c.skills.map(s =>
      `<li class="skill-tag">${s}</li>`
    ).join("");
  }

  // Stats
  const statsEl = document.getElementById("about-stats");
  if (statsEl) {
    statsEl.innerHTML = c.stats.map(s => `
      <div class="stat-item">
        <span class="stat-value">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join("");
  }
}

/* ── VIDEOS ─────────────────────────────────── */
async function renderVideos() {
  const grid = document.getElementById("video-grid");
  if (!grid) return;

  // Render cards immediately with manual data
  const cards = CONFIG.videos.map((v, i) => buildVideoCard(v, i));
  grid.innerHTML = cards.join("");

  // If API key provided, fetch live stats
  if (CONFIG.youtubeApiKey) {
    const ytVideos = CONFIG.videos.filter(v => v.platform === "youtube" && v.youtubeId);
    for (const v of ytVideos) {
      fetchYouTubeStats(v.youtubeId);
    }
  }

  // Attach click handlers for YouTube embed modal
  grid.querySelectorAll(".video-card[data-yt-id]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.ytId;
      const link = card.dataset.link;
      if (id) openVideoModal(id);
      else if (link) window.open(link, "_blank");
    });
  });
}

function buildVideoCard(v, i) {
  let thumb = "";
  if (v.platform === "youtube" && v.youtubeId) {
    // Shorts는 maxresdefault 없는 경우 많아 hqdefault로 fallback
    thumb = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
  } else if (v.thumbnail) {
    thumb = v.thumbnail;
  } else {
    thumb = `https://placehold.co/640x360/1a1a1a/ffffff?text=${encodeURIComponent(v.title)}`;
  }

  const platformBadge = {
    youtube: "▶ YouTube Shorts",
    instagram: "◈ Instagram",
    tiktok: "♪ TikTok",
  }[v.platform] || v.platform;

  const isShorts = v.link && v.link.includes("/shorts/");
  const aspectClass = isShorts ? "thumb-shorts" : "";
  const ytAttr = v.youtubeId ? `data-yt-id="${v.youtubeId}"` : "";

  return `
    <div class="video-card" ${ytAttr} data-link="${v.link}" data-index="${i}">
      <div class="video-thumb ${aspectClass}">
        <img src="${thumb}" alt="${v.title}" loading="lazy"
          onerror="this.src='https://placehold.co/640x360/1a1a1a/ffffff?text=${encodeURIComponent(v.title)}'" />
        <div class="video-play-btn">▶</div>
        <span class="platform-badge">${platformBadge}</span>
      </div>
      <div class="video-info">
        <h3 class="video-title">${v.title}</h3>
        <p class="video-desc">${v.description}</p>
        <div class="video-stats">
          <span class="stat" id="views-${i}">👁 ${v.views || "—"}</span>
          <span class="stat" id="likes-${i}">♥ ${v.likes || "—"}</span>
        </div>
      </div>
    </div>
  `;
}

async function fetchYouTubeStats(videoId) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${CONFIG.youtubeApiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items || !data.items.length) return;
    const stats = data.items[0].statistics;

    // Find the card with this video ID and update its stats
    const cards = document.querySelectorAll(`[data-yt-id="${videoId}"]`);
    cards.forEach(card => {
      const idx = card.dataset.index;
      const viewsEl = document.getElementById(`views-${idx}`);
      const likesEl = document.getElementById(`likes-${idx}`);
      if (viewsEl) viewsEl.textContent = `👁 ${formatNumber(stats.viewCount)}`;
      if (likesEl) likesEl.textContent = `♥ ${formatNumber(stats.likeCount)}`;
    });
  } catch (e) {
    console.warn("YouTube API 오류:", e);
  }
}

/* ── VIDEO MODAL ────────────────────────────── */
let videoModal = null;

function openVideoModal(youtubeId) {
  if (videoModal) videoModal.remove();

  videoModal = document.createElement("div");
  videoModal.className = "video-modal";
  videoModal.innerHTML = `
    <div class="vm-overlay"></div>
    <div class="vm-inner">
      <button class="vm-close">✕</button>
      <div class="vm-embed">
        <iframe
          src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
  document.body.appendChild(videoModal);
  setTimeout(() => videoModal.classList.add("open"), 10);

  const closeModal = () => {
    videoModal.classList.remove("open");
    setTimeout(() => { if (videoModal) videoModal.remove(); videoModal = null; }, 300);
  };
  videoModal.querySelector(".vm-close").addEventListener("click", closeModal);
  videoModal.querySelector(".vm-overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); }, { once: true });
}

/* ── POSTERS ────────────────────────────────── */
function renderPosters() {
  const grid = document.getElementById("poster-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.posters.map((p, i) => {
    if (p.type === "landing") {
      return buildLandingCard(p, i);
    }
    return buildImageCard(p, i);
  }).join("");

  // 이미지 카드 → 라이트박스
  grid.querySelectorAll(".poster-card[data-type='image']").forEach(card => {
    const open = () => openLightbox(parseInt(card.dataset.index));
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter") open(); });
  });

  // 랜딩 카드 → 새 탭
  grid.querySelectorAll(".poster-card[data-type='landing']").forEach(card => {
    card.addEventListener("click", () => window.open(card.dataset.url, "_blank", "noopener"));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter") window.open(card.dataset.url, "_blank", "noopener");
    });
  });
}

function buildImageCard(p, i) {
  return `
    <div class="poster-card" data-type="image" data-index="${i}" role="button" tabindex="0" aria-label="${p.title} 크게 보기">
      <div class="poster-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="poster-overlay">
          <span class="poster-zoom">⤢ 크게 보기</span>
        </div>
      </div>
      <div class="poster-meta">
        <span class="poster-tag">${p.tag}</span>
        <h3 class="poster-title">${p.title}</h3>
        <p class="poster-desc">${p.description}</p>
      </div>
    </div>
  `;
}

function buildLandingCard(p, i) {
  const domain = new URL(p.url).hostname;
  return `
    <div class="poster-card landing-card" data-type="landing" data-index="${i}" data-url="${p.url}" role="button" tabindex="0" aria-label="${p.title} 사이트 방문">
      <div class="poster-img-wrap landing-preview">
        <div class="landing-mockup">
          <div class="lm-bar">
            <span class="lm-dot"></span><span class="lm-dot"></span><span class="lm-dot"></span>
            <span class="lm-url">${domain}</span>
          </div>
          <iframe src="${p.url}" title="${p.title} 미리보기" loading="lazy" scrolling="no" tabindex="-1"></iframe>
        </div>
        <div class="poster-overlay">
          <span class="poster-zoom">↗ 사이트 방문</span>
        </div>
      </div>
      <div class="poster-meta">
        <span class="poster-tag">${p.tag}</span>
        <h3 class="poster-title">${p.title}</h3>
        <p class="poster-desc">${p.description}</p>
        <span class="landing-link-badge">${domain} ↗</span>
      </div>
    </div>
  `;
}

/* ── LIGHTBOX ───────────────────────────────── */
function initLightbox() {
  document.getElementById("lb-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", e => {
    if (e.target === document.getElementById("lightbox")) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(index) {
  const p = CONFIG.posters[index];
  document.getElementById("lb-img").src = p.image;
  document.getElementById("lb-img").alt = p.title;
  document.getElementById("lb-title").textContent = p.title;
  document.getElementById("lb-desc").textContent = p.description;
  const lb = document.getElementById("lightbox");
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

/* ── CONTACT ────────────────────────────────── */
function renderContact() {
  const c = CONFIG.contact;
  setText("contact-sub", c.sub);
  const linksEl = document.getElementById("contact-links");
  if (linksEl) {
    linksEl.innerHTML = c.links.map(l => `
      <a href="${l.url}" class="contact-btn" target="_blank" rel="noopener">
        <span class="contact-icon">${l.icon}</span>
        <span>${l.label}</span>
      </a>
    `).join("");
  }
}

/* ── SCROLL ANIMATIONS ──────────────────────── */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    ".video-card, .poster-card, .stat-item, .about-text-col, .about-stats-col, .section-header"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/* ── UTILS ──────────────────────────────────── */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function formatNumber(n) {
  if (!n) return "—";
  const num = parseInt(n);
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toLocaleString();
}