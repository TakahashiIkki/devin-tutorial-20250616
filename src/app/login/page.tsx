import { sendPinCode } from '../actions/auth'

export default function LoginPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>ログイン（メールアドレス入力）</h1>
      
      <form action={sendPinCode}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>
            Mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
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
          PINコード送信
        </button>
      </form>
    </div>
  )
}
