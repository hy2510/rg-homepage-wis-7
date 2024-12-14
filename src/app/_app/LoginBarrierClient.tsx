'use client'

import { ReactNode } from 'react'
import { useStudentInfoFlagLogin } from '@/client/store/student/info/selector'

export default function LoginBarrierClient({
  children,
}: {
  children?: ReactNode
  redirectPath?: string
}) {
  const loginStatus = useStudentInfoFlagLogin()

  if (loginStatus === 'on') {
    return <div></div>
  }
  return <>{children}</>
}
