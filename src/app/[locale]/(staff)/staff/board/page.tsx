'use client'

import NoticeBoardList from '@/app/[locale]/(site)/home/main/_cpnt/NoticeBoardList'
import { STAFF_PATH } from '@/app/site-path'
import { use } from 'react'

export default function Page(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = use(props.searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <NoticeBoardList
      linkPath={STAFF_PATH.BOARD}
      pagePath={STAFF_PATH.BOARD}
      page={page}
    />
  )
}
