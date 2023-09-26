import { forgotPassword, login, restorePassword } from '@/redux/apiCalls'
import AbsoluteImages from '@/components/absoluteImages'
import { useAppDispatch } from '@/hooks/hooks'
import { IPassToRestore } from '@/types/types'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'

const PasswordRestore = () => {
	const [isVisPass, setIsVisPass] = useState<boolean>(false)
	const [isVisPassConf, setIsVisPassConf] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [emailValid, setEmailValid] = useState<boolean>(false)
	const [code, setCode] = useState<string>('')
	const [new_password, setNew_password] = useState<string>('')
	const [new_pass_confirm, setNew_pass_confirm] = useState<string>('')

	const [error, setError] = useState<boolean>(false)

	const dispatch = useAppDispatch()

	const router = useRouter()

	function handleSend() {
		if (!email.trim()) {
			alert('Some inputs are empty')
			return
		}

		const user = {
			email,
		}

		forgotPassword(dispatch, user, setEmailValid)
	}

	function handleRestore() {
		// if (
		// 	!email.trim() ||
		// 	!code.trim() ||
		// 	!new_password.trim() ||
		// 	!new_pass_confirm.trim()
		// ) {
		// 	return
		// }

		const user: IPassToRestore = {
			email,
			code,
			new_password,
			new_pass_confirm,
		}

		const userToLogin = {
			email,
			password: new_pass_confirm,
		}

		setError(true)

		restorePassword(dispatch, user, setError)
		if (!error) {
			login(dispatch, userToLogin, router)
		}
	}

	return (
		<Layout>
			<div className='relative overflow-hidden text-center mb-44'>
				<AbsoluteImages />
				<div className=''>
					<h1>Восстановление пароля</h1>
					<form
						onSubmit={e => e.preventDefault()}
						className='flex flex-col gap-y-7 mx-auto w-[35.6rem]'
					>
						<div className='flex flex-col gap-y-7'>
							<div className='flex flex-col gap-y-3 text-start'>
								<label
									htmlFor=''
									className='text-little-text text-lg text-start'
								>
									Email
								</label>
								<input
									onChange={e => setEmail(e.target.value)}
									value={email}
									name='email'
									// placeholder='Email'
									className='reg-inputs w-full'
									type='text'
								/>
							</div>
							<button
								onClick={() => {
									handleSend()
								}}
								className={`px-[4.8rem] mb-40 py-4 rounded-xl text-white text-xl text-center bg-little-text hover:text-little-text hover:bg-tertiary active:bg-active hover:duration-150 duration-200 mx-auto ${
									emailValid ? 'hidden' : ''
								} `}
							>
								Отправить
							</button>
						</div>
						<div
							className={`${emailValid ? '' : 'hidden'} flex flex-col gap-y-7`}
						>
							<div className='flex flex-col gap-y-3 text-start'>
								<label
									htmlFor=''
									className='text-little-text text-lg text-start'
								>
									Введите код подтверждения
								</label>
								<input
									onChange={e => setCode(e.target.value)}
									value={code}
									name='code'
									className='reg-inputs w-full'
									type='text'
								/>
							</div>
							<div className='flex flex-col gap-y-3 text-start'>
								<label htmlFor='' className='text-little-text text-lg'>
									Введите новый пароль
								</label>
								<input
									onChange={e => setNew_password(e.target.value)}
									value={new_password}
									name='password'
									// placeholder='Password'
									className='reg-inputs'
									type={isVisPass ? 'text' : 'password'}
								/>
								<p
									className='pass-vis'
									onClick={() => setIsVisPass(!isVisPass)}
								>
									показать пароль
								</p>
							</div>
							<div className='flex flex-col gap-y-3 text-start'>
								<label htmlFor='' className='text-little-text text-lg'>
									Повторите пароль
								</label>
								<input
									onChange={e => setNew_pass_confirm(e.target.value)}
									value={new_pass_confirm}
									name='password'
									className='reg-inputs'
									type={isVisPassConf ? 'text' : 'password'}
								/>
								<p
									className='pass-vis'
									onClick={() => setIsVisPassConf(!isVisPassConf)}
								>
									показать пароль
								</p>
							</div>
							<button
								onClick={handleRestore}
								className='px-[4.8rem] mx-auto py-4 rounded-xl text-white text-xl text-center bg-little-text hover:text-little-text hover:bg-tertiary active:bg-active hover:duration-150 duration-200'
							>
								{/* Войти */}
								Войти
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default PasswordRestore
