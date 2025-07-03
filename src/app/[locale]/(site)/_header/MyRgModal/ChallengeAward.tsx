'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useAchieveReadingKingTrophy } from '@/client/store/achieve/readingking-trophy/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { AlertBar, EmptyMessage } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_option_my_rg'

// 챌린지(영어 독서왕 시상) 어워드
export function ChallengeAward() {
  const style = useStyle(STYLE_ID)
  const [selectedAward, setSelectedAward] = useState<{
    image: string
    name: string
    date: string
  } | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const student = useStudentInfo()

  // @Language 'common'
  const { t } = useTranslation()

  const TROPHY_IMAGES = [
    '/src/images/@award-challenge/award_daesang.svg',
    '/src/images/@award-challenge/award_choiwoosu.svg',
    '/src/images/@award-challenge/award_woosu.svg',
    '/src/images/@award-challenge/award_sungsil.svg',
  ]

  const awardReadingKing = useAchieveReadingKingTrophy().payload

  // 오버레이가 표시될 때 사운드 재생
  useEffect(() => {
    if (selectedAward && audioRef.current) {
      audioRef.current.currentTime = 0 // 처음부터 재생
      audioRef.current.play().catch((error) => {
        console.log('사운드 재생 실패:', error)
      })
    }
  }, [selectedAward])

  return (
    <div className={style.challenge_award}>
      {/* 오디오 요소 추가 */}
      <audio ref={audioRef} preload="auto">
        <source src="/src/sounds/award-challenge.mp3" type="audio/mpeg" />
      </audio>

      <AlertBar>{t('t089')}</AlertBar>
      {!awardReadingKing || awardReadingKing.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.challenge_award_list}>
          {awardReadingKing.map((award, idx) => {
            return (
              <div key={`award_readingking_${idx}`}>
                <ChallengeAwardItem
                  awardImgSrc={TROPHY_IMAGES[award.prizeGrade - 1]}
                  awardName={award.prizeTitle}
                  awardGetDate={award.registDate}
                  onImageClick={() =>
                    setSelectedAward({
                      image: TROPHY_IMAGES[award.prizeGrade - 1],
                      name: award.prizeTitle,
                      date: award.registDate,
                    })
                  }
                />
              </div>
            )
          })}
          {selectedAward && (
            <div className={style.challenge_award_bg_overlay}>
              <div className={style.overlay_image_container}>
                <div className={style.confetti}></div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAward(null)}>
                  <Image
                    src={selectedAward.image}
                    alt="Award"
                    width={350}
                    height={350}
                    className={`${style.overlay_image} animate__animated animate__fadeInUp`}
                  />
                </div>
                <div className={style.overlay_award_info}>
                  <div>리딩게이트 영어독서왕 선발대회</div>
                  <div className={style.overlay_award_name}>
                    {selectedAward.name}
                  </div>
                  <div className={style.overlay_user_name}>{student.name}</div>
                  <div className={style.overlay_award_date}>
                    {selectedAward.date}
                  </div>
                </div>
                {/* <button
                  className={style.close_button}
                  onClick={() => setSelectedAward(null)}>
                  <Image
                    src="/src/images/delete-icons/x_white.svg"
                    alt="Close"
                    width={24}
                    height={24}
                  />
                </button> */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// 챌린지(영어 독서왕 시상) 어워드 > 어워드 아이템
function ChallengeAwardItem({
  awardImgSrc,
  awardName,
  awardGetDate,
  onImageClick,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
  onImageClick: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.challenge_award_item} onClick={onImageClick}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={style.award_image_bg}></div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_l1}>{awardName}</div>
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}
