'use client'

import AppGrid from '@/components/appGrid'
import Filters from '@/components/ui/filters'
import { data } from '@/constants'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export default function Home() {
  const outerContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollAmount: number) => {
    if (outerContainerRef.current) {
      const newScrollLeft = outerContainerRef.current.scrollLeft + scrollAmount;
      outerContainerRef.current.scrollLeft = newScrollLeft;
    }
  };

  return (
    <main className="flex flex-col items-center p-4 lg:p-24">
      <div className="max-w-5xl w-full text-center lg:flex justify-between">
        <a
          href="https://github.com/loktioncode/ui-test"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-b pb-6 pt-8 dark:from-inherit"
        >
          <p className="border-b border-gray-300 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Clone Repo & run&nbsp;
            <code className="font-mono font-bold">yarn install</code>
          </p>
        </a>

        <div className="bg-gradient-to-t  lg:bg-none lg:static lg:w-auto lg:justify-end">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex place-items-center gap-2 lg:p-0 text-xl font-semibold"
          >
            FE Developer Interview Challenge{' '}
         
          </a>
        </div>
      </div>
      <div className='my-10 flex flex-row items-center'>
        <div className="lg:hidden cursor-pointer" onClick={() => handleScroll(200)}>
          <ArrowLeftCircle />
        </div>
        <Filters data={data?.data?.oneClickAutomations?.items} />
        <div className="lg:hidden cursor-pointer" onClick={() => handleScroll(200)}>
          <ArrowRightCircle className='text-red' />
        </div>
      </div>
      <AppGrid data={data?.data?.oneClickAutomations?.items} />
    </main>
  )
}
