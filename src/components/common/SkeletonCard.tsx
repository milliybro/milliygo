import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      <div className="h-[185px] w-full rounded-[16px] bg-[#E5E7EB]" />
      <div className="flex flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-[#E5E7EB]" />
        <div className="h-4 w-1/2 rounded bg-[#E5E7EB]" />
      </div>
    </div>
  )
}

export default SkeletonCard
