'use client'

import ClientTo from '@/app/_app/ClientTo'
import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useStudentInfoFlagLogin } from '@/client/store/student/info/selector'
import PaymentHistory from '../_cpnt/PaymentHistory'

export default function Page() {
  const { isPaymentable } = useSiteBlueprint()

  const path = usePathname()
  const isLogOff = useStudentInfoFlagLogin() === 'off'
  const [redirect, setRedirect] = useState('')

  if (isPaymentable && isLogOff) {
    if (!redirect) {
      alert('로그인 후 이용 가능합니다.')
      // setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}?to=${path}`)
      setRedirect(`${SITE_PATH.ACCOUNT.SIGN_IN}`)
    }
    return <>{redirect && <ClientTo to={redirect}></ClientTo>}</>
  }
  return <PaymentHistory />
}
