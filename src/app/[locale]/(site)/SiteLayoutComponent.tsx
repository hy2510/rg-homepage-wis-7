'use client'

import { useThemeColor } from '@/ui/context/StyleContext'
import ChangeGroupClassController from './_header/ChangeGroupClassController'
import Gfooter from './_header/GFooter'
import Gheader from './_header/Gheader'
import useConnectRefreshToken from './useConnectRefreshToken'

export default function SiteLayoutComponent({
  children,
}: {
  children?: React.ReactNode
}) {
  useConnectRefreshToken()

  const themeColor = useThemeColor()

  return (
    <>
      <meta name="theme-color" content={themeColor} />
      <ChangeGroupClassController>
        <Gheader />
        {children}
        <Gfooter />
      </ChangeGroupClassController>
    </>
  )
}
