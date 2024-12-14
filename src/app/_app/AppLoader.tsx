import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { ReactNode } from 'react'
import { makeCustomer } from '@/repository/client/object/customer'
import Common from '@/repository/server/common'
import AppInitializer from './AppInitializer'

export const revalidate = 0
const TARGET_HOMEPAGE = process.env.TARGET_HOMEPAGE

type CustomerPayload = {
  applicationType: string
  customerData?: string
}

async function getData(url: string, token?: string): Promise<CustomerPayload> {
  let homepageUrl = url
  if (TARGET_HOMEPAGE && TARGET_HOMEPAGE !== 'N') {
    homepageUrl = TARGET_HOMEPAGE
  }
  if (!homepageUrl.startsWith('https') && !homepageUrl.startsWith('http')) {
    homepageUrl = 'https://' + homepageUrl
  }

  let payload: CustomerPayload | undefined = undefined
  const urlResponse = await Common.findCustomer({ homepageUrl })
  if (urlResponse.ok && urlResponse.data) {
    const customer = makeCustomer(urlResponse.data.Customer)
    const applicationType = customer.customerUse.toLowerCase()

    if (
      applicationType === 'private' ||
      applicationType === 'school' ||
      applicationType === 'academy'
    ) {
      payload = {
        applicationType,
        customerData: JSON.stringify(urlResponse.data),
      }
    }
  }
  if (!payload) {
    if (token) {
      const meResponse = await Common.selfCustomer(token)
      if (meResponse.ok && meResponse.data) {
        payload = {
          applicationType: 'app',
          customerData: JSON.stringify(meResponse.data),
        }
      } else {
        payload = {
          applicationType: 'app',
          customerData: undefined,
        }
      }
    } else {
      payload = {
        applicationType: 'app',
        customerData: undefined,
      }
    }
  }
  if (!payload) {
    throw Error('Customer Not Found')
  }
  return payload
}

async function getUserAgentInfoTag() {
  const uaObj = userAgent({
    headers: await headers(),
  })
  const browswer =
    `${(uaObj?.browser?.name || 'Unknown').replace(/ /g, '')}(${uaObj?.browser?.version?.split('.')[0] || '?'}/${(uaObj?.os?.name || '?').replace(/ /g, '')})`.replace(
      /_/g,
      '-',
    )
  const type = `${uaObj?.device?.type || 'etc'}`.replace(/_/g, '-')
  return `${browswer}_${type}`
}

export default async function AppLoader({
  children,
}: {
  children?: ReactNode
}) {
  const header = await headers()
  const authorizationWithCookie = await getAuthorizationWithCookie()
  const findHost = header.get('host') || ''
  const token = authorizationWithCookie.getActiveAccessToken()
  const data = await getData(findHost, token)
  const userAgentTag = await getUserAgentInfoTag()
  const userDetails = token
    ? authorizationWithCookie.getTokenUserDetails()
    : undefined
  const isStaffAccess = userDetails?.role === 'staff'
  const isLogin = !!userDetails?.uid

  if (data) {
    return (
      <AppInitializer
        customerJson={data.customerData}
        applicationType={data.applicationType}
        isLogin={isLogin}
        isStaffAccess={isStaffAccess}
        userAgentInfo={userAgentTag}>
        {children}
      </AppInitializer>
    )
  } else {
    return <div>Not Found Customer</div>
  }
}
