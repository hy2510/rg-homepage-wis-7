import GalleryBoardDetail from '@/app/[locale]/(site)/home/main/_cpnt/GalleryBoardDetail'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  return <GalleryBoardDetail id={params.id} backColorWhite={false} />
}
