import IFrameWrapper from '@/app/_app/IFrameWrapper'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const url = `/src/html/superstar/${params.id}.html`
  return <IFrameWrapper pcUrl={url} mobileUrl={url} />
}
