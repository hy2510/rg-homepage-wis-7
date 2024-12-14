import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'
import { getPost } from './resources'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <RgNewsPostBoard post={getPost()}>{children}</RgNewsPostBoard>
}
