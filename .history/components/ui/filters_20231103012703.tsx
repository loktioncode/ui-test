'use client'
import { data } from '@/constants'
import Image from 'next/image'

export default function Filters() {

  const appData = data?.data?.oneClickAutomations?.items

  console.log("{}>>>>>", appData)


  return (
    <div className='flex flex-row overflow-x-auto'>
       
    </div>
  )
}
