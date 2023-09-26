/* eslint-disable no-mixed-spaces-and-tabs */
import { pages } from '@/arrays/arrays'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/hooks'
import { useRouter } from 'next/router'
import LogoutModal from './modal/logoutModal'
import { getRequest } from '@/redux/apiCalls'
import { IRequest } from '@/types/types'

const SideBar = () => {
	const [modal, setModal] = useState<boolean>(false)
	const [requests, setRequests] = useState<IRequest[]>([])
	const { tokens } = useAppSelector(state => state.user)

	const { pathname, push } = useRouter()
	useEffect(() => {
		getRequest(tokens.access).then(data => setRequests(data))
	}, [tokens.access])

	function handleLogout() {
		setModal(true)
	}

	let requestsNew: IRequest[] = []

	requests?.length !== 0
		? (requestsNew = requests?.filter(
				request => !request.accepted && !request.denied
		  ))
		: null

	return (
		<>
			<LogoutModal modal={modal} setModal={setModal} />
			<div
				className={`w-72 py-[4.6rem] bg-secondary rounded-[0.63rem] ${
					pathname === '/profile/my-requests' ? '' : 'fixed'
				}`}
			>
				<ul className='flex flex-col gap-y-[2.4rem]'>
					{pages?.map(item => (
						<li
							key={item.id}
							className='flex justify-between items-center py-[0.44rem] pr-5 cursor-pointer'
							onClick={() => {
								if (item.text == 'Мои данные') {
									push(`${item.path}?t=${tokens.access}`)
								} else {
									push(item.path)
								}
							}}
						>
							<div
								className={`${
									pathname == item.path || pathname == item.path2 ? '' : 'pl-6'
								} flex gap-x-4`}
							>
								<div
									className={`${
										pathname == item.path || pathname == item.path2
											? ''
											: 'hidden'
									} w-2 h-7 bg-paragraph rounded-r-lg`}
								></div>
								<img
									src={
										pathname == item.path || pathname == item.path2
											? item.image2
											: item.image
									}
									alt={item.text}
									className={`${
										item.image == '/trash.svg' || item.image2 == '/r/trash.svg'
											? 'ml-[.1rem] mr-[.15rem]'
											: ''
									}`}
								/>
								<p
									className={`${
										pathname == item.path || pathname == item.path2
											? 'text-paragraph'
											: 'text-[#737373]'
									} hover:text-[#485174] text-xl font-normal hover:font-medium`}
								>
									{item.text}
								</p>
							</div>
							{requestsNew?.length !== 0 && item.text == 'Заявки' ? (
								<p
									className={`rounded-full text-tertiary bg-little-text text-xs font-bold py-1 px-[5px] flex items-center justify-center`}
								>
									{requestsNew?.length}
								</p>
							) : (
								<></>
							)}
						</li>
					))}
					<li
						className='flex justify-between items-center py-[0.44rem] pr-5 cursor-pointer'
						onClick={handleLogout}
					>
						<div className='pl-6 flex gap-x-4'>
							<div className='hidden w-2 h-7 bg-paragraph rounded-r-lg'></div>
							<img src='/images/exit.svg' alt='Выйти' />
							<p className='text-[#737373] hover:text-[#485174] text-xl font-normal hover:font-medium'>
								Выйти
							</p>
						</div>
					</li>
				</ul>
			</div>
		</>
	)
}

export default SideBar
