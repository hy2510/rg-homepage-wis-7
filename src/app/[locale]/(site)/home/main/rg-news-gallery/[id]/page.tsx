import GalleryBoardDetail from '../../_cpnt/GalleryBoardDetail'

export default function Page({ params }: { params: { id: string } }) {
  return <GalleryBoardDetail id={params.id} />
}
