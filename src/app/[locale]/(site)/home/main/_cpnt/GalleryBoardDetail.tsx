'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useOnLoadGalleryDetail } from '@/client/store/home/hook'
import BoardDetail from './BoardDetail'

export default function GalleryBoardDetail({
  id,
  backColorWhite = true,
}: {
  id: string
  backColorWhite?: boolean
}) {
  const { payload, loading, error } = useOnLoadGalleryDetail({
    boardId: id,
  })
  // @Language 'common'
  const { t } = useTranslation()

  const title = payload.title || ''
  let date = ''
  if (payload.registDate) {
    date = payload.registDate.split('T')[0]
  }
  const html = payload.content || '<div></div>'
  const image = payload.imagePath

  return (
    <BoardDetail
      backLabel={'갤러리'}
      backColorWhite={backColorWhite}
      title={title}
      date={date}
      image={image}
      htmlContents={html}
    />
  )
}
