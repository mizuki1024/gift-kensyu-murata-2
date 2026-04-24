name: CI Pipeline

    # ① トリガー：PRを作成・更新した時
    on:
      pull_request:

    jobs:
      test-and-build:
        runs-on: ubuntu-latest

        steps:
          - name: コードをチェックアウト
            uses: actions/checkout@v4

          # ② pnpmのセットアップ（キャッシュのために必要）
          - name: pnpmのセットアップ
            uses: pnpm/action-setup@v3
            with:
              version: 9

          # ③ Node.jsの準備と依存関係キャッシュの設定
          - name: Node.jsのセットアップ
            uses: actions/setup-node@v4
            with:
              node-version: '20'
              cache: 'pnpm'

          # ④ Jobの内容（黄金の順番）
          - name: パッケージのインストール
            run: pnpm install

          - name: 構文チェック (ESLint)
            run: pnpm lint

          - name: 型チェック (TypeScript)
            run: pnpm type-check

          - name: 動作テスト (Vitest)
            run: pnpm test

          - name: ビルド (Build)
            run: pnpm build
    ```
  
  
    ロボットがちゃんと怒ってくれるかテストします。
    VSCodeで適当なファイル（例：`src/App.tsx` など）を開き、わざと使わない変数を定義してみてください。
    ```tsx
    const testVariable = "使わない変数"; // これを追記して保存
    ```
  
  
    変更をコミットして、GitHub上で `main` ブランチに向けて **Pull Requestを作成** します。
    ```bash
    git add .
    git commit -m "CIの設定を追加し、わざとエラーを起こす"
    git push origin day17
    ```