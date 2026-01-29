import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

/*
 * 프로젝트용 ESLint flat 구성
 * - 플러그인 설정은 파일 글로브(JS/TS/JSX/TSX)로 범위를 한정하여
 *   JSON/CSS 등 관련 없는 파일에 규칙이 적용되지 않도록 합니다.
 * - 가능한 경우 각 플러그인의 `configs.flat.recommended`를 사용합니다.
 * - 일부 플러그인은 레거시 배열을 노출하므로 아래 헬퍼는 배열 여부를
 *   확인하고 안전한 객체만 병합합니다.
 * - `ignores`는 최소화하되 명시적으로 기록하세요 (예: package-lock.json, tsconfig 파일)
 * - 플러그인 추가/업데이트 시 마이그레이션 가이드를 참고하세요:
 *   https://eslint.org/docs/latest/use/configure/migration-guide#importing-plugins-and-custom-parsers
 */

const reactFlatRecommended =
  pluginReact.configs &&
  pluginReact.configs.flat &&
  pluginReact.configs.flat.recommended;
const reactFlatRecommendedObj = Array.isArray(reactFlatRecommended)
  ? undefined
  : reactFlatRecommended;
const jsxA11yFlatRecommended =
  pluginJsxA11y.configs &&
  pluginJsxA11y.configs.flat &&
  pluginJsxA11y.configs.flat.recommended;
const jsxA11yFlatRecommendedObj = Array.isArray(jsxA11yFlatRecommended)
  ? undefined
  : jsxA11yFlatRecommended;
const reactFlatPluginsObj =
  pluginReact.configs &&
  pluginReact.configs.flat &&
  pluginReact.configs.flat.recommended &&
  pluginReact.configs.flat.recommended.plugins &&
  !Array.isArray(pluginReact.configs.flat.recommended.plugins)
    ? pluginReact.configs.flat.recommended.plugins
    : {};
const jsxA11yFlatPluginsObj =
  pluginJsxA11y.configs &&
  pluginJsxA11y.configs.flat &&
  pluginJsxA11y.configs.flat.recommended &&
  pluginJsxA11y.configs.flat.recommended.plugins &&
  !Array.isArray(pluginJsxA11y.configs.flat.recommended.plugins)
    ? pluginJsxA11y.configs.flat.recommended.plugins
    : {};
const tsRecommended = tseslint.configs && tseslint.configs.recommended;
const tsRecommendedObj = Array.isArray(tsRecommended)
  ? undefined
  : tsRecommended;

export default defineConfig([
  {
    // 최상위 무시 목록: 빌드 출력 및 소스 코드가 아닌 파일을 건너뜁니다
    // - `package-lock.json`과 tsconfig 파일은 주석 또는 메타데이터로 인해 JSON 파싱 오류가 발생할 수 있으므로,
    //   소스 파일만 명시적으로 린트합니다.
    ignores: [
      'dist',
      'package-lock.json',
      'tsconfig.app.json',
      'tsconfig.node.json',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    // TypeScript 파일(.ts/.tsx 등) — typescript-eslint 권장 설정을 적용합니다
    // `tsx`를 포함하여 .tsx 파일의 JSX 관련 규칙도 적용되도록 합니다
    files: ['**/*.{ts,tsx,mts,cts}'],
    ...(tsRecommendedObj || {}),
  },
  {
    // React/JSX 파일 — 플러그인 권장 설정을 병합하고 프로젝트 기본값을 추가합니다
    // - `settings.react.version = 'detect'`로 React 버전을 자동 감지하게 합니다
    // - 사용 가능한 경우 plugin의 `flat.recommended` 객체를 안전하게 병합합니다
    files: ['**/*.{jsx,tsx,js,ts,mjs,cjs}'],

    ...(reactFlatRecommendedObj || {}),
    ...(jsxA11yFlatRecommendedObj || {}),
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      ...reactFlatPluginsObj,
      ...jsxA11yFlatPluginsObj,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      prettier: pluginPrettier,
    },
    rules: {
      ...(pluginReact.configs &&
      pluginReact.configs.flat &&
      pluginReact.configs.flat.recommended &&
      pluginReact.configs.flat.recommended.rules
        ? pluginReact.configs.flat.recommended.rules
        : {}),
      ...(pluginJsxA11y.configs &&
      pluginJsxA11y.configs.flat &&
      pluginJsxA11y.configs.flat.recommended &&
      pluginJsxA11y.configs.flat.recommended.rules
        ? pluginJsxA11y.configs.flat.recommended.rules
        : {}),
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx,js,ts,mjs,cjs}'],
    ...(reactFlatRecommendedObj || {}),
    ...(jsxA11yFlatRecommendedObj || {}),
    plugins: {
      ...reactFlatPluginsObj,
      ...jsxA11yFlatPluginsObj,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      prettier: pluginPrettier,
    },
    rules: {
      ...(pluginReact.configs &&
      pluginReact.configs.flat &&
      pluginReact.configs.flat.recommended &&
      pluginReact.configs.flat.recommended.rules
        ? pluginReact.configs.flat.recommended.rules
        : {}),
      ...(pluginJsxA11y.configs &&
      pluginJsxA11y.configs.flat &&
      pluginJsxA11y.configs.flat.recommended &&
      pluginJsxA11y.configs.flat.recommended.rules
        ? pluginJsxA11y.configs.flat.recommended.rules
        : {}),
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
    },
  },

  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
