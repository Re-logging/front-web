import OauthButton from './OauthButton'

function GoogleOauthButton() {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}&response_type=code&scope=${encodeURIComponent('email profile')}&access_type=offline&prompt=consent`
  return <OauthButton oauthType="google" authUrl={googleAuthUrl} />
}

export default GoogleOauthButton
