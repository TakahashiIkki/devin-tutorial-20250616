# PINコード認証システム with Mailpit

## 概要
Next.js + Mailpit を使用したPINコード認証システムです。
メールアドレス入力 → PINコード送信 → 認証 → ログイン完了の流れを実装しています。

## セットアップ

### 1. 依存関係インストール
```bash
npm install
```

### 2. Mailpit起動
```bash
docker-compose up -d
```

### 3. Next.js開発サーバー起動
```bash
npm run dev
```

## 動作確認手順

### 1. アプリケーションにアクセス
http://localhost:3000 にアクセス

### 2. ログイン（メールアドレス入力）
- 任意のメールアドレスを入力（例: test@example.com）
- 「PINコード送信」ボタンをクリック

### 3. Mailpit でPINコード確認
- http://localhost:8025 にアクセス
- 送信されたメールを確認
- メール内の6桁のPINコードをコピー

### 4. PINコード入力
- 自動で遷移するPINコード入力ページで
- コピーしたPINコードを入力
- 「ログイン」ボタンをクリック

### 5. ログイン済みページ確認
- ダッシュボードページが表示される
- ログイン情報とセッション状態を確認
- 「ログアウト」ボタンで終了

## Devin向け実行手順

このアプリをローカルで実行するには以下のコマンドを順番に実行してください：

### 1. 依存関係インストール
```bash
npm install
```

### 2. Mailpitコンテナ起動（バックグラウンド）
```bash
docker-compose up -d
```

### 3. Next.js開発サーバー起動
```bash
npm run dev
```

### 4. 動作確認
- アプリケーション: http://localhost:3000
- Mailpit Web UI: http://localhost:8025

### 注意事項
- Dockerが起動していることを確認してください
- ポート3000と8025が使用可能であることを確認してください
- メール送信テストにはMailpit Web UIでメールを確認してください

## 開発者向け情報

### 主要URL
- **アプリケーション**: http://localhost:3000
- **Mailpit Web UI**: http://localhost:8025
- **SMTP サーバー**: localhost:1025
