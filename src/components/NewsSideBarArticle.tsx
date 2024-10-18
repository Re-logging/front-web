import Image from 'next/image'
import React from 'react'

const NewsSideBarArticle = () => {
  return (
    <div className="border-t pt-4">
      <p className="text-sm text-gray-500 mb-1">10월 12일</p>
      <h2 className="font-semibold mb-2">
        산림·토양 유형별 무척추동물 태풍 피해 큰 차이
      </h2>
      <div className="flex">
        <p className="text-sm text-gray-700">
          태풍(열대성 저기압)으로 인한 토양 무척추동물 피해 정도가 산림 유형과
          토양층에 따라 달라질 수 있다는 연구결과가 나왔다. 토양 무척추동물들은
          산림 생태계 교란에 민감...
        </p>
        <Image
          src="https://picsum.photos/100/100"
          alt="ChatGPT icon"
          width={50}
          height={50}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default NewsSideBarArticle
