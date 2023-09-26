import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
	label: string
	state: string
	setState: Dispatch<SetStateAction<string>>
	isEdit?: boolean
}

const DefaultInputs = ({ label, state, setState, isEdit }: IProps) => {
	return (
		<div className='flex flex-col gap-y-[0.87rem] text-left'>
			<label className='label-in-register' htmlFor=''>
				{label}
			</label>
			<input
				disabled={isEdit ? false : true}
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
