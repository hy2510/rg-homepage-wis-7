'use client'

import useAccountInfoLoading from '@/app/[locale]/(site)/library/_mode/useAccountInfoLoading'
import { updateAccount } from '@/app/_account/account-list'
import { useCustomerInfo } from '@/app/_context/CustomerContext'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useStudentAvatar } from '@/client/store/student/avatar/selector'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useUpdateStudentLogOn } from '@/client/store/student/info/hook'
import {
  useStudentInfo,
  useStudentStudyable,
} from '@/client/store/student/info/selector'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import SITE_PATH from '../site-path'

export default function LoginForward({
  to,
  error,
}: {
  to?: string
  error?: ReactNode
}) {
  const router = useRouter()
  const state = useAccountInfoLoading()
  const [ready, setReady] = useState(false)

  const onUpdateLogOn = useUpdateStudentLogOn()
  const { customerId, name: customerName } = useCustomerInfo()
  const { loginId, studentId, name: studentName } = useStudentInfo()
  const avatarImage = useStudentAvatar().userAvatar.imageLarge
  const level = useSelectStudyLevel() || undefined
  const { isStudyEnd } = useStudentStudyable()
  const destinationPath = getDestinationPath({
    destination: to,
    level,
    isStudyEnd,
  })

  useEffect(() => {
    if (!state.isLoading && loginId && customerId) {
      updateAccount({
        loginId: loginId,
        customerId: customerId,
        customerName: customerName,
        studentId: studentId,
        studentName: studentName,
        avatar: avatarImage,
      })
      setReady(true)
    }
  }, [
    state.isLoading,
    loginId,
    customerId,
    customerName,
    studentId,
    studentName,
    avatarImage,
  ])

  useEffect(() => {
    if (!state.isLoading && ready) {
      onUpdateLogOn()
      if (destinationPath) {
        router.replace(destinationPath)
      }
    }
  }, [router, ready, state.isLoading, destinationPath, to, onUpdateLogOn])

  if (state.isError) {
    return <>{error}</>
  }
  if (state.isLoading) {
    return <LoadingScreen />
  }
  return <></>
}

export const DESTINATION = {
  STUDY: '_study',
  TICKET: '_ticket',
  PURCHASE: '_purchase',
}

function getDestinationPath({
  destination,
  level,
  isStudyEnd,
}: {
  destination?: string
  level?: string
  isStudyEnd?: boolean
}): string {
  let path: string = ''
  if (destination === DESTINATION.TICKET) {
    path = SITE_PATH.HOME.MEMBERSHIP_TICKET
  } else if (destination === DESTINATION.PURCHASE) {
    path = SITE_PATH.HOME.MEMBERSHIP_PAYMENT
  } else if (destination === DESTINATION.STUDY) {
    if (isStudyEnd) {
      path = SITE_PATH.HOME.MAIN
    } else {
      if (level && level !== 'PK') {
        path = SITE_PATH.LIBRARY.HOME
      } else if (level && level === 'PK') {
        path = SITE_PATH.BASIC.HOME
      } else {
        path = SITE_PATH.HOME.MAIN
      }
    }
  } else if (destination?.startsWith('/')) {
    path = destination
  }
  return path
}
