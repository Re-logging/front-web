export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`/api/auth/reissue`, {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
    })

    if (!response.ok) {
      throw new Error('토큰 갱신 실패1')
    }

    return response.json()
  } catch (error) {
    console.error('토큰 갱신 오류2:')
    throw error
  }
}
