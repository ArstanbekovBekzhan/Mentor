import { changePassword } from '@/redux/apiCalls'
import AbsoluteImages from '@/components/absoluteImages'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { INewPassword } from '@/types/types'
import React, { useState } from 'react'
import Layout from '@/components/layout/Layout'

const ChangePassword = () => {
	const [isVisOldPass, setIsVisOldPass] = useState<boolean>(false)
	const [isVisNewPassConf, setIsVisNewPassConf] = useState<boolean>(false)
	const [old_password, setOld_password] = useState<string>('')
	const [new_password, setNew_password] = useState<string>('')
	const [new_pass_confirm, setNew_pass_confirm] = useState<string>('')
	// const [passValid, setPassValid] = useState<boolean>(true)

	const { tokens } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	function handleChange() {
		if (
			!old_password.trim() ||
			!new_password.trim() ||
			!new_pass_confirm.trim()
		) {
			alert('Some inputs are empty')
			return
		}

		const newPassword: INewPassword = {
			old_password,
			new_password,
			new_pass_confirm,
		}

		changePassword(dispatch, newPassword, tokens?.access)
	}

	return (
		<Layout>
			<div className='relative overflow-hidden text-center mb-44'>
				<AbsoluteImages />
				<div className=''>
					<h1>Изменить пароль</h1>
					<form
						onSubmit={e => e.preventDefault()}
						className='flex flex-col gap-y-7 mx-auto w-[35.6rem]'
					>
						<div className='flex flex-col gap-y-3 text-start'>
							<label htmlFor='' className='text-little-text text-lg'>
								Введите старый пароль
							</label>
							<input
								onChange={e => setOld_password(e.target.value)}
								value={old_password}
								name='password'
								className='reg-inputs'
								type={isVisOldPass ? 'text' : 'password'}
							/>
							<p
								className='pass-vis'
								onClick={() => setIsVisOldPass(!isVisOldPass)}
							>
								показать пароль
							</p>
						</div>
						<div className='flex flex-col gap-y-3 text-start'>
							<label htmlFor='' className='text-little-text text-lg'>
								Введите новый пароль
							</label>
							<input
								onChange={e => setNew_password(e.target.value)}
								value={new_password}
								name='password'
								className='reg-inputs'
								type={isVisNewPassConf ? 'text' : 'password'}
							/>
						</div>
						<div className='flex flex-col gap-y-3 text-start'>
							<label htmlFor='' className='text-little-text text-lg'>
								Подтвердите новый пароль
							</label>
							<input
								onChange={e => setNew_pass_confirm(e.target.value)}
								value={new_pass_confirm}
								name='password'
								className={`reg-inputs`}
								type={isVisNewPassConf ? 'text' : 'password'}
							/>
							<p
								className='pass-vis'
								onClick={() => setIsVisNewPassConf(!isVisNewPassConf)}
							>
								показать пароль
							</p>
						</div>
						<button
							className='px-20 py-4 bg-little-text hover:bg-tertiary active:bg-active hover:duration-150 duration-200 hover:text-little-text rounded-xl mx-auto font-semibold text-white'
							onClick={handleChange}
						>
							Изменить
						</button>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default ChangePassword
