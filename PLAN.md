# PLAN — Astro 移行（静的優先＋島 構造への建て直し）

## 背景と目的

siqi.jp は現在 React SPA（Vite + React + wouter）。サーバーが返す HTML は空の器（`<div id="root">`）で、本文・OGP は全てブラウザの JS が後から描く。このため：

- SNS ボット（X/Discord 等のプレビュー取得）に OGP が見えない
- AI クローラー・curl 等 JS を実行しない取得者に本文が空
- 検索インデックスが不安定（Googlebot は描画するが遅延・非保証）

コンテンツサイトの現行ベストプラクティス＝**静的優先＋アイランド構造（Astro）**に土台を建て直し、これらを構造ごと解消する。

## 対象ページの正本（公開5ページ＋404）

| ページ | 旧ルート | 新ルート |
|--------|---------|---------|
| Home | `/` | `/en` `/ja` |
| Avatar UI | `/avatarui` | `/en/avatarui` `/ja/avatarui` |
| Spectra | `/spectra` | `/en/spectra` `/ja/spectra` |
| Roblox | `/roblox` | `/en/roblox` `/ja/roblox` |
| Novels | `/novels` | `/en/novels` `/ja/novels` |
| 404 | `/404`・全不一致 | `404.html`（言語共通） |

URL は trailing slash なしに統一（`build.format: 'file'`）。

## 確定済みの設計判断

| 論点 | 決定 | 理由 |
|------|------|------|
| フレームワーク | Astro v5（@astrojs/react 併用） | コンテンツサイト向け現行標準。既定で JS ゼロ配信、動く所だけ島 |
| デザイン | **現デザインを忠実移植**（刷新は移行後の別トラック） | 新旧比較で検収可能にする。「戻せる」を最優先 |
| 言語 | パス分け `/en` `/ja` ＋ ルート `/` は **Accept-Language で 302 自動振り分け** | 両言語を検索・AI に可視化。振り分けは Cloudflare Pages Functions（エッジ関数）1 本 |
| ルート 302 のヘッダ | `Location` ＋ `Vary: Accept-Language` ＋ `Cache-Control: no-store` | 中間キャッシュによる別言語固定を防ぐ（Codex 指摘） |
| ホスティング | Cloudflare Pages のまま（無料・Git 連携維持） | ビルド出力を現行と同じ `dist/public` に合わせ、CF 側の設定変更を不要にする |
| ビルドスクリプト | `build` を `astro build` に置換。旧 `esbuild server/index.ts` は削除 | 不要な server bundle を残さない（Codex 指摘） |
| ブログ（note RSS） | 現状同等＝ブラウザ側で取得する島として移植 | 挙動不変を優先。ビルド時取得＋定期再ビルド化は移行後の改善候補 |
| 島のディレクティブ | RSS＝`client:visible`／3D 阿頼耶識＝`client:visible`（ブラウザ依存部は `client:only="react"`）／装飾演出は Astro/CSS 優先で JS 化しない | 必要時のみ JS 起動（Codex 指摘） |
| React Context | 静的ページから除去。文言は en/ja 辞書データ＋ Astro props で描画し、島だけ React | SSG の正道（Codex 指摘） |

## リダイレクト行列（正本）

| 旧 URL | 遷移先 | ステータス | 実装 |
|--------|--------|-----------|------|
| `/` | `/ja`（Accept-Language が ja 優先時）／それ以外 `/en` | 302 | Pages Function |
| `/avatarui` | `/en/avatarui` | 301 | `_redirects` |
| `/spectra` | `/en/spectra` | 301 | `_redirects` |
| `/roblox` | `/en/roblox` | 301 | `_redirects` |
| `/novels` | `/en/novels` | 301 | `_redirects` |
| 旧 SPA fallback `/* → index.html 200` | **廃止**（残存させない） | — | `_redirects` から削除 |

trailing slash あり（`/spectra/` 等）も同じ先へ 301。

## SEO 要件（全公開ページ共通）

- `<html lang>`＝ページ言語、`title`・`meta description` はページ別
- canonical＝自己 URL（slash なし）
- hreflang: `en`・`ja`・`x-default`（x-default は `/en/...`）の 3 本を相互に
- OGP（og:type/url/title/description/image）＋ Twitter Card ＋ JSON-LD（現 SEOMetadata の移植）
- sitemap.xml: `/en/*` `/ja/*` 全件。`/` と旧 URL は載せない
- robots.txt・Google 検証ファイル維持

## 目標アーキテクチャ

```
src/
  i18n/               … en/ja 文言辞書（LanguageContext から抽出＝正本）
  data/               … プロジェクト情報等（projectsData 移植）
  layouts/            … 共通レイアウト（head/OGP/hreflang/analytics 生成）
  pages/
    en/{index,avatarui,spectra,roblox,novels}.astro
    ja/{index,avatarui,spectra,roblox,novels}.astro
    404.astro
  components/         … 静的部品（.astro）＋ 島（.tsx: RSS・3D）
functions/
  index.ts            … ルート / の言語振り分け（302）のみ
```

- analytics（umami）: 既存環境変数名 `VITE_ANALYTICS_*` をビルド時に読み、レイアウトで注入（CF ダッシュボード変更不要）
- Tailwind v4 + 既存 index.css のトークン・ユーティリティは原則そのまま移植

## フェーズと完了条件

### Phase 1 — 足場と共通層＋Home
- Astro scaffold、`pnpm build` で `dist/public` に静的出力（`astro check` 併設）
- fonts / global css / Base レイアウト（SEO head 含む）/ Header / i18n 辞書抽出
- Home（en/ja）移植、ルート振り分け Function、`_redirects` 行列
- 完了条件: ビルド成功、`/en` `/ja` の Home が現デザインで表示、curl で本文・OGP 取得可
- ✅ 完了（2026-07-07・Phase 3 検証で再確認: build/check 通過、`/en` `/ja` 200・本文/OGP 静的取得可）

### Phase 2 — 全ページ移植
- AvatarUI / Spectra / Roblox / Novels / 404 を現デザインのまま移植（×2 言語）
- 島の移植: RSS（client:visible）・阿頼耶識 3D（client:visible / client:only）
- 完了条件: 全ページ×2 言語が現行サイトと同内容・同見た目
- ✅ 完了（2026-07-07・Phase 3 検証で再確認: 全10ページ 200、各ページ固有文言を静的取得）

### Phase 3 — 検証・清掃
- `astro check` / ビルド / curl 検査:
  - 全公開ページで JS 無効でも主要本文が読める
  - 全ページの title / description / canonical / hreflang×3 / og: / twitter: / JSON-LD 存在
  - `curl -I -H "Accept-Language: ja" /` → 302 `/ja` ＋ `Vary: Accept-Language`（CF プレビュー上で確認）
  - `curl -I -H "Accept-Language: en" /` → 302 `/en`
  - 旧 URL 4 本が 301、SPA fallback が 200 を返さない
  - sitemap に言語別 URL 全件・旧 URL なし
- 残存チェック: `console.log/error`・`any`・旧 SPA fallback・不要ファイル
- 旧実装（client/ の SPA コード・server/）の削除（履歴には完全保存）
- Lighthouse 比較（現行比で劣化なし）
- Codex レビュー → 指摘修正
- 完了条件: 上記全通過 ＋ ユーザーがプレビュー URL で実機検収（Functions の 302 含む）
- ✅ 完了（2026-07-07・CC実施分）: 旧実装（client/・server/・vite.config.ts・tsconfig.client.json・components.json・shared/・tsconfig.node.json）削除／依存を55→18に剪定／build・check・astro preview curl 全通過／Home の英語ページが日本語デフォルトSEOに fallback するバグを発見・修正（home.seo.* 追加）。ルート`/`の302とCloudflare `_redirects`の301はastro previewでは検証不可のため未実施（CFプレビュー実機での確認が必要）。Lighthouse比較とCodexレビューは未実施（次のアクション）

### Phase 4 — 切替（ユーザー検収後のみ）
- dev → main マージ（単一マージコミット）＝本番反映
- 親リポジトリ（siqi）の submodule ポインタ更新

## 戻し手順（ロールバック）

- **切替前**: main は無傷。dev を捨てるだけで現状維持
- **切替後**: `git revert -m 1 <マージコミット>` を main に積んで push（1 コマンドで旧 SPA に完全復帰）
- 旧実装（React SPA）はリポジトリ履歴に完全保存。移行完了から 1 か月は履歴の書き換え・強制 push をしない

## 既知のリスクと対処

- **CF プレビューデプロイ設定**: dev ブランチのプレビューが無効の場合、ダッシュボードで有効化が必要（ユーザー作業）。代替はローカル `pnpm preview`＋`wrangler pages dev`（Function 検証）
- **視覚差分**: 演出（タイプライター等）の再実装でタイミング微差が出うる → Phase 3 でユーザー目視確認
- **言語自動振り分けの SEO**: `/` は 302＋`Vary`、x-default は `/en/...`。検索対象は `/en` `/ja` 本体。sitemap に `/` を載せない
- **analytics（umami）**: 環境変数名は現行のまま利用。変更が必要になった場合のみ CF ダッシュボード更新（ユーザー作業）

## 移行後の改善候補（本計画のスコープ外）

- ブログのビルド時取得＋定期再ビルド（デプロイフック）
- 緑デザイン刷新（TERMINAL / MATRIX / BLUEPRINT 系）を新土台上で実装
- 小説本文のサイト内掲載（content collection 追加）
- Spectra ライブデータの島
