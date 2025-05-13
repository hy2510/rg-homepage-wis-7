'use client'

import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useOnLoadGalleryList } from '@/client/store/home/hook'
import { Margin } from '@/ui/common/common-components'
import GalleryBoardList from '../../_cpnt/GalleryBoardList'

export default function Page({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const route = useRouter()

  const { payload, loading, error } = useOnLoadGalleryList({ page })

  const galleryList = payload
    ? [
        ...payload.board.map((board) => {
          return {
            title: board.title,
            date: board.registDate.split('T')[0],
            link: `${SITE_PATH.HOME.GALLERY_POST}/${board.boardId}`,
            image: board.imagePath || undefined,
          }
        }),
      ]
    : []

  const onPageChange = (page: number) => {
    route.push(`${SITE_PATH.HOME.GALLERY}?page=${page}`)
  }

  return (
    <>
      <Margin height={15} />
      <GalleryBoardList
        list={galleryList}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </>
  )
}
