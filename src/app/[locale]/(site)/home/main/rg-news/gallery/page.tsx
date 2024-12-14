import SITE_PATH from '@/app/site-path'
import { Margin } from '@/ui/common/common-components'
import GalleryBoardList from '../../_cpnt/GalleryBoardList'

export default async function Page(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <>
      <Margin height={15} />
      <GalleryBoardList
        linkPath={SITE_PATH.HOME.GALLERY_POST}
        pagePath={SITE_PATH.HOME.GALLERY}
        page={page}
        grid
      />
    </>
  )
}
