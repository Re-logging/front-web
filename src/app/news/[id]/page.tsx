'use client'

import HomeButton from '@/components/HomeButton'
import { NewsArticleCard } from '@/types/INews'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import NewsCard from '@/components/NewsCard'
import { ContentsPagination } from '@/components/ContentsPagination'
import GptIcon from '@/assets/icon_gpt.svg'
import { useNewsQueries } from '@/hooks/useNewsQueries'

export default function NewsArticlePage() {
  const path = usePathname()
  const articleId = path.split('/').pop()
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 5 // 페이지 당 아이템 수

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  const {
    // 이벤트 디테일
    newsDetail,
    newsDetailError,
    newsDetailIsError,
    newsDetailIsLoading,

    //이벤트 페이지네이션
    newsList,
    // newsListError,
    // newsListIsError,
    newsListIsLoading,

    // 이전 이벤트, 다음 이벤트
    navigate,
    // isNavigating,
  } = useNewsQueries({
    currentPage,
    pageSize,
    articleId,
  })
  if (newsDetailIsLoading) return <div>loading ... </div>
  if (newsDetailIsError) return <div>Error: {newsDetailIsError}</div>
  const onChangeEventDetail = (type: 'prev' | 'next') => {
    if (!newsDetail?.id) return

    navigate(
      { type, currentId: newsDetail.id },
      {
        onError: (error: Error) => {
          console.log('error', error)
          // toast({
          //   title: '이동 실패',
          //   description: '이벤트 데이터를 불러오는데 실패했습니다.',
          //   variant: 'destructive',
          // })
        },
      },
    )
  }

  if (newsListIsLoading) return <div>Loading...</div>
  if (newsDetailIsError || !newsDetail)
    return <div>Error: {newsDetailIsError}</div>
  if (newsDetailError) return <div>Error: {newsDetailError.message}</div>
  // TODO article List 컴포넌트 분리하기
  return (
    <article className="flex m-auto max-h-[1355px] w-full  gap-6 max-w-7xl bg-white mt-16 p-5">
      <div className="mx-auto h-full flex flex-col gap-10">
        {/* 상단 제목  */}
        <div className="flex flex-col gap-10 w-full laptop:w-3/5">
          <HomeButton />
          <header className="mb-6">
            {/* 뉴스 헤드라인 */}
            <h1 className="text-2xl font-bold mb-2">{newsDetail?.title}</h1>
            {/* 뉴스 정보 */}
            <div className="flex justify-between">
              <p className="text-sm text-text font-semibold">
                {newsDetail?.source}
              </p>
              <p className="text-sm text-gray-500">
                조회수 {newsDetail?.hits} {newsDetail?.publishedAt} 발행
              </p>
            </div>
          </header>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
            {/* 왼쪽 섹션 (7/10) */}
            <section className="flex flex-col md:col-span-6 gap-10">
              <div className="relative mb-2">
                <Image
                  src={newsDetail?.imagePath}
                  alt="Article main image"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
                {/* 뉴스 썸네일 설명 */}
                <p className="mt-2 text-sm text-gray-500">
                  {newsDetail?.imageCaption}
                </p>
              </div>
              <div className="flex flex-col bg-background p-5 gap-4 rounded-lg">
                <div className="rounded-lg w-full">
                  <div className="flex items-center mb-6 gap-3">
                    <GptIcon />
                    <div>
                      <p className="font-semibold">ChatGPT</p>
                      <p className="text-sm text-textLight">
                        <span className="text-green">AI</span>가 기사를 아래와
                        같이
                        <span className="text-green"> 요약</span>
                        했어요.
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p>{newsDetail?.aiSummary}</p>
                  </div>
                  <div>
                    <Button
                      asChild
                      className="w-full bg-background text-textLight border"
                    >
                      <Link href={`/news/${newsDetail?.source}`}>
                        기사 전문 보기
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              {/* 하단 기사 버튼 */}
              <div className="flex justify-between items-center">
                <Button
                  className="bg-solid"
                  onClick={() => {
                    onChangeEventDetail('prev')
                  }}
                >
                  이전 기사 보기
                </Button>

                <Button
                  className="bg-solid"
                  onClick={() => {
                    onChangeEventDetail('next')
                  }}
                >
                  다음 기사 보기
                </Button>
              </div>
            </section>
            <div className="hidden md:flex md:col-span-1 justify-center">
              <div className="w-[1px] h-full bg-gray-200"></div>
            </div>
            <section className="hidden tablet:grid laptop:grid md:col-span-3 space-y-4 mb-6">
              {newsList?.newsArticleSimpleResponseList?.map(
                (article: NewsArticleCard) => (
                  <NewsCard article={article} key={article.id} />
                ),
              )}
              <div className="mt-6">
                <ContentsPagination
                  currentPage={currentPage}
                  totalPage={newsList?.totalPage ?? 0}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}