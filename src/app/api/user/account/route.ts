import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  const token = cookies().get('accessToken')
  const data = await request.json()

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

    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const token = cookies().get('accessToken')
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
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}
