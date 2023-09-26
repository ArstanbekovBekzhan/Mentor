import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Footer = () => {
	const { pathname } = useRouter()

	return (
		<div
			className={`w-full flex flex-col py-[3.63rem] justify-center items-center
			${pathname !== '/' ? 'bg-[#E3F6F5]' : 'bg-white'}`}
		>
			<p className='text-center text-little-text mb-[4.4rem]'>
				{' '}
				Правильный разговор прояснит ситуацию лучше, чем десять <br /> часов
				поисков в интернете.{' '}
			</p>
			<div className='flex gap-x-[6.44rem]'>
				<Link className='underline hover:text-little-text' href={''}>
					Найти ментора
				</Link>
				<Link className='underline hover:text-little-text' href={''}>
					Стать ментором
				</Link>
			</div>
		</div>
	)
}

export default Footer
