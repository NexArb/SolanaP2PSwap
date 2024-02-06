import { CREW } from '@/constants'
import Image from 'next/image'
import React from 'react'

type CrewItemProps = Readonly<{
  name: string
  profileImage: string
  job: string
  icon1: string
  icon2: string
  icon3: string
}>

function CrewItem({
  name,
  job,
  icon1,
  icon2,
  icon3,
  profileImage
}: CrewItemProps) {
  return (
    <li className="flex w-full flex-1 flex-col items-start max-lg:p-10">
      <Image src={profileImage} alt="profile image" width={100} height={100} />
      <h2 className="mt-4 text-2xl font-medium leading-loose">{name}</h2>
      <p className="mt-1 leading-relaxed">{job}</p>
      <div className="mt-5 flex gap-8">
        <Image src={icon1} alt="socials" width={16} height={16} />
        <Image src={icon2} alt="socials" width={16} height={16} />
        <Image src={icon3} alt="socials" width={16} height={16} />
      </div>
    </li>
  )
}

function Crew() {
  return (
    <section className="flexCenter mb-72 mt-96 flex-col">
      <div className="text-center text-5xl font-bold">Startup Crew</div>
      <div className="mt-9 p-8 text-center text-2xl font-medium leading-loose lg:w-[754px]">
        The most important part of the Startup Framework is the samples. The
        samples form a set of 25 usable pages you can use as is or you can add
        new blocks from UI Kit.
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-20">
        {CREW.map((crew) => (
          <CrewItem
            key={crew.name}
            name={crew.name}
            profileImage={crew.profileImage}
            job={crew.job}
            icon1={crew.icon1}
            icon2={crew.icon2}
            icon3={crew.icon3}
          />
        ))}
      </div>
    </section>
  )
}

export default Crew
