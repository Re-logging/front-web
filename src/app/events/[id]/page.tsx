import EventSideBarArticle from '@/components/EventSideBarArticle'
import HomeButton from '@/components/HomeButton'
import Image from 'next/image'

export default function EventDetailPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeButton />
      <div className="flex gap-1">
        <span className="text-1l text-gray-400 mb-4">일회성</span>
        <span className="text-1l text-gray-400 mb-4">봉사시간 부여</span>
      </div>
      <h1 className="text-3xl font-bold mb-4">
        2024 제로해 플로깅 (양재천 중심)
      </h1>
      <div className="text-sm text-gray-500 mb-4">참여: 양재도서관</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          <Image
            src="https://picsum.photos/200/300"
            alt="Plogging event main image"
            width={600}
            height={400}
            className="w-full rounded-lg mb-4"
          />
          <div className="p-4 rounded-lg mb-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여기간:
              </span>
              2024-10-01 - 2024-11-30
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여대상:
              </span>
              누구나
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여방법:
              </span>
              양재천 ~ 양재천 일대를 걸으며 쓰레기(플로깅)
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여시간:
              </span>
              롤로깅 구조 (자갈, 잔디, 록타운)
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여비용:
              </span>
              필수이용 시간 24시간 부여
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여문의:
              </span>
              www.relogging.com
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                참여장소:
              </span>
              양재천
            </div>
            <div>
              <span className="bg-emerald-400 border border-green- text-white font-semibold">
                전화번호:
              </span>
              010-7531-5522
            </div>
          </div>
          <div className="prose max-w-none text-sm">
            <p>
              중고 제품 이용하고 연 쓰는 재활용 빈 용안 분들과 나누어 쓰기 위해
            </p>
            <p>
              2024 자원봉사박람회 - 순환하는V페스티벌 - 롤 개최될 예정인데요~
            </p>
            <p>
              재사용 특화와 자원순환 실천을 유도하는 축제를 인증 자원봉사로
              진행하고자 하니
            </p>
            <p>나에게 꼭 필요한 물건 같 가져와 특별하시고,</p>
            <p>상현 역지를 함께 다져보아요!</p>
            <p className="font-semibold mt-4">
              -참여조건: 누구나(자원봉사희망자 참여자)
            </p>
            <p>-행사일자: '24.10.12.(토) 13:1~17시</p>
            <p>
              -활동내용 : 자원순환박람회에 올고 물품 구매하는 재사용 물품
              캠페인에 참여
            </p>
            <p className="font-semibold mt-4">-필수 제출 자료</p>
            <p>
              1) 사진 예 3 (박람회 현장 운영부스에서 자원순환 피켓들고 사진 /
              구입 물건 들고 찍은 본인 인증 사진 / 구매 확인 스티커 붙은 리플렛
              사진)
            </p>
            <p>2) 자원순환 실천내역 및 다짐 등 작성</p>
            <p className="font-semibold mt-4">-증빙자료 제출 방법 및 절차</p>
            <p>1) 활동인증 1건 인정</p>
            <p>
              2) 네이버 폼 https://naver.me/xpraj3q4 에 자료 업로드 후 제출 또는
            </p>
            <p>현장에서 사진 촬영, 우기 메시지 작성</p>
            <p className="font-semibold mt-4">
              -문의사항: 031-394-1365 기획홍보팀
            </p>
            <p className="text-xs">
              ※ 시간인증은 이니셜 활동인증입니다.(1365포털에서 활동인증 인증서
              출력 가능)
            </p>
          </div>
          <div className="mt-8">
            <button className="w-full text-center">참여하기</button>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">서울</h2>
          {/* 이벤트 사이드바 아티클 컴포넌트 */}
          {[...Array(5)].map((index) => (
            <EventSideBarArticle key={index} />
          ))}
        </section>
      </div>
    </div>
  )
}
