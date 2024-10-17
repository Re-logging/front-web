'use client'

import EventListGrid from '@/components/EventListGrid'
import NewsListGrid from '@/components/NewsListGrid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('환경 뉴스')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 네비게이션 바 */}

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-4">Relogging</h1>
          <p className="text-center text-gray-600 mb-4">
            가까운 곳에서 열리는
            <br />
            플로깅 모임과 환경 뉴스를
            <br />
            실시간으로 만나보세요!
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 p-4 rounded">
                엑션버튼
              </div>
            ))}
          </div>
        </div>
        {/* 탭 섹션 */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                activeTab === '환경 뉴스'
                  ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                  : ''
              }`}
              onClick={() => setActiveTab('환경 뉴스')}
            >
              환경 뉴스
            </button>
            <button
              className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                activeTab === '지자체 행사'
                  ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                  : ''
              }`}
              onClick={() => setActiveTab('지자체 행사')}
            >
              지자체 행사
            </button>
          </div>
          {/* 뉴스 그리드 */}
          {activeTab === '환경 뉴스' && <NewsListGrid />}
          {/* 지자체 행사 그리드 */}
          {activeTab === '지자체 행사' && <EventListGrid />}
          {/* )} */}
        </div>
      </main>
    </div>
  )
}
