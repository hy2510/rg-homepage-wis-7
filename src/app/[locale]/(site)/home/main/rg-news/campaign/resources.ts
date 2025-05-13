import SITE_PATH from '@/app/site-path'

const post = [
  {
    id: '2024',
    title: '2024 다독다독 기부캠페인',
    url: `${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2024`,
  },
  {
    id: '2023',
    title: '2023 다독다독 기부캠페인',
    url: `${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2023`,
  },
  {
    id: '2022',
    title: '2022 다독다독 기부캠페인',
    url: `${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2022`,
  },
  {
    id: '2021',
    title: '2021 다독다독 기부캠페인',
    url: `${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2021`,
  },
  {
    id: '2020',
    title: '2020 다독다독 기부캠페인',
    url: `${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2020`,
  },
  {
    id: '2019',
    title: '2019 다독다독 기부캠페인',
    url: `${SITE_PATH.HOME.EVENT_READING_CAMPAIN}/2019`,
  },
]

export function getPost() {
  return post
}

export function getLatestContentsUrl() {
  return post[0].url
}
