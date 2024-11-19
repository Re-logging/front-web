import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  const token = cookies().get('accessToken')
  const formData = await request.formData()

  if (!formData.get('image')) {
    formData.append('image', 'null')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: formData,
      },
    )
    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}
