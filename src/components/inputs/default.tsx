import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
	label: string
	state: string
	setState: Dispatch<SetStateAction<string>>
	className?: string
}

const DefaultInputs = ({ label, state, setState, className }: IProps) => {
	return (
		<div className={`flex flex-col gap-y-[0.87rem] text-left ${className}`}>
			<label className='label-in-register' htmlFor=''>
				{label}
			</label>
			<input
				onChange={e => setState(e.target.value)}
				value={state}
				name='username'
				className='reg-inputs'
				type='text'
			/>
		</div>
	)
}

export default DefaultInputs
