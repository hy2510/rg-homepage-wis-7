'use client'

import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useOnLoadCustomerReviewList } from '@/client/store/home/hook'
import PaginationBar from '@/ui/common/PaginationBar'
import { useStyle } from '@/ui/context/StyleContext'
import {
  Board,
  BoardHeader,
  BoardItem,
} from '@/ui/modules/home-customer-review-components/board'

const STYLE_ID = 'page_parents'

export default function Page(props: {
  searchParams: Promise<{ page: string }>
  params: Promise<{ writeType: string; id: string }>
}) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const style = useStyle(STYLE_ID)

  const writeType = params.writeType
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { payload, loading, error } = useOnLoadCustomerReviewList({
    writeType,
    page,
  })
  const sitePath =
    writeType === 'parent'
      ? SITE_PATH.HOME.CUSTOMER_PARENT_REVIEW
      : SITE_PATH.HOME.CUSTOMER_STUDENT_REVIEW

  const route = useRouter()
  const onPageClick = (page: number) => {
    route.push(`${sitePath}?page=${page}`)
  }

  return (
    <div className={style.parents}>
      <Board>
        <BoardHeader
          txt_th1={'no.'}
          txt_th2={'제목'}
          txt_th3={'이름'}
          txt_th4={'날짜'}
        />
        {payload.board.map((board) => {
          let date = ''
          if (board.regDate) {
            date = board.regDate.split('T')[0]
          }
          return (
            <BoardItem
              key={`${board.id}`}
              txt_td1={`${board.rowNum}`}
              txt_td2={board.title}
              txt_td3={board.writer}
              txt_td4={date}
              href={`${sitePath}/${board.id}`}
            />
          )
        })}
      </Board>
      {payload.board.length > 0 && (
        <PaginationBar
          page={payload.page.page}
          maxPage={payload.page.totalPages}
          onPageClick={onPageClick}
        />
      )}
    </div>
  )
}
