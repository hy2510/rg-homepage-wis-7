'use client'

import StudentHistorySelectModal from '@/app/[locale]/(site)/library/_cpnt/StudentHistorySelectModal'
import useExport, {
  ExportAction,
  useSupportExportActionReport,
} from '@/app/[locale]/(site)/library/_fn/use-export'
import { openDownloadLink, openWindow } from '@/app/_function/open-window'
import useTranslation from '@/localization/client/useTranslations'
import NumberUtils from '@/util/number-utils'
import { useState } from 'react'
import { useHistoryStudy } from '@/client/store/history/study/selector'
import { EmptyMessage, PillItem, Pills } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { ReviewAssessmentReport } from '@/ui/modules/review-assessment-report/ReviewAssessmentReport'
import {
  DetailedReportItem,
  DetailedReportsList,
} from '@/ui/modules/review-detail-view-reports/review-detail-view-reports'

const STYLE_ID = 'page_review_view'

export default function ReadingList({
  isReportLoading,
  onMore,
}: {
  isReportLoading: boolean
  onMore?: () => void
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const [tab, setTab] = useState<'all' | 'passed' | 'failed'>('all')

  const historyStudy = useHistoryStudy().custom.payload
  const history = historyStudy.history
  const {
    totalCount: allCount,
    passCount: passedCount,
    failCount: failedCount,
    totalPoints: earnPoints,
    studyDays: passedDays,
  } = historyStudy.summary
  const hasMore = historyStudy.page.page < historyStudy.page.totalPages

  const list = history.filter((item) => {
    if (tab === 'passed') {
      return item.average >= 70
    } else if (tab === 'failed') {
      return item.average < 70
    } else {
      return true
    }
  })

  const [selectedBookInfo, setSelectBookInfo] = useState<string | undefined>(
    undefined,
  )

  const {
    isSelectMode,
    setSelectMode,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    targetStudentHistoryList,
    targetStudentHistoryId,
    onSelectStudentHistory,
    onExportCancel,
  } = useExport()

  const supportExportAction = useSupportExportActionReport()

  const [exportSelected, setExportSelected] = useState<
    ExportAction | undefined
  >(
    supportExportAction && supportExportAction.length > 0
      ? supportExportAction[0].action
      : undefined,
  )

  const downloadExcelUrl = allCount > 0 ? historyStudy.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      openDownloadLink(downloadExcelUrl)
    }
  }

  const performanceReportUrl = historyStudy.performanceReport
  const onPerformanceReportUrl = () => {
    if (performanceReportUrl) {
      openWindow(performanceReportUrl, {
        external: true,
        target: '_blank',
        feature: 'noopener, noreferrer',
      })
    }
  }

  const [isGridList, setIsGridList] = useState(true)

  // TODO : 개발용 Flag.  Export, Download 작업 개발:
  const isDevAction = false

  const t415 = t('t415')

  return (
    <>
      <div>
        <div className={style.study_days_count}>
          <div>
            {/* 학습일수 */} {t('t762')} : {passedDays}
          </div>
          <div className={style.change_list_type_menu}>
            <div
              className={`${style.grid_menu_button} ${isGridList && style.active}`}
              onClick={() => {
                setIsGridList(true)
              }}></div>
            <div
              className={`${style.list_menu_button} ${!isGridList && style.active}`}
              onClick={() => {
                setIsGridList(false)
              }}></div>
          </div>
        </div>
        <Pills>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              position: 'relative',
            }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <PillItem
                active={tab === 'all'}
                onClick={() => {
                  setTab('all')
                }}>
                {t('t412', { num: allCount })}
              </PillItem>
              <PillItem
                active={tab === 'passed'}
                onClick={() => {
                  setTab('passed')
                }}>
                {t('t416', {
                  num1: passedCount,
                  num2: NumberUtils.toRgDecimalPoint(earnPoints),
                })}
              </PillItem>
              <PillItem
                active={tab === 'failed'}
                onClick={() => {
                  setTab('failed')
                }}>
                {t('t414', { num: failedCount })}
              </PillItem>
            </div>
            {history.length !== 0 && !!performanceReportUrl && (
              <div
                className={style.performance_link}
                onClick={onPerformanceReportUrl}>
                Performance
              </div>
            )}
          </div>
        </Pills>
      </div>
      {!isReportLoading && list && list.length === 0 ? (
        <EmptyMessage>
          <div dangerouslySetInnerHTML={{ __html: t415 }}></div>
        </EmptyMessage>
      ) : (
        <DetailedReportsList isGridView={isGridList}>
          {list.map((book, i) => {
            const isCheckable = true
            const isChecked = isSelectedItem(book.studyId)
            const onCheckedChange = setItemSelectedChange

            const earnPoints = NumberUtils.toRgDecimalPoint(book.rgPoint)

            return (
              <DetailedReportItem
                key={`history_${book.completeDate}_${book.bookId}_${i}`}
                title={book.title}
                bookCode={book.levelName}
                isPassed={book.average >= 70}
                imgSrc={book.surfaceImagePath}
                studyDate={book.completeDate}
                totalScore={book.average}
                completedInfo={book.fullEasyName}
                earnPoints={earnPoints}
                onClick={() => {
                  setSelectBookInfo(book.studyId)
                }}
                studyId={book.studyId}
                studentHistoryId={book.studentHistoryId}
                levelRoundId={book.levelRoundId}
                isExportMode={isSelectMode}
                isExportChecked={isChecked}
                isExportCheckable={isCheckable}
                onExportCheckedChange={onCheckedChange}>
                {selectedBookInfo && selectedBookInfo === book.studyId && (
                  <ReviewAssessmentReport
                    studyId={book.studyId}
                    studentHistoryId={book.studentHistoryId}
                    levelRoundId={book.levelRoundId}
                    title={book.title}
                    bookImgSrc={book.surfaceImagePath}
                    bookCode={book.levelName}
                    studyDate={book.completeDate}
                    totalScore={book.average}
                    isPassed={book.average >= 70}
                    completedInfo={book.fullEasyName}
                    earnPoints={earnPoints}
                    onClickDelete={() => {
                      setSelectBookInfo(undefined)
                    }}
                  />
                )}
              </DetailedReportItem>
            )
          })}
        </DetailedReportsList>
      )}
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={targetStudentHistoryList}
          defaultStudentHistoryId={targetStudentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
      {/* <Pagination>
          <PaginationItem active={true}>1</PaginationItem>
        </Pagination> */}
      {hasMore && (
        <p className={style.more}>
          <button onClick={() => onMore && onMore()}>MORE</button>
        </p>
      )}
    </>
  )
}
