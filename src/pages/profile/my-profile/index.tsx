import { publicReq } from '@/redux/apiCalls'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import LayoutAccount from '@/components/layout/LayoutAccount'
import { IMentor } from '@/types/mentor.interface'
import { useRouter } from 'next/router'

interface IProps {
	mentor: IMentor
}

function MyProfile({ mentor }: IProps) {
	const { query } = useRouter()

	return (
		<LayoutAccount>
			<div className='flex gap-x-28 items-start '>
				<div className='w-[46.6rem] pb-44'>
					<div className='flex gap-x-9 mb-9'>
						<Image
							src={mentor.photo}
							alt=''
							className='rounded-2xl w-56 h-[12.3125rem] object-cover'
							width='209'
							height='149'
							loading='eager'
							priority
						/>
						<div className='flex gap-x-10'>
							<div className='flex flex-col items-start'>
								<div className=''>
									<h3 className='text-[#272343] text-2xl font-semibold mb-[0.63rem]'>
										{mentor.username}
									</h3>
									<h5 className='text-[#485174] text-lg font-normal mb-6'>
										{mentor.position} {mentor.place_of_work}
									</h5>
								</div>
								<div className='w-96 pr-7 flex flex-wrap mb-14 gap-4'>
									{mentor.specialization?.map(
										(specialization: string, index: number) => (
											<p
												key={index}
												className='cursor-default px-[0.82rem] py-[0.40rem] font-semibold text-tertiary bg-[#2D334A] rounded-full text-center'
											>
												{specialization}
											</p>
										)
									)}
								</div>
							</div>
							<ul className='w-40 mb-[1.13rem] flex flex-col gap-y-3'>
								<li className='list-disc text-xl'>
									<strong>Опыт: </strong>{' '}
									{mentor.experience == 'Нет опыта'
										? mentor.experience
										: `${mentor.experience} лет`}
								</li>
								<li className='list-disc text-xl'>
									<strong>Цена: </strong> {mentor.price} сом
								</li>
							</ul>
						</div>
					</div>
					<div className='flex flex-col items-start'>
						<div className='mb-[4.7rem] '>
							<div className=''>
								<h4 className='text-3xl text-paragraph '>О себе</h4>
								<h5 className='text-little-text text-[1.2rem] my-7'>
									{mentor.about_me}
								</h5>
							</div>
							<div className=''>
								<h4 className='text-3xl text-paragraph '>С чем помогу</h4>
								<h5 className='text-little-text text-[1.2rem] my-7'>
									{mentor.help}
								</h5>
							</div>
							<div>
								<h4 className='text-xl italic text-paragraph'>
									<span className='text-2xl'>Компетенции:</span> <br /> <br />
									{mentor.specialization}
								</h4>
							</div>
						</div>
						<Link
							href={`/profile/my-profile/edit?t=${query.t}`}
							className='bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200 rounded-lg py-[1.57rem] px-14 text-lg font-medium text-[#2D334A]'
						>
							Редактировать
						</Link>
					</div>
				</div>
			</div>
		</LayoutAccount>
	)
}

interface IToken {
	t: string
}
interface IQuery {
	query: IToken
}

export const getServerSideProps = async ({ query }: IQuery) => {
	const config = {
		headers: {
			Authorization: `Bearer ${query.t}`,
		},
	}
	try {
		const { data } = await publicReq(`base/personal-profile/`, config)

		return {
			props: { mentor: data },
		}
	} catch (err) {
		console.log(err)
		return {
			props: { mentor: '' },
		}
	}
}

export default MyProfile
