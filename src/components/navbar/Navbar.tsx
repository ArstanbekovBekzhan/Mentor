import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/images/Logo.svg'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getUser, tokenRefresh } from '@/redux/apiCalls'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
	const { tokens, currentUser } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const [status, setStatus] = useState(0)
	const [error, setError] = useState<boolean>(false)

	const { push } = useRouter()

	useEffect(() => {
		getUser(dispatch, tokens.access, setError, setStatus)
	}, [dispatch, tokens.access])

	// useEffect(() => {
	// 	if (error) {
	// 		logout(dispatch)
	// 	}
	// }, [error, dispatch])

	useEffect(() => {
		if (status == 401) {
			tokenRefresh(dispatch, { refresh: tokens.refresh }, setStatus)
		}
	}, [dispatch, status, tokens.refresh])

	return (
		<nav className='w-full desktop:w-[1440px] m-auto py-8 flex justify-between px-20 my-4'>
			<div className=''>
				<Image
					src={Logo}
					alt='logo'
					className='cursor-pointer'
					priority
					onClick={() => push('/')}
				/>
			</div>
			{currentUser ? (
				<Image
					src={currentUser.photo}
					alt={currentUser.email ? currentUser.email[0].toUpperCase() : 'Logo'}
					className='object-cover rounded-full w-16 h-16 cursor-pointer'
					width={64}
					height={64}
					priority
					onClick={() => push(`/profile/my-profile?t=${tokens.access}`)}
				/>
			) : (
				<div className='flex gap-x-9'>
					<Link href={'/account/register/'}>
						<button className='font-medium text-title text-base px-3 py-2 rounded-xl text-dark-blue text-center bg-accent'>
							Стать ментором
						</button>
					</Link>
					<Link href='/account/login/'>
						<button className='font-medium px-8 py-2 rounded-xl text-black text-base text-center bg-tertiary'>
							Войти
						</button>
					</Link>
				</div>
			)}
		</nav>
	)
}

export default Navbar
