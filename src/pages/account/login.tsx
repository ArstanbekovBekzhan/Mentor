import { login } from '@/redux/apiCalls'
import AbsoluteImages from '@/components/absoluteImages'
import { IUserLog } from '@/types/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultInputs from '@/components/inputs/default'
import PasswordInputs from '@/components/inputs/password'
import Layout from '@/components/layout/Layout'

const LoginPage = () => {
	const [isVisPass, setIsVisPass] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const dispatch = useDispatch()

	const router = useRouter()

	function handleLogin() {
		if (!email.trim() || !password.trim()) {
			alert('inputs are empty')
			return
		}

		const user: IUserLog = {
			email,
			password,
		}

		login(dispatch, user, router)
	}

	return (
		<Layout>
			<div className='relative overflow-hidden text-center mb-44'>
				<AbsoluteImages />
				<div className=''>
					<h1>Добро пожаловать</h1>
					<form
						onSubmit={e => e.preventDefault()}
						className='flex flex-col gap-y-7 mx-auto w-[35.6rem]'
					>
						<DefaultInputs state={email} setState={setEmail} label='Email' />
						<PasswordInputs
							state={password}
							setState={setPassword}
							label='Введите пароль'
							passVis={isVisPass}
							setPassVis={setIsVisPass}
						/>
						<Link
							href={'/account/password/restore'}
							className='mb-[4.5rem] font-semibold underline hover:text-sky-600 w-36 text-left'
						>
							забыли пароль?
						</Link>
						<div className='flex justify-between'>
							<button
								onClick={() => {
									handleLogin()
								}}
								className='px-[4.8rem] py-4 rounded-xl text-white text-xl text-center bg-little-text hover:text-little-text hover:bg-tertiary active:bg-active hover:duration-150 duration-200'
							>
								Войти
							</button>
							<Link
								href={'/account/register'}
								// onClick={e => {
								// 	handleLogin(e)
								// }}
								className='px-[4.8rem] py-4 rounded-xl text-dark-blue text-xl text-center bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200'
							>
								Стать ментором
							</Link>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default LoginPage
