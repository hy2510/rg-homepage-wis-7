'use client'

import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/app/_context/CustomerContext'
import { useDevicePlatform } from '@/app/_context/DeviceContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useOnLoadMain } from '@/client/store/home/hook'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import { useStyle } from '@/ui/context/StyleContext'
import HiDodoBannerAni from '@/ui/modules/HiDodoBannerAni'
import {
  RgNewsTable,
  RgNewsTableItem,
} from '@/ui/modules/home-main-components/HomeMainRgNews'
import {
  AdBannerType1,
  AdBannerType3,
  HomeBanner,
  HomeBannerChanner,
  HomeBannerDonation,
  HomeBannerRgMembership,
  HomeBannerRgShop,
  HomeCustomerCenter,
  HomePartnership,
  NoticeBanner,
} from '@/ui/modules/home-main-components/home-main-ad-banners'
import LogIn from '@/ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/ui/modules/home-main-components/home-main-main-banner'
import {
  HomeMainQuickMenu,
  HomeMainQuickMenuItem,
} from '@/ui/modules/home-main-components/home-main-quick-menu'

const STYLE_ID = 'page_main'

type BeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function MainKr() {
  const router = useRouter()
  const { customerId } = useCustomerInfo()

  useEffect(() => {
    if (!customerId) {
      router.replace(SITE_PATH.ACCOUNT.MAIN)
    }
  }, [router, customerId])

  const platform = useDevicePlatform()

  if (platform === 'unknown') {
    return <></>
  }
  return <MainComponent platform={platform} />
}

function MainComponent({ platform }: { platform: string }) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const { main, target, country } = useSiteBlueprint()
  const { payload: mainData } = useOnLoadMain(target, platform, country)
  const level = useSelectStudyLevel() || ''
  const isLogin = useStudentIsLogin()
  const onClickMainLoginButton = () => {
    if (isLogin) {
      if (level !== 'PK') {
        router.push(SITE_PATH.LIBRARY.HOME)
      } else {
        router.push(SITE_PATH.BASIC.HOME)
      }
    } else {
      router.push(SITE_PATH.ACCOUNT.MAIN)
    }
  }
  const isEnabledTicket =
    platform.toLowerCase() !== 'android' && platform.toLowerCase() !== 'ios'

  // 띠배너 노출 기간 ~ 3월 8일 토요일 06시 00분
  const bannerTime = Date.now()
  const bannerStartDate = new Date(2025, 3 - 1, 5, 8, 0, 0)
  const bannerEndDate = new Date(2025, 3 - 1, 8, 6, 0, 0)
  const isShowBanner =
    bannerTime - bannerStartDate.getTime() >= 0 &&
    bannerEndDate.getTime() - bannerTime >= 0

  if (!mainData) {
    return <div></div>
  }
  return (
    <>
      {/* 띠 베너 */}
      {isShowBanner && (
        <NoticeBanner bgColor="#FF1B45">
          <div style={{ color: 'white' }}>
            서버 점검에 따른 학습 및 홈페이지 이용 제한 안내
            <br />
            3/8(토) 01:00 ~ 3/8(토)06:00
          </div>
        </NoticeBanner>
      )}
      <main className={`${style.home_news_kr} container`}>
        <div className={style.row_1}>
          {mainData.slide.length > 0 && <MainBanner banner={mainData.slide} />}
          <div className={style.label}>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
            <Link href="https://gohidodo.com/" target="_blank">
              <div className={style.hi_dodo_banner}>
                <HiDodoBannerAni />
                {/* <Image src='/src/images/@home/hi-dodo-banner/text.svg' width={240} height={32} alt='' style={{width: '180px', height: 'auto'}} />
                <Image src='/src/images/@home/hi-dodo-banner/hidodo_icon.png' width={50} height={50} alt='' style={{width: '50px', height: 'auto'}} /> */}
              </div>
            </Link>
          </div>
        </div>
        <HomeMainQuickMenu label={t('t879')}>
          <HomeMainQuickMenuItem
            title={t('t880')}
            href="/home/user-guide"
            bgColor="#E8EBED"
            imgSrc="/src/images/@home/quick-menu-icon/find.png"
          />
          <HomeMainQuickMenuItem
            title={t('t881')}
            href="/ranking"
            bgColor="#FFF3BB"
            imgSrc="/src/images/@home/quick-menu-icon/star.png"
          />
          <HomeMainQuickMenuItem
            title={t('t882')}
            href="/home/main/rg-news/new-contents/"
            bgColor="#D9F8FF"
            imgSrc="/src/images/@home/quick-menu-icon/new_book.png"
          />
          <HomeMainQuickMenuItem
            title={t('t893')}
            href="/home/rg-membership/payment/purchase"
            bgColor="#D8F6E5"
            imgSrc="/src/images/@home/quick-menu-icon/payment.png"
          />
          <HomeMainQuickMenuItem
            title={t('t883')}
            href="https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1"
            target="_blank"
            bgColor="#E8F1FF"
            imgSrc="/src/images/@home/quick-menu-icon/work_book.png"
          />
        </HomeMainQuickMenu>
        <div className={style.row_3}>
          <RgNewsTable>
            {mainData.board.map((banner) => {
              return (
                <RgNewsTableItem
                  key={banner.link}
                  title={banner.title}
                  summary={banner.summary}
                  date={banner.date}
                  href={banner.link}
                  target={banner.self ? '' : '_blank'}
                />
              )
            })}
          </RgNewsTable>
          <div className={style.col_1}>
            <AdBannerType1
              title={''}
              href={SITE_PATH.HOME.CUSTOMER_STUDENT_REVIEW}
              imgSrc={'/src/sample-images/@home/cards/hall_of_fame.png'}
              width={640}
              height={640}
            />
            <AdBannerType1
              title={''}
              href={SITE_PATH.HOME.NEW_CONTENTS}
              imgSrc={'/src/sample-images/@home/cards/new_books.png'}
              width={640}
              height={640}
            />
          </div>
        </div>
        <div className={style.row_4}>
          <div className={style.col_1}>
            <HomeBanner
              title="RG 뉴스레터"
              txtColor="#fff"
              sub="2025년 3월"
              subColor="#fff"
              comment="2025 상반기 영어독서왕 선발대회, 티타늄 등급 상패 증정식 등..."
              commentColor="#fff"
              bgColor="#038DF1"
              bgImage="/src/images/@home/cards/news_letter.svg"
              href="/home/main/rg-news/newsletter/"
            />
            <HomeBanner
              title="인포그래픽"
              txtColor="#fff"
              sub="학습"
              subColor="#F880C1"
              comment="리딩게이트 이용자들은 책을 어떻게, 얼마나 읽고 있을까요?"
              commentColor="#fff"
              bgColor="#1E254F"
              bgImage="/src/images/@home/cards/infographic.svg"
              href="/home/main/rg-news/infographic/"
            />
          </div>
          <AdBannerType3
            bgImage="/src/sample-images/@home/cards/king_of_reading.svg"
            href={'/home/main/rg-news-post/1665'}
          />
        </div>
        <div className={style.row_5}>
          <HomeBanner
            title={t('t884')}
            comment={t('t885')}
            bgImage="/src/images/@home/img_post_card_bg_default.svg"
            href="/home/about-to-school"
          />
          <HomeBanner
            title={t('t886')}
            comment={t('t887')}
            bgImage="/src/images/@home/cards/how_to_use.svg"
            href="/home/user-guide"
          />
          <HomeBannerRgShop />
          <HomeBannerRgMembership isEnabledTicket={isEnabledTicket} />
        </div>
        <div className={style.row_6_kr}>
          <HomeCustomerCenter />
          <HomeBanner
            title={t('t903')}
            comment={t('t904')}
            bgImage="/src/images/@home/cards/ranking.png"
            href="/ranking"
          />
          <HomePartnership />
        </div>
        <div className={style.row_7}>
          <HomeBannerChanner
            title1=""
            title2="RG Cafe"
            linkTxt1={t('t907')}
            link1="https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=30%26search.boardtype=L"
            linkTxt2={t('t908')}
            link2="https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=113%26search.boardtype=L"
            bgColor="#5B2390"
            bgImage="/src/images/@home/channer/channer_cafe.svg"
          />
          <HomeBannerChanner
            title1=""
            title2="RG Blog"
            linkTxt1={t('t909')}
            link1="https://blog.naver.com/PostList.nhn?blogId=readinggate_official&from=postList&categoryNo=10"
            linkTxt2={t('t910')}
            link2="https://blog.naver.com/PostList.naver?blogId=readinggate_official&from=postList&categoryNo=14"
            bgColor="#2FB44A"
            bgImage="/src/images/@home/channer/channer_blog.svg"
          />
          <HomeBannerChanner
            title1=""
            title2="RG Instagram"
            linkTxt1={t('t915')}
            link1="https://www.instagram.com/readinggate_official/"
            bgColor="#BF2024"
            bgImage="/src/images/@home/channer/channer_insta.svg"
          />
          <HomeBannerDonation
            link="https://blog.naver.com/readinggate_official/223785592097"
            donation={mainData.campaign}
          />
        </div>
      </main>
    </>
  )
}
