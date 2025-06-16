import { redirect } from 'next/navigation'
import { getSession } from '../../lib/session'
import { logout } from '../actions/auth'

export default async function DashboardPage() {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    redirect('/login')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>ログイン済みページ</h1>
      
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        border: '1px solid #007cba', 
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h2>ログイン情報</h2>
        <p><strong>メールアドレス:</strong> {session.email}</p>
        <p><strong>ログイン状態:</strong> ✅ ログイン済み</p>
      </div>
      
      <div style={{ 
        backgroundColor: '#f9f9f9', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h3>🎉 認証成功！</h3>
        <p>PINコード認証によるログインが完了しました。</p>
        <p>セッションによりログイン状態が管理されています。</p>
      </div>
      
      <form action={logout}>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ログアウト
        </button>
      </form>
    </div>
  )
}