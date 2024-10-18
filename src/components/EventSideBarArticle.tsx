import Image from 'next/image'
import React from 'react'

const EventSideBarArticle = () => {
  return (
    <div className="mb-4">
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">봉사종류</p>
        <h3 className="font-bold">지구살리기 캠페인 - 양산시자원봉사센터</h3>
        <div className="text-xs text-gray-500 mb-2 flex justify-between">
          <p>양산시 자원봉사센터</p>
          <p>조회수 102</p>
        </div>
        <Image
          src="https://picsum.photos/100/100"
          alt="Campaign image"
          width={100}
          height={50}
          className="w-full rounded-lg mt-2"
        />
      </div>
    </div>
  )
}

export default EventSideBarArticle
