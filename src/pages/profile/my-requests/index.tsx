/* eslint-disable no-mixed-spaces-and-tabs */
import LayoutAccount from '@/components/layout/LayoutAccount'
import MentorStatus from '@/components/mentor/MentorStatus'
import React, { useEffect, useState } from 'react'
import { getPersonalUser, getRequest } from '@/redux/apiCalls'
import { useAppSelector } from '@/hooks/hooks'
import { IRequest } from '@/types/types'
import WelcomeModal from '@/components/modal/WelcomeModal'
import TelegramModal from '@/components/modal/TelegramModal'
import { useRouter } from 'next/router'
import { IMentor } from '@/types/mentor.interface'

const MyRequests = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [flag, setFlag] = useState<boolean>(true)
	const token = useAppSelector(state => state.user.tokens)
	const [requests, setRequests] = useState<IRequest[]>([])
	const [user, setUser] = useState<IMentor | null>(null)
	useEffect(() => {
		getRequest(token.access).then(data => setRequests(data))
		getPersonalUser(token.access, setUser)
	}, [token.access])
	const requestsNew: IRequest[] = requests.filter(
		request => !request.accepted && !request.denied
	)
	const requestsAccepted: IRequest[] = requests.filter(
		request => request.accepted
	)

	const [telegramModal, setTelegramModal] = useState<boolean>(false)
	const { push } = useRouter()
	return (
		<LayoutAccount>
			{user?.telegram_status ? (
				<></>
			) : (
				<WelcomeModal setTelegramModal={setTelegramModal} />
			)}
			{telegramModal ? (
				<TelegramModal
					telegramModal={telegramModal}
					setTelegramModal={setTelegramModal}
				/>
			) : (
				<></>
			)}
			<div className='w-full flex justify-between'>
				<div className='w-full flex flex-col items-center px-[80px]'>
					<div className='flex space-x-8 text-[1.45rem] text-[#485174CC] -mt-10 font-semibold mb-20'>
						<h3
							className={`${flag ? 'text-[#FFD803]' : ''} cursor-pointer`}
							onClick={() => setFlag(true)}
						>
							Новые заявки
						</h3>
						<h3
							className={`${!flag ? 'text-[#FFD803]' : ''} cursor-pointer`}
							onClick={() => setFlag(false)}
						>
							Принятые заявки
						</h3>
					</div>
					<div className='w-full'>
						{flag ? (
							<div>
								{requestsNew.length ? (
									<hr className='bg-[#9B999980] w-full h-[2px]' />
								) : (
									<h2 className='text-center'>Нет новых заявок</h2>
								)}
								{requestsNew?.map(request => (
									<div
										key={request.id}
										onClick={() => push(`/profile/my-requests/${request.id}`)}
									>
										<div className='w-full flex justify-between items-center cursor-pointer'>
											<p className='text-accent text-lg'>New</p>
											<div className='py-3 w-[25rem]'>
												<h6 className='text-lg font-semibold text-title mb-[6px]'>
													Новая заявка
												</h6>
												<p className='text-[#485174CC] text-sm'>
													Ознакомьтесь и дайте ответ (в независимости
													положительный/отрицательный) в течение 72 часов
												</p>
											</div>
											<p className='text-[#485174CC] text-sm'>
												{request.create_at.substring(0, 10)}
											</p>
										</div>
										<hr className='bg-[#9B999980] w-full h-[2px]' />
									</div>
								))}
							</div>
						) : (
							<div>
								{requestsAccepted.length ? (
									<hr className='bg-[#9B999980] w-full h-[2px]' />
								) : (
									<h2 className='text-center'>Нет принятых заявок</h2>
								)}
								{requestsAccepted?.map(request => (
									<div
										key={request.id}
										onClick={() => push(`/profile/my-requests/${request.id}`)}
									>
										<div className='w-full flex justify-between items-center p-5 cursor-pointer'>
											<div className='flex justify-between w-[17rem]'>
												<p className='text-title text-lg'>{request.name}</p>
												<button className='bg-secondary px-[9px] py-[4px] rounded-[3px] text-title text-sm'>
													{request.my_level}
												</button>
											</div>
											<p className='text-[#485174CC] text-sm'>
												{request.create_at.substring(0, 10)}
											</p>
										</div>
										<hr className='bg-[#9B999980] w-full h-[2px]' />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div>
					<MentorStatus />
				</div>
			</div>
		</LayoutAccount>
	)
}

export default MyRequests
