// ============================================
// ONEPERCENT - Portfolio Data
// ============================================
// 이 파일만 수정하면 포트폴리오가 자동으로 업데이트됩니다.

const portfolioItems = [
    {
        id: 1,
        title: "캣츠앤수프 UA 캠페인",
        client: "네오위즈",
        category: "게임 광고",
        thumbnail: "", // 이미지 경로 (비어있으면 플레이스홀더)
        videoUrl: "https://www.youtube.com/embed/example1", // YouTube 임베드 URL
        results: [
            "CPI 42% 절감",
            "CTR 3.2배 증가",
            "재계약 진행 중"
        ]
    },
    {
        id: 2,
        title: "힐링 게임 리포지셔닝",
        client: "게임사 A",
        category: "브랜드 전략",
        thumbnail: "",
        videoUrl: "https://www.youtube.com/embed/example2",
        results: [
            "신규 유저 300% 증가",
            "평균 플레이 타임 2배",
            "앱스토어 피처드"
        ]
    },
    {
        id: 3,
        title: "AI 생성 소재 프로젝트",
        client: "글로벌 퍼블리셔",
        category: "AI 크리에이티브",
        thumbnail: "",
        videoUrl: "https://www.youtube.com/embed/example3",
        results: [
            "48시간 내 100개 소재",
            "제작비 70% 절감",
            "Best 소재 CTR 5.8%"
        ]
    },
    {
        id: 4,
        title: "브랜드 필름 제작",
        client: "문화 기업",
        category: "브랜드 콘텐츠",
        thumbnail: "",
        videoUrl: "https://www.youtube.com/embed/example4",
        results: [
            "브랜드 인지도 45% 상승",
            "SNS 공유 10K+",
            "미디어 아트 어워드 수상"
        ]
    }
];

// ============================================
// 업데이트 방법:
// ============================================
// 1. 위 배열에 새 객체를 추가하거나 기존 객체를 수정하세요
// 2. 파일을 저장하고 웹사이트를 새로고침하면 자동 반영됩니다
//
// 필드 설명:
// - id: 고유 번호 (순서대로 1, 2, 3...)
// - title: 프로젝트 제목
// - client: 클라이언트 이름
// - category: 카테고리 (게임 광고, 브랜드 전략, AI 크리에이티브 등)
// - thumbnail: 썸네일 이미지 경로 (비어있으면 플레이스홀더 표시)
// - videoUrl: YouTube 영상 임베드 URL (선택사항)
// - results: 성과 배열 (최대 3-4개 권장)
