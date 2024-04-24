// Code citation: based on the example provided here from Vercel: https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/middleware.ts
import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin'],
}

export function middleware(req) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl
  // console.log("HELLO MIDDLEWARE!!")

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'COEadmin' && pwd === 'capst0ne24') {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'
  // console.log("redirecting to... ", url.pathname)
  return NextResponse.rewrite(url)
}