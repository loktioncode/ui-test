'use client'
import { data } from '@/constants'
import Image from 'next/image'
import { Badge } from './badge'

export default function Filters() {

  const appData = data?.data?.oneClickAutomations?.items

  console.log("{}>>>>>", appData)


  return (
    <div className='flex flex-col overflow-x-auto'>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="outline">Badge</Badge>

    </div>
  )
}
