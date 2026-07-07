# PLAN — Astro 移行（静的優先＋島 構造への建て直し）

## 背景と目的

siqi.jp は現在 React SPA（Vite + React + wouter）。サーバーが返す HTML は空の器（`<div id="root">`）で、本文・OGP は全てブラウザの JS が後から描く。このため：

- SNS ボット（X/Discord 等のプレビュー取得）に OGP が見えない
- AI クローラー・curl 等 JS を実行しない取得者に本文が空
- 検索インデックスが不安定（Googlebot は描画するが遅延・非保証）

コンテンツサイトの現行ベストプラクティス＝**静的優先＋アイランド構造（Astro）**に土台を建て直し、これらを構造ごと解消する。

## 確定済みの設計判断

| 論点 | 決定 | 理由 |
|------|------|------|
| フレームワーク | Astro v5（@astrojs/react 併用） | コンテンツサイト向け現行標準。既定で JS ゼロ配信、動く所だけ島 |
| デザイン | **現デザインを忠実移植**（刷新は移行後の別トラック） | 新旧比較で検収可能にする。「戻せる」を最優先 |
| 言語 | パス分け `/en/…` `/ja/…` ＋ ルート `/` は **Accept-Language で自動振り分け**（302） | 両言語を検索・AI に可視化。振り分けは Cloudflare Pages Functions（エッジ関数）1 本で実装 |
| ホスティング | Cloudflare Pages のまま（無料・Git 連携維持） | ビルド出力を現行と同じ `dist/public` に合わせ、CF 側の設定変更を不要にする |
| ブログ（note RSS） | 現状同等＝ブラウザ側で取得する島として移植 | 挙動不変を優先。ビルド時取得＋定期再ビルド化は移行後の改善候補 |
| 旧 URL | `/spectra` 等 → `301 /en/spectra` | 旧デフォルト言語が en のため意味を保存 |

## 目標アーキテクチャ

```
src/
  content/ or data/   … 文言（en/ja）・プロジェクト情報などの正本
  layouts/            … 共通レイアウト（head/OGP/hreflang 生成を含む）
  pages/
    en/{index,avatarui,spectra,roblox,novels}.astro
    ja/{index,avatarui,spectra,roblox,novels}.astro
    404.astro
  components/         … 静的部品（.astro）＋ 島（.tsx: RSS・3D・演出）
functions/
  index.ts            … ルート / の言語振り分け（302）のみ
```

- OGP・title・description・canonical・hreflang は**ページ別にビルド時焼き込み**
- sitemap.xml は全ルート（en/ja）を自動生成、robots.txt・Google 検証ファイル維持
- 島（client:～ で必要時のみ JS 起動）: RSS フィード、阿頼耶識 3D モデル（three.js）、タイプライター/グリッチ演出、言語切替（＝相対リンク）
- Tailwind v4 + 既存 index.css のトークン・ユーティリティは原則そのまま移植

## フェーズと完了条件

### Phase 1 — 足場と共通層
- Astro scaffold、`pnpm build` で `dist/public` に静的出力
- fonts / index.css / Header / footer / SEO head 部品の移植
- 完了条件: ビルド成功、トップ 1 ページが現デザインで表示される

### Phase 2 — i18n 構造
- LanguageContext の全文言を en/ja 辞書データへ抽出（正本化）
- `/en/` `/ja/` 全ルート生成、hreflang 相互リンク、ルート振り分け Function、旧 URL 301
- 完了条件: curl で `/en/` `/ja/` の本文・OGP が取得できる

### Phase 3 — 全ページ移植
- Home / AvatarUI / Spectra / Roblox / Novels / 404 を現デザインのまま移植
- 動く部品（RSS・3D・演出）を島として移植
- 完了条件: 全ページ×2 言語が現行サイトと同内容・同見た目

### Phase 4 — 検証
- `astro check`（型）/ ビルド / curl 検査（全ページの本文・og: タグ存在）
- Lighthouse 比較（現行比で劣化なし、初回表示は改善見込み）
- Codex レビュー → 指摘修正
- 完了条件: 上記全通過 ＋ ユーザーがプレビュー URL で実機検収

### Phase 5 — 切替（ユーザー検収後のみ）
- dev → main マージ（単一マージコミット）＝本番反映
- 親リポジトリ（siqi）の submodule ポインタ更新

## 戻し手順（ロールバック）

- **切替前**: main は無傷。dev を捨てるだけで現状維持
- **切替後**: `git revert -m 1 <マージコミット>` を main に積んで push（1 コマンドで旧 SPA に完全復帰）
- 旧実装（React SPA）はリポジトリ履歴に完全保存。移行完了から 1 か月は削除もリネームもしない

## 既知のリスクと対処

- **CF プレビューデプロイ設定**: dev ブランチのプレビューが無効の場合、ダッシュボードで有効化が必要（ユーザー作業）。代替はローカル `pnpm preview` 検収
- **視覚差分**: 演出（タイプライター等）の再実装でタイミング微差が出うる → Phase 4 でユーザー目視確認
- **言語自動振り分けの SEO**: `/` は 302、x-default は `/en/` を指定。検索対象は `/en/` `/ja/` 本体
- **analytics（umami）**: 環境変数 `VITE_ANALYTICS_*` を Astro の env に移植。CF 側の変数はそのまま使えるが名称変更時は CF ダッシュボード更新が必要（ユーザー作業）

## 移行後の改善候補（本計画のスコープ外）

- ブログのビルド時取得＋定期再ビルド（デプロイフック）
- 緑デザイン刷新（TERMINAL / MATRIX / BLUEPRINT 系）を新土台上で実装
- 小説本文のサイト内掲載（content collection 追加）
- Spectra ライブデータの島
