import { headers as syncHeaders } from 'next/headers'

const HEADER_COOKIE_KEY = 'customer'

export async function getCustomerWithHeader(): Promise<string | undefined> {
  const asyncHeaders = new Promise<any>((resolve) => resolve(syncHeaders()))

  const header = await asyncHeaders
  const customerToken = header.get(HEADER_COOKIE_KEY) || undefined

  return customerToken
}
