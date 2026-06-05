/**
 * =============================================
 *  PORTFOLIO CONFIG — 여기만 수정하세요!
 * =============================================
 */

const CONFIG = {

  /* ── 기본 정보 ─────────────────────────── */
  name: "김동혁",              // 이름 또는 닉네임
  tagline: "Marketing & Branding",
  heroTitle: ["숨은 맛집을 발굴하고", "이야기로 잇습니다."],  // 두 줄
  heroBio: "부산의 골목 맛집을 숏폼 영상과\n인포그래픽으로 세상에 알립니다.",
  aboutBio: "로컬 맛집의 진짜 이야기를 담는 마케팅 크리에이터입니다. 숏폼 영상과 인포그래픽 포스터로 작은 식당의 매력을 더 많은 사람들에게 전달합니다.",

  /* ── 스킬 태그 ─────────────────────────── */
  skills: [
    "숏폼 영상 제작",
    "로컬 맛집 마케팅",
    "인포그래픽 디자인",
    "SNS 콘텐츠 기획",
    "브랜드 스토리텔링",
  ],

  /* ── 주요 수치 (About 섹션) ─────────────── */
  stats: [
    { value: "50+",  label: "Projects" },
    { value: "2M+",  label: "Total Views" },
    { value: "98%",  label: "Client Satisfaction" },
  ],

  /* ── YouTube API ───────────────────────── */
  // Google Cloud Console → YouTube Data API v3 → API 키 발급 후 입력
  // 비워두면 수동으로 입력한 views/likes가 표시됩니다.
  youtubeApiKey: "",   // 예: "AIzaSy..."

  /* ── 영상 목록 ─────────────────────────── */
  // platform: "youtube" | "instagram" | "tiktok"
  // youtubeId: YouTube 영상 ID (URL의 ?v= 뒤 값)
  // link: 클릭 시 이동할 원본 링크
  // views / likes: API 키 없을 때 수동 입력값
  videos: [
    {
      platform: "youtube",
      youtubeId: "liPDAVbMj0Q",
      title: "부산의 숨은 맛집 - 의령식당",
      description: "부산 현지인만 아는 숨은 맛집을 소개하는 숏폼 홍보 영상",
      link: "https://youtube.com/shorts/liPDAVbMj0Q",
      views: "—",   // API 키 입력 전 임시값 (API 키 있으면 자동 갱신)
      likes: "—",
    },
    {
      platform: "youtube",
      youtubeId: "esnuxml95vc",
      title: "[봄시즌 특집] 부산의 숨은 맛집 - 오뚜기식당",
      description: "봄 시즌 특집으로 제작된 부산 숨은 맛집 시리즈 홍보 영상",
      link: "https://youtube.com/shorts/esnuxml95vc",
      views: "—",
      likes: "—",
    },
  ],

  /* ── 포스터/랜딩페이지 목록 ─────────────── */
  // type: "image"   → 이미지 클릭 시 라이트박스
  // type: "landing" → 카드 클릭 시 외부 URL로 이동 (새 탭)
  posters: [
    {
      type: "landing",
      title: "부산 숨은 맛집",
      description: "부산 현지인만 아는 숨은 맛집들을 모아 소개하는 인포그래픽 랜딩 페이지",
      url: "https://restaurants-in-busan.aiapp.help/",
      tag: "Landing Page",
    },
    // 이미지 포스터는 아래처럼 추가하세요
    // {
    //   type: "image",
    //   title: "인포그래픽 포스터",
    //   description: "설명",
    //   image: "images/poster1.jpg",
    //   tag: "Infographic",
    // },
  ],

  /* ── 연락처 ─────────────────────────────── */
  contact: {
    sub: "협업 제안, 프로젝트 문의는 아래로 연락주세요.",
    links: [
      { label: "Email",     icon: "✉",  url: "kdh20030717@gmail.com" },
      { label: "Instagram", icon: "◈",  url: "https://instagram.com/plexian03127" },
      { label: "YouTube",   icon: "▶",  url: "https://youtube.com/@Kim_Dong-hyeok" },
    ],
  },

};