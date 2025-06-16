'use server'

import { redirect } from 'next/navigation'
import nodemailer from 'nodemailer'

// 一時的にPINコードを保存（本来はRedisやDBを使用）
// 開発環境でのホットリロード対策でglobalオブジェクトを使用
const globalForPinStore = globalThis as unknown as {
  pinStore: Map<string, { pin: string; timestamp: number }> | undefined
}

const pinStore = globalForPinStore.pinStore ?? new Map<string, { pin: string; timestamp: number }>()
globalForPinStore.pinStore = pinStore

// SMTPトランスポーター設定（Mailpit用）
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
})

export async function sendPinCode(formData: FormData) {
  const email = formData.get('email') as string
  
  if (!email) {
    throw new Error('メールアドレスが入力されていません')
  }
  
  // 6桁のPINコード生成
  const pin = Math.floor(100000 + Math.random() * 900000).toString()
  
  // PINコードを一時保存（5分間有効）
  pinStore.set(email, {
    pin,
    timestamp: Date.now() + 5 * 60 * 1000
  })
  
  try {
    // メール送信
    await transporter.sendMail({
      from: 'noreply@example.com',
      to: email,
      subject: 'ログイン用PINコード',
      html: `
        <h2>ログイン用PINコード</h2>
        <p>以下のPINコードを入力してログインしてください：</p>
        <h3 style="color: #007cba; font-size: 24px;">${pin}</h3>
        <p>このPINコードは5分間有効です。</p>
      `
    })
    
  } catch (error) {
    console.error('メール送信エラー:', error)
    throw new Error('メール送信に失敗しました')
  }
  
  // PINコード入力ページへリダイレクト
  redirect(`/pin?email=${encodeURIComponent(email)}`)
}

export async function verifyPinCode(formData: FormData) {
  const email = formData.get('email') as string
  const pin = formData.get('pin') as string
  
  if (!email || !pin) {
    throw new Error('メールアドレスまたはPINコードが入力されていません')
  }
  
  // 保存されたPINコードを確認
  const storedData = pinStore.get(email)
  
  if (!storedData) {
    throw new Error('PINコードが見つかりません。再度メールアドレスを入力してください。')
  }
  
  // 有効期限チェック
  if (Date.now() > storedData.timestamp) {
    pinStore.delete(email)
    throw new Error('PINコードの有効期限が切れています。再度メールアドレスを入力してください。')
  }
  
  // PINコード照合
  if (storedData.pin !== pin) {
    throw new Error('PINコードが間違っています。')
  }
  
  // 検証成功 - PINコードを削除
  pinStore.delete(email)
  
  // セッション作成
  const { getSession } = await import('../../lib/session')
  const session = await getSession()
  
  session.email = email
  session.isLoggedIn = true
  await session.save()
    
  // ダッシュボードへリダイレクト
  redirect('/dashboard')
}

export async function logout() {
  const { getSession } = await import('../../lib/session')
  const session = await getSession()
  
  // セッションをクリア
  session.email = undefined
  session.isLoggedIn = false
  await session.save()
    
  // ログインページへリダイレクト
  redirect('/login')
}
