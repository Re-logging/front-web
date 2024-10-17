import HomeButton from '@/components/HomeButton'
import NewsSideBarArticle from '@/components/NewsSideBarArticle'
import Image from 'next/image'

export default function NewsArticlePage() {
  return (
    <article className="flex m-auto w-4/5 gap-6">
      <div className="max-w-4xl mx-auto p-4 font-sans">
        <HomeButton />
        <header className="mb-6">
          {/* 뉴스 헤드라인 */}
          <h1 className="text-2xl font-bold mb-2">
            산림·토양 유형별 무척추동물 태풍 피해 큰 차이
          </h1>
          {/* 뉴스 정보 */}
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">이투데이</p>
            <p className="text-sm text-gray-500">
              조회수 102 · 2024-10-10 10:22AM 발행
            </p>
          </div>
        </header>

        <main>
          <div className="relative mb-6">
            <Image
              src="https://picsum.photos/200/200"
              alt="Article main image"
              width={200}
              height={200}
              className="w-full h-auto"
            />
            <div className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full p-2">
              {/* <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" /> */}
            </div>
          </div>
          {/* 뉴스 썸네일 설명 */}
          <p className="mb-6 text-sm text-gray-500">
            사업장폐기물을 마대에 담아 하천변에 쌓아둔 현장 사진
          </p>

          <div className="flex flex-col">
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex items-center mb-2">
                <Image
                  src="https://picsum.photos/200/300"
                  alt="ChatGPT icon"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <span className="font-semibold">ChatGPT</span>
              </div>
              <p className="text-sm">AI가 기사를 이해한 뒤이 설명했어요.</p>
            </div>

            <p className="mb-6">
              1일 국제 학술지(SCIE) 포리스츠(Forests)의 특별호 '극단적인 기후
              현상이 산림에 미치는 영향'에 실린 논문 '태풍 시 산림 토양
              무척추동물 군집의 단기 반응'에 따르면, 태풍의 영향은 표토층(토양의
              맨 윗부분, topsoil layer)에 사는 무척추동물 보다 낙엽층(litter
              layer) 군집에 더 큰 영향을 미쳤다. 국제 학술지(SCIE)
              포리스츠(Forests)의 특별호 '극단적인 기후 현상이 산림에 미치는
              영향'에 실린 논문 '태풍 시 산림 토양 무척추동물 군집의 단기
              반응'에 따르면, 태풍의 영향은 표토층(토양의 맨 윗부분, topsoil
              layer)에 산다.
            </p>
            <button>기사 전문보기</button>
          </div>
        </main>
        <footer className="flex justify-between items-center border-t pt-4">
          <button className="flex items-center text-gray-600">
            {/* <ChevronLeftIcon className="h-5 w-5 mr-1" /> */}
            이전 기사 보기
          </button>
          <button className="flex items-center text-gray-600">
            다음 기사 보기
            {/* <ChevronRightIcon className="h-5 w-5 ml-1" /> */}
          </button>
        </footer>
      </div>
      <div>
        {/* 오른쪽 사이드 배너 */}
        <section className="space-y-4 mb-6">
          {[...Array(8)].map((_) => (
            <NewsSideBarArticle />
          ))}
        </section>
      </div>
    </article>
  )
}
