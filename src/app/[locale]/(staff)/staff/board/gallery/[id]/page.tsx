import GalleryBoardDetail from '@/app/[locale]/(site)/home/main/_cpnt/GalleryBoardDetail'
import { STAFF_PATH } from '@/app/site-path'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <GalleryBoardDetail
      id={params.id}
      backColorWhite={false}
      modifyLink={`${STAFF_PATH.GALLERY.WRITE}/${params.id}`}
    />
  )
}
