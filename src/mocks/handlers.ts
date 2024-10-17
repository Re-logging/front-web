import { http, HttpResponse } from 'msw'

type User = {
  firstName: string
  lastName: string
}

export const handlers = [
  http.get<never, never, User>('https://api.example.com/user', () => {
    return HttpResponse.json({
      firstName: 'hello',
      lastName: 'WORLD',
    })
  }),
]
