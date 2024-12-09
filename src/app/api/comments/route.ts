import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const token = cookies().get('accessToken')
  const { content } = await request.json() // content를 명시적으로 추출
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')
  const commentId = searchParams.get('commentId')

  try {
    console.log('token', token?.value)
    const response = await fetch(
      `https://test.re-logging.com/api/ploggingEvents/${eventId}/comments${commentId ? `/${commentId}/replies` : ''}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ content }),
      },
    )

    // ... 나머지 토큰 갱신 로직은 동일

    const responseData = await response.json()

    console.log('responseData', responseData)
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const token = cookies().get('accessToken')
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')
  const commentId = searchParams.get('commentId')

  try {
    const response = await fetch(
      `https://test.re-logging.com/api/ploggingEvents/${eventId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('댓글 삭제에 실패했습니다.')
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Request failed' }), {
      status: 500,
    })
  }
}

export async function PUT(request: Request) {
  const token = cookies().get('accessToken')
  const { content } = await request.json()
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')
  const commentId = searchParams.get('commentId')

  try {
    const response = await fetch(
      `https://test.re-logging.com/api/ploggingEvents/${eventId}/comments/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ content }),
      },
    )

    if (!response.ok) {
      throw new Error('댓글 수정에 실패했습니다.')
    }

    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}
