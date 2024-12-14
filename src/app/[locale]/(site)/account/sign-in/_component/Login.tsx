'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import LoginContextProvider from '@/app/_context/LoginContext'
import { useSearchParams } from 'next/navigation'
import LoginForm from './LoginForm'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormIntegrated from './LoginFormIntegrated'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'

export default function Login() {
  const appType = useApplicationType()
  const params = useSearchParams()
  const to = params.get('to') || undefined

  return (
    <LoginContextProvider>
      <LoginForm>
        {appType === 'private' && <LoginFormPrivate destination={to} />}
        {appType === 'school' && <LoginFormSchool destination={to} />}
        {appType === 'academy' && <LoginFormAcademy destination={to} />}
        {appType === 'app' && <LoginFormIntegrated />}
      </LoginForm>
    </LoginContextProvider>
  )
}
