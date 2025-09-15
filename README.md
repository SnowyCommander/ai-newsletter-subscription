# AI Newsletter Subscription System

AI 최전선의 진짜 트렌드를 5분 핵심 요약으로 전달하는 뉴스레터 구독 시스템입니다.

## 🚀 프로젝트 개요

- **목적**: AI 뉴스레터 구독을 위한 풀스택 애플리케이션
- **아키텍처**: 프론트엔드/백엔드 분리형
- **배포**:
  - Frontend: CloudFlare Pages
  - Backend: CloudFlare Workers
  - Database: CloudFlare D1

## 📁 프로젝트 구조

```
├── frontend/          # React + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/    # shadcn/ui 컴포넌트
│   │   ├── App.tsx    # 메인 애플리케이션
│   │   └── main.tsx
│   └── package.json
├── backend/           # CloudFlare Workers + TypeScript
│   ├── src/
│   │   └── index.ts   # API 엔드포인트
│   ├── schema.sql     # 데이터베이스 스키마
│   └── wrangler.jsonc # CloudFlare Workers 설정
└── README.md
```

## 🛠️ 기술 스택

### Frontend
- **React 18.3.1** - UI 라이브러리
- **TypeScript 5.3.3** - 타입 안전성
- **Tailwind CSS 3.4.1** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Lucide React** - 아이콘
- **Vite** - 빌드 도구

### Backend
- **CloudFlare Workers** - 서버리스 백엔드
- **TypeScript** - 타입 안전성
- **CloudFlare D1** - SQLite 데이터베이스
- **Wrangler** - 배포 도구

## 🚀 배포 방법

### 1. CloudFlare D1 데이터베이스 생성
```bash
cd backend
npx wrangler d1 create newsletter-subscriptions
```

### 2. 데이터베이스 스키마 적용
```bash
npx wrangler d1 execute newsletter-subscriptions --file=./schema.sql
```

### 3. wrangler.jsonc 업데이트
생성된 데이터베이스 ID로 `database_id` 필드를 업데이트하세요.

### 4. 백엔드 배포
```bash
cd backend
npx wrangler deploy
```

### 5. 프론트엔드 빌드 및 배포
```bash
cd frontend
npm install
npm run build
```

CloudFlare Pages에서 GitHub 저장소를 연결하고 배포하세요.

## 📋 API 엔드포인트

### POST /subscribe
뉴스레터 구독

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "구독이 완료되었습니다. 곧 첫 번째 뉴스레터를 받아보실 수 있습니다!"
}
```

### GET /subscribers
구독자 목록 조회 (관리자용)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "created_at": "2025-01-15T20:30:00Z",
      "status": "active"
    }
  ],
  "count": 1
}
```

## 🎨 주요 기능

### 프론트엔드
- **반응형 디자인** - 모바일/데스크톱 최적화
- **애니메이션** - 부드러운 사용자 경험
- **실시간 피드백** - 구독 상태 알림
- **모던 UI** - 그라디언트와 글래스모피즘 디자인

### 백엔드
- **이메일 유효성 검증** - 정규식 기반 검증
- **중복 구독 방지** - 데이터베이스 레벨 제약
- **CORS 지원** - 크로스 도메인 요청 처리
- **에러 핸들링** - 상세한 오류 메시지

## 🔧 개발 환경 설정

### 프론트엔드
```bash
cd frontend
npm install
npm run dev
```

### 백엔드
```bash
cd backend
npm install
npm run dev
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request