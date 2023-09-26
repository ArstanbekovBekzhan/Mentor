import { usePathname } from 'next/navigation'
import React from 'react'

const AbsoluteImages = () => {
	const pathname = usePathname()

	return (
		<>
			<img
				className='absolute -z-1 -left-[10.2rem]'
				src={
					pathname == '/account/register'
						? '/images/2 Creative run 1.png'
						: '/images/2 Creative run 1-1.png'
				}
				alt=''
			/>
			<img
				className='absolute -z-1 -right-[9rem]'
				src={
					pathname == '/account/register'
						? '/images/6 progress 2.png'
						: '/images/6 progress 2-1.png'
				}
				alt=''
			/>
		</>
	)
}

export default AbsoluteImages
