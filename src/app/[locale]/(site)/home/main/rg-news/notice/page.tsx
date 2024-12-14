import SITE_PATH from '@/app/site-path'
import NoticeBoardList from '../../_cpnt/NoticeBoardList'

export default async function Page(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <NoticeBoardList
      linkPath={SITE_PATH.HOME.NEWS_POST}
      pagePath={SITE_PATH.HOME.NOTICE}
      page={page}
    />
  )
}
