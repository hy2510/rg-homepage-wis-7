import NoticeBoardDetail from '@/app/[locale]/(site)/home/main/_cpnt/NoticeBoardDetail'
import { STAFF_PATH } from '@/app/site-path'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <NoticeBoardDetail
      id={params.id}
      backColorWhite={false}
      modifyLink={`${STAFF_PATH.NOTICE.WRITE}/${params.id}`}
    />
  )
}
