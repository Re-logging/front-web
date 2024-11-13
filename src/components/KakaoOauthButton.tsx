import OauthButton from './OauthButton'

function KakaoOauthButton() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}&response_type=code`

  return <OauthButton oauthType="kakao" authUrl={kakaoAuthUrl} />
}

export default KakaoOauthButton
