import { IChildren } from '@/types/types'
import React, { FC } from 'react'

const Button: FC<IChildren> = ({ children }) => {
	return (
		<button className='font-medium text-xl bg-accent w-2/5 py-7 rounded-lg mb-52'>
			{children}
		</button>
	)
}

export default Button
