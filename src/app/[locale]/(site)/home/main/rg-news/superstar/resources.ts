import SITE_PATH from '@/app/site-path'

const post = [
  {
    id: '2022',
    title: '2022년 슈퍼스타 선발대회',
    url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2022`,
  },
  {
    id: '2021',
    title: '2021년 슈퍼스타 선발대회',
    url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2021`,
  },
  {
    id: '2020',
    title: '2020년 슈퍼스타 선발대회',
    url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2020`,
  },
  {
    id: '2019',
    title: '2019년 슈퍼스타 선발대회',
    url: `${SITE_PATH.HOME.EVENT_SUPERSTAR}/2019`,
  },
]

export function getPost() {
  return post
}

export function getLatestContentsUrl() {
  return post[0].url
}
