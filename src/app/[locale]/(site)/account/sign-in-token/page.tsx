'use client'

import LoginContextProvider, {
  useLoginAction,
} from '@/app/_context/LoginContext'
import SITE_PATH from '@/app/site-path'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const code = searchParams.get('code') || undefined
  const i = Number(searchParams.get('i')) || 0

  if (!code || isNaN(i) || i < 1) {
    router.replace(SITE_PATH.HOME.MAIN)
  }
  return (
    <main className="container">
      {code && !isNaN(i) && i > 0 && (
        <LoginContextProvider>
          <AutoLogin code={code} i={i} />
        </LoginContextProvider>
      )}
    </main>
  )
}

function AutoLogin({ code, i }: { code: string; i: number }) {
  const router = useRouter()

  const onLogin = useLoginAction()
  const requestLogin = () => {
    onLogin({
      id: `${code}`,
      isSavePassword: false,
      isSSO: true,
      i,
      destination: undefined,
      onError: (code, message, redirect) => {
        if (code === 3000) {
        } else if (code === 2001 && redirect) {
          router.replace(redirect)
        } else if (code === 3100) {
          router.replace(SITE_PATH.HOME.MAIN)
        }
        alert(message)
      },
    })
  }

  useEffect(() => {
    if (code && i > 0) {
      requestLogin()
    }
  }, [code, i])

  return <></>
}
