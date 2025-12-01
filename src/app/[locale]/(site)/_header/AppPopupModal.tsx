'use client'

import styles from './AppPopupModal.module.scss'
import SITE_PATH from '@/app/site-path'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// localStorage에 저장하여 브라우저 캐시 삭제 시 함께 삭제되어 다시 노출됨
const STORAGE_KEY = 'app_popup_20251201_dismissed'
const IMAGE_PATH = '/src/images/app-popup/2025/app_popup_20251201.png'
const START_DATE = new Date('2025-12-01')
const END_DATE = new Date('2025-12-14')
END_DATE.setHours(23, 59, 59, 999) // 하루 끝까지 포함

export function AppPopupModal() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return

    // 경로 체크: account-list와 sign-in 페이지에서만 표시
    if (
      pathname.indexOf(SITE_PATH.ACCOUNT.MAIN) === -1 &&
      pathname.indexOf(SITE_PATH.ACCOUNT.SIGN_IN) === -1
    ) {
      return
    }

    // 도메인 체크: apps.readinggate.com에서만 표시
    // const hostname = window.location.hostname
    // if (hostname !== 'apps.readinggate.com') {
    //   return
    // }

    // 날짜 체크: START_DATE ~ END_DATE 사이인지 확인
    const now = new Date()
    if (now < START_DATE || now > END_DATE) {
      return
    }

    // localStorage(브라우저 캐시)에서 "다시보지 않기" 체크
    const isDismissed = localStorage.getItem(STORAGE_KEY) === 'true'
    if (isDismissed) {
      return
    }

    // 모든 조건을 만족하면 모달 표시
    setIsVisible(true)
  }, [pathname])

  // 모달이 표시될 때 body 스크롤 막기
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleDontShowAgain = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={styles.popup_overlay} onClick={handleClose}>
      <div
        className={styles.popup_container}
        onClick={(e) => e.stopPropagation()}>
        <button className={styles.btn_close} onClick={handleClose}>
          ×
        </button>
        <div className={styles.image_wrapper}>
          <Image
            src={IMAGE_PATH}
            alt="앱 팝업"
            width={800}
            height={1200}
            className={styles.popup_image}
            unoptimized
            priority
          />
        </div>
        <div className={styles.button_wrapper}>
          <button
            className={styles.btn_dont_show}
            onClick={handleDontShowAgain}>
            다시보지 않기
          </button>
        </div>
      </div>
    </div>
  )
}
