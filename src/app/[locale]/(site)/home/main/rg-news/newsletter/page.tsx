import { redirect } from 'next/navigation'
import { getLatestContentsUrl } from './resources'

export default function Page() {
  redirect(getLatestContentsUrl())
}
