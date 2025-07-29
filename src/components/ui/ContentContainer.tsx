import React from 'react'

export default function ContentContainer({children, className=""}: {children: React.ReactNode, className?: string}) {
  return (
    <div className={`content-layout w-100 ${className}`}>
        {children}
    </div>
  )
}
