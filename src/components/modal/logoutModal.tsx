import { logout } from '@/redux/apiCalls'
import { useAppDispatch } from '@/hooks/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { StateProps } from '@/components/modal/writingModal'

const LogoutModal = ({ modal, setModal }: StateProps) => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	return (
		<div
			className={`${
				modal
					? 'z-1 opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-1 opacity-0'
			} w-full h-full bg-[rgba(179,179,179,0.4)] fixed top-0 flex duration-200 justify-center items-center`}
			onClick={() => setModal(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='w-[53.4rem] h-[23rem] text-center rounded-2xl bg-[#fffffe] py-32 px-36'
			>
				<h3 className='text-2xl text-paragraph font-semibold mb-8'>
					Действительно хотите выйти?
				</h3>
				<div className='flex justify-center gap-x-12'>
					<button
						onClick={() => {
							setModal(!true), (logout(dispatch), router.push('/'))
						}}
						className='bg-white border border-little-text px-14 py-3 hover:bg-tertiary hover:duration-200 duration-150 hover:text-black rounded-[0.63rem] text-lg text-little-text'
					>
						Выйти
					</button>
					<button
						onClick={() => {
							setModal(!true)
							// window.open('https://t.me/SaveYoutubeBot')
						}}
						className='bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200 px-14 py-3 rounded-[0.63rem] text-lg text-little-text'
					>
						Остаться
					</button>
				</div>
			</div>
		</div>
	)
}

export default LogoutModal
