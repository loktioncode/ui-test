'use client'
import { FilteredDataContext } from '@/lib/data-context';
import { Automation } from '@/lib/types';
import React, { useContext } from 'react';


function AppGrid({ data }: {
  data: Automation[]
}) {
  const { filteredData } = useContext(FilteredDataContext);

  console.log(">>RESULT>>DATA>>", filteredData)

  return (
    <div className={`flex flex-row`}>

      <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">


        {
          filteredData.map((item: Automation, index: number) => (
            <a
              key={index}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Deploy{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Instantly deploy your Next.js site to a shareable URL with Vercel.
              </p>
            </a>
          ))
        }


      </div>
    </div>
  );
}

export default AppGrid;
