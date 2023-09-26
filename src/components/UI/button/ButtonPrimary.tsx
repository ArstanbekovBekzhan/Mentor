import { IChildren } from '@/types/types'
import React, { FC } from 'react'

interface ILimit extends IChildren {
	onClick: (prev: number) => void
}

const ButtonPrimary: FC<ILimit> = ({ children, onClick }) => {
	return (
		<button
			onClick={() => onClick(3)}
			className='bg-little-text py-2 rounded-[9px] px-5 text-white'
		>
			{children}
		</button>
	)
}

export default ButtonPrimary
