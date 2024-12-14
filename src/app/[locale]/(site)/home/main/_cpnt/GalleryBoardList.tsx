'use client'

import { useRouter } from 'next/navigation'
import { useOnLoadGalleryList } from '@/client/store/home/hook'
import BoardList from './BoardList'

export default function GalleryBoardList({
  linkPath,
  pagePath,
  page,
  grid,
}: {
  linkPath: string
  pagePath: string
  page: number
  grid?: boolean
}) {
  const { payload, loading, error } = useOnLoadGalleryList({ page })

  const noticeList = [
    ...payload.board.map((board) => {
      return {
        title: board.title,
        image: board.imagePath || undefined,
        date: board.registDate.split('T')[0],
        link: `${linkPath}/${board.boardId}`,
      }
    }),
  ]
  const maxPage = 0

  const route = useRouter()
  const onPageChange = (page: number) => {
    route.push(`${pagePath}?page=${page}`)
  }

  if (noticeList.length === 0) {
    return (
      <div style={{ margin: '60px 16px' }}>Sorry, there are no posts yet.</div>
    )
  }
  return (
    <BoardList
      list={noticeList}
      page={page}
      maxPage={maxPage}
      onPageClick={onPageChange}
      grid={grid}
    />
  )
}
