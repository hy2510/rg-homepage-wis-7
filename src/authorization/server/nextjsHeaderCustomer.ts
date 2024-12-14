import { headers } from 'next/headers'

const HEADER_COOKIE_KEY = 'customer'

export async function getCustomerWithHeader(): Promise<string | undefined> {
  const header = await headers()
  const tokenCookie = header.get(HEADER_COOKIE_KEY)
  return tokenCookie || undefined
}
