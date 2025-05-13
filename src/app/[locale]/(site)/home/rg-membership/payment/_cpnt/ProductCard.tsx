'use client'

import RgFormat from '@/app/rgformat'
import useTranslation from '@/localization/client/useTranslations'
import { VIETNAMESE } from '@/localization/localize-config'
import { Product } from '@/repository/client/object/purchase-product'
import { useStyle } from '@/ui/context/StyleContext'

export default function ProductCardList({
  STYLE_ID,
  currency = 'KRW',
  product = [],
  activeId,
  onProductClick,
}: {
  STYLE_ID: string
  currency?: string
  product?: Product[]
  activeId?: string
  onProductClick?: (id: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <div className={style.product_list}>
      <div className={style.section_title}>
        {/* 상품 선택 */}
        {t('t689')}
      </div>
      <div className={style.cards}>
        {product?.map((item) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              STYLE_ID={STYLE_ID}
              currency={currency}
              active={activeId === item.id}
              day={item.value}
              title={item.name}
              originalPrice={item.fee}
              finalPrice={item.totalFee}
              onProductClick={onProductClick}
              isDiscount={true}
              eventPrice={30000000}
              eventGiftText="+ 5 quyển workbook"
            />
          )
        })}
      </div>
    </div>
  )
}

function ProductCard({
  STYLE_ID,
  id,
  currency,
  active,
  day,
  title,
  originalPrice,
  finalPrice,
  onProductClick,
  isDiscount,
  eventPrice,
  eventGiftText,
}: {
  STYLE_ID: string
  id: string
  currency: string
  active: boolean
  day: number
  title: string
  originalPrice: number
  finalPrice: number
  onProductClick?: (id: string) => void
  isDiscount?: boolean
  eventPrice?: number
  eventGiftText?: string
}) {
  // @Language 'common'
  const { t, i18n } = useTranslation()
  const language = i18n.language

  let productTitle = title
  if (
    language === VIETNAMESE &&
    (id === 'rg.1m.nonsub' || id === 'rg.1m.nonsub0')
  ) {
    productTitle = `Gói 1 tháng`
  }

  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.product_card} ${active && style.active}`}
      onClick={() => {
        onProductClick && onProductClick(id)
      }}>
      {isDiscount && (
        <div className={style.discount_label}>
          <img
            src="/src/images/@rg-membership/img-vn_discount_label.png"
            alt=""
            width={80}
            draggable="false"
          />
        </div>
      )}
      <div className={style.tag}>{t('t052', { num: day })}</div>
      {/* <div className={style.title}>{productTitle}</div> */}
      <div
        className={style.original_price}
        style={{ opacity: originalPrice === finalPrice ? 0 : 1 }}>
        {RgFormat.toNumberMoneyString(originalPrice, currency)}
      </div>
      <div className={`${style.final_price} ${isDiscount && style.discount}`}>
        {RgFormat.toNumberMoneyString(finalPrice, currency)}
      </div>
      {isDiscount && (
        <div className={style.event_message_box}>
          <div className={style.event_price}>
            {RgFormat.toNumberMoneyString(eventPrice, currency)}
          </div>
          <div className={style.event_gift_text}>{eventGiftText}</div>
        </div>
      )}
    </div>
  )
}
