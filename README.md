## 👀Pickly

![image](https://github.com/user-attachments/assets/0bf3d322-9308-4e82-9e29-ced002f0444c)

# "Pickly"는 다양한 분야의 상품을 A/B 테스트 방식으로 비교하고, 리뷰와 별점을 기반으로 최적의 선택을 도와주는 상품 큐레이션 플랫폼입니다.

## 배포 주소
https://pickly-gamma.vercel.app/

## 🛠 기술 스택
### Frontend
- React
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- TanStack Query (React Query)
- Zustand

### Backend
- Next.js API Routes (서버리스 백엔드)
- MongoDB (NoSQL DB) (유튜브, 스포티파이, openAi등 검색 결과 저장)
- Cookie-based Auth (로그인 시 쿠키에 토큰 저장)

### External APIs
- Spotify API (음악 상품 해당 앨범으로 연동)
- YouTube API (뮤직비디오 및 콘텐츠 제공)
- Google Maps API (위치 기반 정보 연동)
- OpenAI API (상품명과 상품 설명을 분석해 해당 상품 YouTube/Spotify/Google Maps 등 외부 링크 자동 생성)

## 서비스 둘러보기
# 홈페이지
- 서비스 소개, 로그인/회원가입 버튼, 인기 상품 미리보기 등의 기능이 구현된 첫 진입 페이지입니다.

# 로그인 / 회원가입 페이지
- 유효성 검사와 **Zustand**를 활용해 로그인 시 사용자 정보를 클라이언트에서 상태로 관리합니다.
- 로그인 시 **Next.js API Routes 기반 자체 백엔드에서 인증**을 처리하며, 토큰은 HTTP-only 쿠키에 저장해 보안성을 높였습니다.
https://github.com/user-attachments/assets/b0ad7843-5f3c-45f6-a3dc-4e3bdb5d54d1

# 메인페이지
- 사용자는 상품을 검색하거나, 카테고리별로 정렬된 상품 목록을 확인할 수 있습니다.
- 카테고리에 상품이 많을 경우, 무한 스크롤 기능을 통해 계속해서 상품을 로드합니다.
https://github.com/user-attachments/assets/82e65a8e-2630-4dd9-acee-be95c1fa7a19

- 또한 **상품 추가 기능**을 이용해 원하는 카테고리에 상품을 넣을 수 있습니다.
https://github.com/user-attachments/assets/94dc0b5f-bd62-464c-903c-b45be65c2873

# 상품 상세 페이지
- 사용자는 상품을 찜하거나, 리뷰 작성 및 좋아요, 상품 비교하기 기능을 이용할 수 있습니다.
- 해당 상품의 **등록자(유저)** 인 경우, **상품 편집과 상품 삭제 기능**이 추가로 제공됩니다.
https://github.com/user-attachments/assets/0200de9a-2311-497c-8e46-8ca6ad687411

- 또한 리뷰를 작성과 수정, 삭제가 가능합니다.
https://github.com/user-attachments/assets/252a6d6a-7ac5-4702-bd84-18de424a8678

# 비교하기 페이지
- 해당 페이지는 같은 카테고리의 상품들을 대상으로 **리뷰 개수, 별점, 찜 수를 기준으로 승패**를 가립니다.
- 비교하기 기능은 **로그인 없이, 게스트 모드**로도 자유롭게 이용하실 수 있습니다.
https://github.com/user-attachments/assets/036

## 폴더 구조 
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


## 설치 및 실행 방법
git clone https://github.com/part4-team6/Pickly.git
cd pickly
npm install
npm run dev

## 커밋 컨벤션 & 브랜치 전략
### 폴더/파일명 네이밍 컨벤션

| **대상** | **규칙** | **예시** |
| --- | --- | --- |
| 폴더명 | 케밥케이스 (kebab-case) | components, user-profile |
| 컴포넌트 파일명 | 파스칼케이스 (PascalCase) | UserProfile.jsx |
| 스타일 파일명 | 케밥케이스 + .styles.js | user-profile.styles.js |
| 이미지/아이콘 파일명 | 케밥케이스 | logo-icon.png, profile-default.png |
| 함수명/변수명 | 카멜케이스 (camelCase) | fetchUserData, userList |
| 환경변수 | 대문자+스네이크케이스 | REACT_APP_API_URL |

### 브랜치 네이밍 컨벤션

| 역할 | 네이밍 | 예시 |
| --- | --- | --- |
| 메인 브랜치(배포용) | main | main/ |
| 기능 개발 브랜치 | feature/기능명 | feature/이름/dashboard-modal |
| 긴급 수정 브랜치 | hotfix/이슈명 | hotfix/이름/login-error |
| 릴리즈 준비 브랜치 | release/버전명 | release/이름/v1.0.0 |
| 스타일 수정 브랜치 | style/스타일이름 | style/이름/login-mobile |


##  프로젝트 기간
**2025.05.26 ~ 2025.06.24 (약 한 달, 일요일 제외)**

