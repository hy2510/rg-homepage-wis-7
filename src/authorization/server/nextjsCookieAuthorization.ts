import { cookies as syncCookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Authorization, createAuthorization } from './authorize'
import AuthorizeToken, { deserializeToken, serializeToken } from './token'

const TOKEN_COOKIE_KEY = 'token'

/**
 * 쿠키에서 Authorization 객체를 가져온다.
 * @returns Authorization 객체
 */
export async function getAuthorizationWithCookie(): Promise<Authorization> {
  const asyncCookies = new Promise<any>((resolve) => resolve(syncCookies()))
  const cookie = await asyncCookies

  let authorizeToken: AuthorizeToken | undefined = undefined
  if (cookie) {
    const item = cookie.get(TOKEN_COOKIE_KEY)
    if (item) {
      authorizeToken = deserializeToken(item.value)
    }
  }
  return createAuthorization(authorizeToken)
}

/**
 * 토큰을 쿠키에 저장한다.
 * @param response 쿠키를 설정할 수 있는 NextResponse 객체
 * @param token 쿠키에 저장할 토큰
 * @returns NextResponse
 */
export function setTokenWithCookie(
  response: NextResponse,
  token: AuthorizeToken,
): NextResponse {
  response.cookies.set(TOKEN_COOKIE_KEY, serializeToken(token), {
    httpOnly: true,
    secure: false,
  })
  return response
}

/**
 * 토큰을 쿠키에서 삭제한다.
 * @param response 쿠키를 설정할 수 있는 NextResponse 객체
 * @returns NextResponse
 */
export function deleteTokenWithCookie(response: NextResponse): NextResponse {
  response.cookies.delete(TOKEN_COOKIE_KEY)
  return response
}
