'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import MainGlobalAca from './_cpnt/MainGlobalAca'
import MainKr from './_cpnt/MainKr'
import MainKrAca from './_cpnt/MainKrAca'
import MainKrSchool from './_cpnt/MainKrSchool'
import MainVn from './_cpnt/MainVn'
import MainVnAca from './_cpnt/MainVnAca'

export default function Page() {
  const { country, target } = useSiteBlueprint()

  let templateName:
    | 'kr-private'
    | 'kr-school'
    | 'kr-academy'
    | 'vn-private'
    | 'vn-academy'
    | 'others' = 'others'

  if (country.korea) {
    if (target.private) {
      templateName = 'kr-private'
    } else if (target.school) {
      templateName = 'kr-school'
    } else if (target.academy) {
      templateName = 'kr-academy'
    }
  } else if (country.vietnam) {
    if (target.private) {
      templateName = 'vn-private'
    } else if (target.academy) {
      templateName = 'vn-academy'
    }
  }

  return (
    <>
      {templateName === 'kr-private' && <MainKr />}
      {templateName === 'kr-school' && <MainKrSchool />}
      {templateName === 'kr-academy' && <MainKrAca />}
      {templateName === 'vn-private' && <MainVn />}
      {templateName === 'vn-academy' && <MainVnAca />}
      {templateName === 'others' && <MainGlobalAca />}
    </>
  )
}
