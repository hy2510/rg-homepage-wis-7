'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'common'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function noticeMainList(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice-main'),
  })
  return await execute(request)
}

async function noticeList(
  customer: string,
  input: {
    page: string
  },
) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice'),
    option: {
      queryString: {
        page: input.page,
      },
    },
  })
  return await execute(request)
}

async function noticeDetail(customer: string, input: { id: string }) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice' + `/${input.id}`),
  })
  return await execute(request)
}

async function slidingBanner(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('sliding-banner'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function statisticRead() {
  const request = makeRequest({
    path: getPath('statistic-read'),
    option: {
      method: 'get',
    },
  })
  return await execute(request, { next: { revalidate: 3600 } })
}

async function galleryList(customer: string, input: { page: string }) {
  const request = makeRequest({
    customer,
    path: getPath('board/gallery'),
    option: {
      queryString: {},
    },
  })
  return await execute(request)
}

async function galleryDetail(customer: string, input: { id: string }) {
  const request = makeRequest({
    customer,
    path: getPath('board/gallery' + `/${input.id}`),
  })
  return await execute(request)
}

async function customerReviewList(
  customer: string,
  input: { writeType: string; page: string },
) {
  const request = makeRequest({
    customer,
    path: getPath(`board/handwritten/${input.writeType}`),
    option: {
      queryString: {
        page: input.page,
      },
    },
  })
  return await execute(request)
}

async function customerReviewDetail(
  customer: string,
  input: { writeType: string; id: string },
) {
  const request = makeRequest({
    customer,
    path: getPath(`board/handwritten/${input.writeType}/${input.id}`),
  })
  return await execute(request)
}

async function saveMarketingReferer(
  customer: string,
  input: { userIp: string; userAgent: string; referer: string },
) {
  const request = makeRequest({
    customer,
    path: getPath(`save-marketing-referer`),
    option: {
      method: 'post',
      body: {
        userIp: input.userIp,
        userAgent: input.userAgent,
        referer: input.referer,
      },
    },
  })
  return await execute(request)
}

const Home = {
  statisticRead,
  noticeMainList,
  slidingBanner,
  noticeList,
  noticeDetail,
  galleryList,
  galleryDetail,
  customerReviewList,
  customerReviewDetail,
  saveMarketingReferer,
}
export default Home
