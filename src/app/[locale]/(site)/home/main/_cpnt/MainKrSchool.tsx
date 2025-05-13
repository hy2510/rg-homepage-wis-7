'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/app/_context/CustomerContext'
import { useDevicePlatform } from '@/app/_context/DeviceContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useOnLoadMain } from '@/client/store/home/hook'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import { useStyle } from '@/ui/context/StyleContext'
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
  HomeBannerRgShopSchool,
  HomeBannerRgShopWorkbookSchool,
  HomeCustomerCenterKrSchool,
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

export default function MainKrSchool() {
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
  const { isPaymentable, target, country } = useSiteBlueprint()
  const isLogin = useStudentIsLogin()

  const { payload: mainData } = useOnLoadMain(target, platform, country)
  const level = useSelectStudyLevel() || ''

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
  const useapp = useApplicationType()

  // 띠배너 노출 기간 ~ 3월 25일 화요일 06시 00분
  const bannerTime = Date.now()
  const bannerStartDate = new Date(2025, 3 - 1, 20, 8, 0, 0)
  const bannerEndDate = new Date(2025, 3 - 1, 25, 6, 0, 0)
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
            3/25(화) 00:00 ~ 3/25(화)06:00
          </div>
        </NoticeBanner>
      )}
      <main className={`${style.home_news_kr} container`}>
        <div className={style.row_1}>
          {mainData.slide.length > 0 && <MainBanner banner={mainData.slide} />}
          <div className={style.label}>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
            {/* <Link href='https://gohidodo.com/' target='_blank'>
              <div className={style.hi_dodo_banner}>
                <Image src='/src/images/@home/hi-dodo-banenr/text.svg' width={240} height={32} alt='' style={{width: '180px', height: 'auto'}} />
                <Image src='/src/images/@home/hi-dodo-banenr/hidodo_icon.png' width={50} height={50} alt='' style={{width: '50px', height: 'auto'}} />
              </div>
            </Link> */}
          </div>
        </div>
        <HomeMainQuickMenu label="자주 찾는 메뉴">
          <HomeMainQuickMenuItem
            title="학습 이용 방법"
            href="/home/user-guide"
            bgColor="#E8EBED"
            imgSrc="/src/images/@home/quick-menu-icon/find.png"
          />
          <HomeMainQuickMenuItem
            title="랭킹"
            href="/ranking"
            bgColor="#FFF3BB"
            imgSrc="/src/images/@home/quick-menu-icon/star.png"
          />
          <HomeMainQuickMenuItem
            title="신규 도서"
            href="/home/main/rg-news/new-contents/"
            bgColor="#D9F8FF"
            imgSrc="/src/images/@home/quick-menu-icon/new_book.png"
          />
          {isPaymentable && (
            <HomeMainQuickMenuItem
              title="결제"
              href="/home/rg-payment/purchase"
              bgColor="#D8F6E5"
              imgSrc="/src/images/@home/quick-menu-icon/payment.png"
            />
          )}
          <HomeMainQuickMenuItem
            title="워크북 구매하기"
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
              href={'/home/customer-review/student'}
              imgSrc={'/src/sample-images/@home/cards/hall_of_fame.png'}
              width={640}
              height={640}
            />
            <AdBannerType1
              title={''}
              href={'/home/main/rg-news/new-contents/'}
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
            href={'/home/main/rg-news-post/2069'}
          />
        </div>
        <div className={style.row_5}>
          <HomeBanner
            title="리딩게이트 소개"
            comment="미래를 여는 행복한 습관! 리딩게이트의 세계에 오신 것을 환영합니다!"
            bgImage="/src/images/@home/img_post_card_bg_default.svg"
            href="/home/about-to-school"
          />
          <HomeBanner
            title="학습 이용 방법"
            comment="어렵지 않아요. 차근차근 안내를 따라 학습해 보세요!"
            bgImage="/src/images/@home/cards/how_to_use.svg"
            href="/home/user-guide"
          />
          <HomeBannerRgShopSchool />
          <HomeBannerRgShopWorkbookSchool />
        </div>
        <div className={style.row_6_kr}>
          <HomeCustomerCenterKrSchool />
          <HomeBanner
            title="랭킹"
            comment="친구들과 함께 성장하는 즐거움!"
            bgImage="/src/images/@home/cards/ranking.png"
            href="/ranking"
          />
          <HomePartnership />
        </div>
        <div className={style.row_7}>
          <HomeBannerChanner
            title1="리딩게이트"
            title2="공식 카페"
            linkTxt1="RG에 빠진 가족"
            link1="https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=30%26search.boardtype=L"
            linkTxt2="영어 독서왕 대상 후기"
            link2="https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=113%26search.boardtype=L"
            bgColor="#5B2390"
            bgImage="/src/images/@home/channer/channer_cafe.svg"
          />
          <HomeBannerChanner
            title1="리딩게이트"
            title2="공식 블로그"
            linkTxt1="RG에 빠진 아이들"
            link1="https://blog.naver.com/PostList.nhn?blogId=readinggate_official&from=postList&categoryNo=10"
            linkTxt2="슈퍼스타 수상자 인터뷰"
            link2="https://blog.naver.com/PostList.naver?blogId=readinggate_official&from=postList&categoryNo=14"
            bgColor="#2FB44A"
            bgImage="/src/images/@home/channer/channer_blog.svg"
          />
          <HomeBannerChanner
            title1="리딩게이트"
            title2="공식 Instagram"
            linkTxt1="다양한 소식 모아보기"
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
