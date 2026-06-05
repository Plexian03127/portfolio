# 📁 포트폴리오 파일 구조

```
portfolio/
├── index.html      ← 메인 HTML (수정 불필요)
├── style.css       ← 스타일 (수정 불필요)
├── app.js          ← 로직 (수정 불필요)
├── config.js       ← ✅ 여기만 수정!
└── images/         ← 포스터 이미지 업로드 폴더
    ├── poster1.jpg
    ├── poster2.jpg
    └── ...
```

---

## 🚀 GitHub Pages 배포 단계

### 1단계 — GitHub 저장소 만들기

1. [github.com](https://github.com) 로그인
2. 우측 상단 **`+`** → **New repository**
3. Repository name: `portfolio` (또는 원하는 이름)
4. **Public** 선택 (GitHub Pages 무료 사용)
5. **Create repository** 클릭

---

### 2단계 — 파일 업로드

**방법 A: GitHub 웹에서 직접 업로드 (가장 쉬움)**
1. 저장소 페이지에서 **`Add file`** → **`Upload files`**
2. `index.html`, `style.css`, `app.js`, `config.js` 파일을 모두 드래그
3. **Commit changes** 클릭

**방법 B: GitHub Codespaces 사용**
```bash
# 터미널에서 실행
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

### 3단계 — GitHub Pages 활성화

1. 저장소 → **Settings** 탭
2. 왼쪽 메뉴 **Pages** 클릭
3. Source: **Deploy from a branch**
4. Branch: **main** / **/ (root)**
5. **Save** 클릭

⏳ 1~2분 후 **`https://YOUR_USERNAME.github.io/portfolio`** 접속 가능!

---

## ✏️ 콘텐츠 수정 방법 (`config.js`)

### 기본 정보
```js
name: "홍길동",
tagline: "Marketing & Branding Creator",
heroBio: "숏폼 콘텐츠로\n브랜드를 빛냅니다.",
aboutBio: "자기소개 텍스트를 입력하세요.",
```

### 영상 추가
YouTube URL `https://www.youtube.com/watch?v=ABC123XYZ` 에서
`ABC123XYZ` 부분이 `youtubeId`입니다.
```js
videos: [
  {
    platform: "youtube",
    youtubeId: "ABC123XYZ",     // ← URL의 ?v= 뒤 값
    title: "캠페인 영상",
    description: "영상 설명",
    link: "https://youtube.com/watch?v=ABC123XYZ",
    views: "50,000",            // API 키 없을 때 표시
    likes: "2,000",
  },
  {
    platform: "instagram",
    youtubeId: "",
    title: "인스타 릴스",
    description: "릴스 설명",
    link: "https://instagram.com/reel/XXXXX/",
    thumbnail: "images/thumb1.jpg",  // 썸네일 이미지
    views: "30,000",
    likes: "1,500",
  },
]
```

### 포스터 추가
1. `images/` 폴더에 이미지 파일 업로드 (GitHub)
2. `config.js`에 경로 입력:
```js
posters: [
  {
    title: "캠페인 포스터",
    description: "설명 텍스트",
    image: "images/poster1.jpg",   // ← 업로드한 파일명
    tag: "Campaign",
  },
]
```

---

## 📊 YouTube 실시간 조회수 연동 (선택)

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성
3. **API 및 서비스** → **라이브러리** → `YouTube Data API v3` 검색 → **사용 설정**
4. **사용자 인증 정보** → **API 키 만들기**
5. `config.js`에 입력:
```js
youtubeApiKey: "AIzaSy여기에_발급받은_키_입력",
```

> ⚠️ API 키는 GitHub Public 저장소에 올리면 노출됩니다.
> 무료 할당량(하루 10,000 유닛)으로 충분히 사용 가능합니다.
> 키 보호가 필요하면 Google Cloud에서 **HTTP 리퍼러 제한** 설정을 권장합니다.

---

## 🔄 내용 업데이트 방법

`config.js` 수정 후 GitHub에 다시 업로드(또는 push)하면
GitHub Pages가 자동으로 반영됩니다. (보통 1~3분 소요)