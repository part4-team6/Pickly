# 👀 Pickly

![image](https://github.com/user-attachments/assets/0bf3d322-9308-4e82-9e29-ced002f0444c)

**"Pickly"는 다양한 분야의 상품을 A/B 테스트 방식으로 비교하고, 리뷰와 별점을 기반으로 최적의 선택을 도와주는 상품 큐레이션 플랫폼입니다.**

---

## 🔗 배포 주소

https://pickly-gamma.vercel.app/

- 테스트 아이디: test2639@naver.com
- 테스트 비밀번호: @00000000
---

## 🛠 기술 스택

### 🎨 Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)<br>
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)<br>
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)<br>
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)<br>
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat&logo=framer&logoColor=white)<br>
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat&logo=react-query&logoColor=white)<br>
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=zoo&logoColor=white)<br>

### 🔧 Backend
![Next.js API](https://img.shields.io/badge/Next.js%20API%20Routes-000000?style=flat&logo=next.js&logoColor=white) – 서버리스 백엔드 <br>
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) – 유튜브, 스포티파이, OpenAI 등 검색 결과 저장 <br>
![Auth](https://img.shields.io/badge/Cookie--based%20Auth-FFCC00?style=flat&logo=cookiecutter&logoColor=black) – 로그인 시 토큰을 HTTP-only 쿠키에 저장 <br>

### 🌐 External APIs
![Spotify API](https://img.shields.io/badge/Spotify-1DB954?style=flat&logo=spotify&logoColor=white) – 음악 상품 → 해당 앨범으로 연동 <br>
![YouTube API](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white) – 뮤직비디오 및 콘텐츠 제공 <br>
![Google Maps API](https://img.shields.io/badge/Google%20Maps-4285F4?style=flat&logo=googlemaps&logoColor=white) – 위치 기반 정보 연동 <br>
![OpenAI API](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) – 상품명과 설명을 분석해 YouTube/Spotify/Google Maps 링크 자동 생성 <br>

---

## 👀 서비스 둘러보기

### 🏠 홈페이지

- 서비스 소개, 로그인/회원가입 버튼, 인기 상품 미리보기 등이 포함된 첫 진입 페이지입니다.
---
### 🔐 로그인 / 회원가입 페이지

- 유효성 검사와 **Zustand를 활용해 로그인 시 사용자 정보를 클라이언트 상태로 관리**합니다.
- 로그인 시 Next.js API Routes 기반 자체 백엔드에서 인증을 처리하며, **토큰은 HTTP-only 쿠키에 저장**해 보안성을 높였습니다.
  
![login-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/4d8f8b9b-21ef-4c4d-9107-b83119e63c00)

---
### 🧭 메인 페이지

- **상품 검색, 카테고리별 정렬, 무한 스크롤, 로딩 기능** 구현
  
![main-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/4de35216-63a6-43f0-95de-2c55afe1fee2)

- **상품 추가 기능**으로 직접 상품을 등록할 수 있습니다.
  
![main2-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/9ecbce1e-03df-4c61-8769-5edd14bf3662)

---
### 📄 상품 상세 페이지

- **찜하기, 리뷰 작성/수정/삭제, 비교 기능** 제공합니다.
- 상품 등록자에게는 **편집 및 삭제** 기능이 추가로 제공됩니다.
  
![detail-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/8ed67f07-0d42-492c-9455-6648ac356a3d)
![review-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/cab287eb-a970-4fab-a2c3-c811292ad777)

---
### ⚖️ 비교하기 페이지

- 리뷰 수, 평균 별점, 찜 수를 기준으로 두 상품을 비교합니다.
- 로그인하지 않아도 **게스트 모드**로 이용 가능합니다.
  
![compare-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/2e77fe12-b54d-4dc5-b2b8-888ad8440239)

---
### 👤 유저페이지 / 마이페이지

- 유저 페이지에서 **팔로잉, 팔로우 목록**을 볼 수 있고 리뷰 등록한 상품, 찜한 상품, 등록한 상품 또한 볼 수 있습니다.
- 마이페이지에서는 추가로 **프로필 편집**을 할 수 있습니다.
  
![mypage2-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/568576ab-7391-437b-ae3b-045f4d073ff4)
---

## 📁 폴더 구조

```bash
├───public
│   ├───animations
│   ├───icons
│   └───images
└───src
    ├───app
    │   ├───api
    │   │   ├───cookie
    │   │   ├───login
    │   │   ├───logout
    │   │   ├───openai
    │   │   │   ├───extract-movie
    │   │   │   ├───extract-music
    │   │   │   └───extract-place
    │   │   ├───spotify-token
    │   │   └───youtube-search
    │   ├───compare
    │   ├───homepage
    │   │   └───[id]
    │   ├───landingpage
    │   ├───mypage
    │   ├───product
    │   │   └───[id]
    │   ├───providers
    │   ├───signin
    │   ├───signup
    │   │   └───[provider]
    │   ├───test
    │   │   └───input
    │   └───users
    │       └───[id]
    ├───components
    │   ├───input
    │   └───shared
    ├───features
    │   ├───compare
    │   │   ├───api
    │   │   ├───components
    │   │   ├───hooks
    │   │   └───types
    │   ├───header
    │   │   └───hooks
    │   ├───home
    │   │   ├───components
    │   │   ├───modals
    │   │   │   └───store
    │   │   ├───services
    │   │   └───types
    │   ├───landing
    │   │   └───components
    │   ├───productId
    │   │   ├───components
    │   │   │   ├───modal
    │   │   │   │   ├───ProductCompareModal
    │   │   │   │   └───ProductReviewModal
    │   │   │   ├───ProductApi
    │   │   │   ├───ProductIdDetail
    │   │   │   ├───ProductIdStats
    │   │   │   └───ProductReviews
    │   │   ├───hooks
    │   │   └───libs
    │   ├───Profile
    │   │   ├───api
    │   │   ├───components
    │   │   ├───hook
    │   │   └───types
    │   ├───signin
    │   │   └───components
    │   └───signup
    │       └───components
    ├───lib
    │   ├───axios
    │   └───utils
    └───types
```

## 🛠️ 설치 및 실행 방법
```bash
git clone https://github.com/part4-team6/Pickly.git
cd pickly
npm install
npm run dev
```

## 커밋 컨벤션 & 브랜치 전략
### 🗂️ 폴더/파일명 네이밍 컨벤션

| **대상** | **규칙** | **예시** |
| --- | --- | --- |
| 폴더명 | 케밥케이스 (kebab-case) | components, user-profile |
| 컴포넌트 파일명 | 파스칼케이스 (PascalCase) | UserProfile.jsx |
| 스타일 파일명 | 케밥케이스 + .styles.js | user-profile.styles.js |
| 이미지/아이콘 파일명 | 케밥케이스 | logo-icon.png, profile-default.png |
| 함수명/변수명 | 카멜케이스 (camelCase) | fetchUserData, userList |
| 환경변수 | 대문자+스네이크케이스 | REACT_APP_API_URL |

### 🌴 브랜치 네이밍 컨벤션

| 역할 | 네이밍 | 예시 |
| --- | --- | --- |
| 메인 브랜치(배포용) | main | main/ |
| 기능 개발 브랜치 | feature/기능명 | feature/이름/dashboard-modal |
| 긴급 수정 브랜치 | hotfix/이슈명 | hotfix/이름/login-error |
| 릴리즈 준비 브랜치 | release/버전명 | release/이름/v1.0.0 |
| 스타일 수정 브랜치 | style/스타일이름 | style/이름/login-mobile |


## 🗓️ 프로젝트 기간
**2025.05.26 ~ 2025.06.24 (약 한 달, 일요일 제외)**

## 🧑‍🤝‍🧑 팀 소개 및 역할 분담

| 멤버 | 역할 및 기여 |
|------|--------------|
| <img src="https://avatars.githubusercontent.com/u/192767726?v=4" width="100"><br><a href="https://github.com/ramong26">@김수연</a> | **상세 페이지 / 외부 API 연동**<br>- 상세 페이지 구성 및 데이터 표시<br>- Spotify, YouTube, Google Maps, OpenAI 등 외부 API 통합<br>- MongoDB 연결 및 상태 관리 (Zustand)<br>- 비교 상품 등록 기능 구현 |
| <img src="https://avatars.githubusercontent.com/u/193223460?v=4" width="100"><br><a href="https://github.com/prkhaeun">@박하은</a> | **비교하기 페이지 개발**<br>- A/B 테스트 기반 UI/UX 설계 및 기능 구현<br>- Zustand와 연동된 비교 상품 기능 통합 |
| <img src="https://avatars.githubusercontent.com/u/159625710?v=4" width="100"><br><a href="https://github.com/sssson0">@손혁진</a> | **마이페이지 / 유저페이지**<br>- 유저 개인정보 및 활동 내역 페이지 구현<br>- 팔로우/팔로잉 기능 및 관련 모달 개발 |
| <img src="https://avatars.githubusercontent.com/u/126854066?v=4" width="100"><br><a href="https://github.com/songmijin824">@송미진</a> | **회원 인증 / 에러 핸들링**<br>- 로그인 및 회원가입 기능 (유효성 검사 포함)<br>- 전체 서비스의 에러 페이지 구성 |
| <img src="https://avatars.githubusercontent.com/u/169635665?v=4" width="100"><br><a href="https://github.com/seungwonHong">@홍승원</a> | **홈페이지 / 인프라 / 공통 컴포넌트**<br>- 랜딩 및 메인 페이지 UI 개발<br>- 백엔드 API (Next.js API Routes) 구현<br>- 공통 컴포넌트 (헤더 등) 및 로딩 처리<br>- SEO 최적화 및 프로젝트 환경 설정 |

---

## ⚔️ 차별점
- 카테고리별로 상품을 **비교(A/B 테스트)하고, 리뷰 기반 랭킹 시스템**을 제공합니다.
- **OpenAI를 활용해 유튜브·스포티파이·지도 콘텐츠를 자동 연동**하여 정보 탐색 비용을 절감했습니다. 유튜브 API는 MongoDB 캐싱을 통해 할당량을 효율적으로 관리하며 안정성을 확보했습니다.
- 로그인 기능은 Next.js API Routes 기반의 자체 백엔드로 구현하였고, **HTTP-only 쿠키에 토큰을 저장**하는 한편, **CSRF 토큰을 도입해 교차 사이트 요청 위조 공격에 대한 보안성**을 추가로 강화했습니다.
- **로그인 없이도 비교 기능 사용이 가능**하여 진입 장벽을 낮췄고, 필수 기능에 빠르게 접근할 수 있도록 설계했습니다.
