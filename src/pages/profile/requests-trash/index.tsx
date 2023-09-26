import LayoutAccount from '@/components/layout/LayoutAccount'
import { useAppSelector } from '@/hooks/hooks'
import { getRequest } from '@/redux/apiCalls'
import { IRequest } from '@/types/types'
import React, { useEffect, useState } from 'react'

const RequestsTrash = () => {
	const token = useAppSelector(state => state.user.tokens)
	const [requests, setRequests] = useState<IRequest[]>([])
	useEffect(() => {
		getRequest(token.access).then(data => setRequests(data))
	}, [token.access])
	const requestsTrash: IRequest[] = requests.filter(request => request.denied)
	console.log(requests)
	return (
		<LayoutAccount>
			<div className='flex flex-col items-center'>
				<h3 className='text-paragraph text-[1.44rem] mb-[4.8rem]'>
					Отклоненные заявки
				</h3>
				<div className='w-[41.8rem] flex flex-col items-center'>
					{requestsTrash.length ? (
						<hr className='bg-[#9B999980] w-full h-[2px]' />
					) : (
						<h2>Пусто</h2>
					)}
					{requestsTrash?.map(request => (
						<>
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
						</>
					))}
				</div>
			</div>
		</LayoutAccount>
	)
}

export default RequestsTrash
