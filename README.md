# 프로젝트 개요 🚀

**이 레포는 과제를 위해 작성된 초기 셋업용 레포입니다.**
주요 목적은 빠른 시작용 스캐폴딩과 일관된 개발 환경(린트/포맷, React Strict Mode, Path Aliases)을 제공하는 것입니다.

---

## 🔧 주요 기능

- **스캐폴딩**: Vite + React(Typescript) 기본 템플릿
- **린트/포맷**: ESLint(Flat config) + Prettier 통합 (`eslint.config.js`, `prettier` 플러그인 포함)
- **React Strict Mode**: 초기 템플릿에 `React.StrictMode` 사용
- **Path Aliases**: `tsconfig.*`에서 경로 별칭 설정 (예: `@/components`)

---

## 🚀 빠른 시작

1. 설치

```bash
npm install
```

2. 개발 서버

```bash
npm run dev
```

3. 빌드

```bash
npm run build
```

4. 린트(자동수정)

```bash
npm run lint -- --fix
```

5. 포맷

```bash
npm run format
```

---

## 🧭 구성 위치(참고)

- ESLint 설정: `eslint.config.js` (flat-config, 플러그인 scoping 적용)
- TypeScript 설정 / path aliases: `tsconfig.json` / `tsconfig.app.json`
- 포맷터: `prettier` (프로젝트 루트 의존성)

---

## ⚠️ 유지보수 노트 (중요)

- 일부 플러그인은 `configs.flat.recommended` 대신 레거시 형태를 노출할 수 있어 안전하게 병합하도록 구성되어 있습니다.
- 구성 변경 시 **flat config 마이그레이션 가이드**를 확인하세요:
  https://eslint.org/docs/latest/use/configure/migration-guide#importing-plugins-and-custom-parsers
