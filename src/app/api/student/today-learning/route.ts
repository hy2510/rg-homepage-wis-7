import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Student from '@/repository/server/student'

export async function GET(request: NextRequest) {
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const token = authorizationWithCookie.getActiveAccessToken()

  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const [payload, status, error] = await executeRequestAction(
    Student.todayStudyLearning(token),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
