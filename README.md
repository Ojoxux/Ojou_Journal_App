# Ojoxuxの日記アプリ

日々の出来事などを個人的に記録するためのシンプルな日記アプリケーションです。

## 機能

- 📝 日記の作成・編集・削除
- 📅 日付ごとの整理
- 🔒 セキュアなログイン認証
- 🌓 ダークモードUI
- 📱 レスポンシブデザイン

## 技術スタック

- React (^18.3.1)
- TypeScript (^5.5.3)
- Firebase (Authentication, Firestore)
- Chakra UI (^2.8.2)
- Vite (^5.4.1)

## セットアップ

1. リポジトリのクローン:

   ```bash
   git clone https://github.com/yourusername/ojou-journal.git
   cd ojou-journal
   ```

2. 依存関係のインストール:

   ```bash
   npm install
   ```

3. 環境変数の設定:
   `.env`ファイルを作成し、以下の Firebase 設定を追加:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. 開発サーバーの起動:
   ```bash
   npm run dev
   ```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルドの作成
- `npm run lint` - ESLintによるコード検証
- `npm run preview` - ビルドのプレビュー
