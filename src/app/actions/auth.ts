import { redirect } from 'next/navigation'
import nodemailer from 'nodemailer'

// 一時的にPINコードを保存（本来はRedisやDBを使用）
const pinStore = new Map<string, { pin: string; timestamp: number }>()

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
    
    console.log(`PIN sent to ${email}: ${pin}`)
    
  } catch (error) {
    console.error('メール送信エラー:', error)
    throw new Error('メール送信に失敗しました')
  }
  
  // PINコード入力ページへリダイレクト
  redirect(`/pin?email=${encodeURIComponent(email)}`)
}
