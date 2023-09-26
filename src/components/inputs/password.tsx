import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
	label: string
	state: string
	setState: Dispatch<SetStateAction<string>>
	passVis: boolean
	setPassVis: Dispatch<SetStateAction<boolean>>
}

const PasswordInputs = ({
	label,
	state,
	setState,
	passVis,
	setPassVis,
}: IProps) => {
	return (
		<div className='flex flex-col gap-y-[0.87rem]'>
			<label className='label-in-register text-left' htmlFor=''>
				{label}
			</label>
			<input
				value={state}
				onChange={e => setState(e.target.value)}
				name='password'
				className='reg-inputs'
				type={passVis ? 'text' : 'password'}
			/>
			<p className='pass-vis' onClick={() => setPassVis(!passVis)}>
				показать пароль
			</p>
		</div>
	)
}

export default PasswordInputs
