'use client'

import GalleryBoardList from '@/app/[locale]/(site)/home/main/_cpnt/GalleryBoardList'
import { STAFF_PATH } from '@/app/site-path'
import { use } from 'react'

export default function Page(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = use(props.searchParams)
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <GalleryBoardList
      linkPath={STAFF_PATH.GALLERY}
      pagePath={STAFF_PATH.GALLERY}
      page={page}
      grid
    />
  )
}
