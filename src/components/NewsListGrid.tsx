import { useRouter } from 'next/navigation'

export default function NewsListGrid() {
  const router = useRouter()
  const toNewsDetail = (id: string) => {
    router.push(`/news/${id}`)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            toNewsDetail(i.toString())
          }}
        >
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-2">10월 {12 - i}일</p>
            <h3 className="font-semibold mb-2">
              산림·토양 유형별 무척추동물 태풍 피해 큰 차이
            </h3>
            <p className="text-sm text-gray-600">
              태풍(열대성 저기압)으로 인한 토양 무척추동물 피해 정도가 산림
              유형과 토양종에 따라 달라질 수 있다는 연구결과가 나왔다. 토양
              무척추동물은 산림 생...
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
