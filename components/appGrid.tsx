'use client'
import { FilteredDataContext } from '@/lib/data-context';
import { Automation } from '@/lib/types';
import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image'

function AppGrid({ data }: {
  data: Automation[]
}) {
  const { filteredData } = useContext(FilteredDataContext);


  return (


    <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-4">


      {
        filteredData.map((item: Automation, index: number) => (
          <div key={index} className="group rounded-lg border border-transparent  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Card className=''>
              <CardHeader >
                <Image
                  src={item?.sites[0]?.logoSmall2x}
                  alt="Vercel Logo"
                  className="p-2"
                  width={50}
                  height={30}
                  priority
                />
                <CardTitle className='text-lg font-bold text-black line-clamp-2'>
                  {item?.title}
                </CardTitle>

              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm line-clamp-3'>{item?.shortDescription
                }</CardDescription>
              </CardContent>

            </Card>
          </div>

        ))
      }


    </div>

  );
}

export default AppGrid;
