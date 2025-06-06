import { RouteResponse, executeRequestAction } from '@/app/api/_util'
import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Ranking from '@/repository/server/ranking'

export async function GET(request: NextRequest) {
  const customer = await getCustomerWithHeader()

  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }

  const [payload, status, error] = await executeRequestAction(
    Ranking.levelMaster(customer),
  )

  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
