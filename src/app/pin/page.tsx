import { verifyPinCode } from '../actions/auth'

export default async function PinPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  const email = params.email

  if (!email) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h1>エラー</h1>
        <p>メールアドレスが指定されていません。</p>
        <a href="/login">ログインページに戻る</a>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>ログイン（PINコード入力）</h1>
      
      <p style={{ marginBottom: '16px', color: '#666' }}>
        {email} にPINコードを送信しました。
      </p>
      
      <form action={verifyPinCode}>
        <input type="hidden" name="email" value={email} />
        
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="pin" style={{ display: 'block', marginBottom: '8px' }}>
            PINコード:
          </label>
          <input
            type="text"
            id="pin"
            name="pin"
            required
            maxLength={6}
            pattern="[0-9]{6}"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '18px',
              textAlign: 'center',
              letterSpacing: '2px'
            }}
            placeholder="123456"
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007cba',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ログイン
        </button>
      </form>
      
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <a href="/login" style={{ color: '#007cba', textDecoration: 'none' }}>
          ← メールアドレス入力に戻る
        </a>
      </div>
    </div>
  )
}