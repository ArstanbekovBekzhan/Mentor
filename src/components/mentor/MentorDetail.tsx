import { IMentorSingle } from '@/types/mentor.interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Layout from '../layout/Layout'

const MentorDetail: FC<IMentorSingle> = ({ mentor }) => {
	const { push } = useRouter()

	return (
		<Layout>
			<div className='mt-20 w-full max-w-[1440px] px-[11.3125rem] mb-44'>
				<div className='flex gap-x-28 mb-20 items-start'>
					<Image
						src={`${mentor.photo}`}
						alt=''
						className='rounded-xl'
						width={554}
						height={469}
					/>
					<div className='flex flex-col items-start'>
						<div className=''>
							<h3 className='text-[#272343] text-3xl font-semibold mb-[0.63rem]'>
								{mentor.username}
							</h3>
							<h5 className='text-[#485174] text-xl font-normal mb-6'>
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
						<ul className='mb-[1.13rem] flex flex-col gap-y-3'>
							<li>
								<p>😎 {mentor.experience} лет опыта</p>
							</li>
							<li>
								{mentor.price == 'Бесплатно' ||
								mentor.price == 'По договоренности' ? (
									<p>💰 {mentor.price}</p>
								) : (
									<p>💰 {mentor.price} руб</p>
								)}
							</li>
							<li>
								<p>{mentor.status ? '🟢 Активна' : '🔵 Не активен'}</p>
							</li>
						</ul>
						<div className='flex gap-x-4 mb-9 items-center'>
							<h3 className=''>Язык:</h3>
							<Image src='/images/rus.svg' alt='' width={37} height={37} />
						</div>
						<button
							onClick={() => {
								push(`/writing/${mentor.id}`)
							}}
							className='bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200 rounded-lg py-[1.57rem] px-14 text-lg font-medium text-[#2D334A]'
						>
							Оставить заявку
						</button>
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className='mb-[4.7rem] w-[67.37rem]'>
						<div className=''>
							<h4 className='text-4xl text-paragraph '>О себе</h4>
							<h5 className='text-little-text text-[1.4rem] my-7'>
								{mentor.about_me}
							</h5>
						</div>
						<div className=''>
							<h4 className='text-4xl text-paragraph '>С чем помогу</h4>
							<h5 className='text-little-text text-[1.4rem] my-7'>
								{mentor.help}
							</h5>
						</div>
						<div>
							<h4 className='text-2xl italic text-paragraph'>
								Компетенции: {mentor.skills}
							</h4>
						</div>
					</div>
					<button
						onClick={() => {
							push(`/writing/${mentor.id}`)
						}}
						className='bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200 rounded-lg py-[1.57rem] px-14 text-lg font-medium text-[#2D334A]'
					>
						Оставить заявку
					</button>
				</div>
			</div>
		</Layout>
	)
}

export default MentorDetail
