'use client'

import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useOnLoadBoardNoticeList } from '@/client/store/home/hook'
import NoticeBoardList from '../../_cpnt/NoticeBoardList'

export default function Page({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { payload, loading, error } = useOnLoadBoardNoticeList({ page })

  const route = useRouter()

  const noticeList = payload
    ? [
        ...payload.board.map((board) => {
          return {
            title: board.title,
            date: board.registDate.split('T')[0],
            link: `${SITE_PATH.HOME.NEWS_POST}/${board.notifyId}`,
          }
        }),
      ]
    : []
  const maxPage = payload?.page?.totalPages || 0

  const onPageChange = (page: number) => {
    route.push(`${SITE_PATH.HOME.NOTICE}?page=${page}`)
  }

  return (
    <NoticeBoardList
      list={noticeList}
      currentPage={page}
      maxPage={maxPage}
      onPageChange={onPageChange}
    />
  )
}
