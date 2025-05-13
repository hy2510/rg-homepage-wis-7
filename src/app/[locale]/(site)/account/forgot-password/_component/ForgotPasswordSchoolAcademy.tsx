'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import { useCustomerInfo } from '@/app/_context/CustomerContext'
import { useDevicePlatform } from '@/app/_context/DeviceContext'
import { openWindow } from '@/app/_function/open-window'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BackLink, Button } from '@/ui/common/common-components'

type Step = 1 | 2 | 3
export default function ForgotPasswordSchoolAcademy({
  style,
}: {
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()
  const [step, setStep] = useState<Step>(1)

  const onClickLogin = () => {
    router.push(SITE_PATH.ACCOUNT.SIGN_IN)
  }

  const router = useRouter()
  const { customerId } = useCustomerInfo()
  const appType = useApplicationType()
  const isIos = useDevicePlatform() === 'iOS'

  const openPasswordBrowser = useCallback(() => {
    if (appType && customerId) {
      const url = `https://newfindpw.readinggate.com/?cid=${customerId}&app=${appType === 'app' ? 'Y' : 'N'}`
      if (isIos) {
        openWindow(`${url}&external=Y`, { external: true })
      } else {
        window.location.replace(url)
      }
    }
  }, [customerId, appType, isIos])
  useEffect(() => {
    openPasswordBrowser()
  }, [openPasswordBrowser])

  return (
    <>
      <BackLink
        onClick={() => {
          if (step === 1) {
            router.back()
          } else {
            setStep(1)
          }
        }}>
        {t('t247')}
      </BackLink>
      <div
        style={{
          marginTop: '40px',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}>
        <Button onClick={() => openPasswordBrowser()}>{t('t247')}</Button>
      </div>
      <div
        style={{
          marginTop: '40px',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}>
        <Button onClick={() => router.back()}>{t('t214')}</Button>
      </div>
    </>
  )
}
