import { refreshAccessToken } from '@/hooks/useRefreshToken'
import { cookies } from 'next/headers'

async function refreshToken() {
  try {
    // 리프레시 토큰 가져오기
    const refreshToken = cookies().get('refreshToken')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reissue`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken?.value}`, // 리프레시 토큰 전달
        },
      },
    )

    if (!response.ok) {
      throw new Error('토큰 갱신 실패')
    }

    const data = await response.json()

    // 새 액세스 토큰 저장
    cookies().set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return data.accessToken
  } catch (error) {
    console.error('Token refresh error:', error)
    throw error
  }
}

export async function PUT(request: Request) {
  const token = cookies().get('accessToken')
  const data = await request.json()
  console.log('계정 수정 토큰 token:', token)

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/account`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(data),
      },
    )

    console.log('받아온 상태는 response.status:', response.status)
    // 액세스 토큰 만료
    if (response.status === 400) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/account`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify(data),
          },
        )
        console.log('토큰 갱신 후 재요청1:', response)
        if (!response.ok) {
          console.log('토큰 갱신 후 재요청2', response)

          const url = request.url
          return Response.redirect(new URL('/?auth=login', url))
        }
      } catch (error) {
        console.log('토큰 갱신 후 재요청3', error)
        return Response.redirect(new URL('/?auth=login', request.url))
      }
    }
    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const token = cookies().get('accessToken')
  console.log('계정 삭제 토큰 token:', token)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/withdrawal`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    )

    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('계정 삭제 에러:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}
