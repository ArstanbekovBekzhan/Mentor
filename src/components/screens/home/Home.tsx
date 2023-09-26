import leftImage from '@/images/Group129.svg'
import rightImage from '@/images/Group136.svg'
import Image from 'next/image'
import HowItWork1 from '@/images/HowItWork1.svg'
import HowItWork3 from '@/images/HowItWork3.svg'
// import MentorItem from '@/components/mentor/MentorItem'
import Layout from '@/components/layout/Layout'
import HowItWork2 from '@/images/HowItWork2.svg'
import { FC } from 'react'
import { IMentorData } from '@/types/mentor.interface'
import MentorList from '@/components/mentor/MentorList'
import Button from '@/components/UI/button/Button'
import FAQ from '@/components/UI/FAQ'
import FooterImageRight from '@/images/FooterImage.svg'
import FooterImageLeft from '@/images/FooterImage2.svg'

const Home: FC<IMentorData> = ({ mentors }) => {
	return (
		<Layout>
			<header className='relative flex justify-center '>
				<Image
					src={leftImage}
					alt='left-image'
					className='absolute w-[23vw] top-0 left-0'
					priority
				/>
				<div className='flex flex-col items-center w-1/2 mt-4'>
					<h1 className='font-semibold text-[3.5rem] text-center mb-9 text-title'>
						Найди <span className='text-[#FB4868]'>своего</span> ментора
					</h1>
					<p className='text-center leading-8 text-xl font-normal mb-24'>
						Ментор KG - это сообщество ит-специалистов Кыргызстана, готовых
						делиться знаниями и опытом. <br /> Единая площадка для наставников и
						учеников, чтобы облегчить им поиск друг друга.
					</p>
					<a href='#mentors' className='w-full flex justify-center'>
						<Button>Найти ментора</Button>
					</a>
				</div>
				<Image
					src={rightImage}
					alt='right-image'
					priority
					className='absolute w-[33vw] right-0 top-0'
				/>
			</header>
			<div className='w-full bg-secondary'>
				<div className='w-container m-auto pt-[3.5rem] pb-28'>
					<h2 className='text-5xl font-semibold text-center  text-title mb-24'>
						Как это работает
					</h2>
					<div className='flex justify-between flex-wrap'>
						<div className='flex flex-col'>
							<Image src={HowItWork1} alt='how-it-work' className='mb-8' />
							<div className='flex flex-col w-[362px]'>
								<h4 className='text-2xl font-semibold tracking-wider text-title mb-4'>
									Выбери ментора
								</h4>
								<p className='text-xl text-little-text'>
									Можешь выбрать нужного человека по специальности, опыту работы
									и стоимости встречи.
								</p>
							</div>
						</div>
						<div className='flex flex-col'>
							<Image src={HowItWork2} alt='how-it-work' className='mb-8' />
							<div className='flex flex-col w-[362px]'>
								<h4 className='text-2xl font-semibold tracking-wider text-title mb-4'>
									Напиши ему
								</h4>
								<p className='text-xl text-little-text'>
									Оставь заявку на сайте. Напиши, с чем тебе нужна помощь и что
									бы ты хотел получить. Помни: хорошо сформулированная проблема
									— наполовину решённая проблема.
								</p>
							</div>
						</div>
						<div className='flex flex-col'>
							<Image src={HowItWork3} alt='how-it-work' className='mb-8' />
							<div className='flex flex-col w-[300px]'>
								<h4 className='text-2xl font-semibold tracking-wider text-title mb-4'>
									Дело за малым
								</h4>
								<p className='text-xl text-little-text'>
									Мы перешлём твою заявку ментору. Он оценит задачу и свяжется с
									тобой, чтобы обсудить детали и выбрать время. Каждый ментор
									сам определяет стоимость и длительность сессии.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-container py-[4.5rem] m-auto'>
				<div className='mb-[11.5rem]'>
					<div className='flex flex-col items-center'>
						<h2
							id='mentors'
							className='text-5xl text-title font-bold tracking-widest mb-24'
						>
							Наши менторы
						</h2>
					</div>
					{mentors.length ? (
						<MentorList mentors={mentors} />
					) : (
						<h2>Mentors not found</h2>
					)}
				</div>
				<FAQ />
			</div>
			<div className='bg-secondary w-full'>
				<div className='m-auto pt-[7rem] pb-[5rem]'>
					<div className='bg-white w-[80%] py-[4.7rem] px-[6.6rem] m-auto rounded-[30px]'>
						<p className='text-2xl text-little-text  text-center leading-8 font-light'>
							<span className='text-[#FB4868] font-semibold'>
								Наша главная задача
							</span>{' '}
							— соединять людей и развивать комьюнити за счёт новых знакомств и
							передачи знаний.
						</p>
					</div>
				</div>
				<div className='relative flex justify-center '>
					<Image
						src={FooterImageLeft}
						alt='left-image'
						className='absolute w-[26vw] top-10 left-0'
						priority
					/>
					<div className='flex flex-col items-center w-1/2 mt-4 z-1'>
						<h1 className='font-semibold text-[2.2rem] text-center mb-9 text-title'>
							Присоединяйся к нашей команде менторов!
						</h1>
						<p className='text-center leading-8 text-xl font-normal mb-24 w-[35rem] tracking-wide'>
							У тебя есть опыт и ты хочешь делиться своими знаниями и помогать
							другим?
							<br /> Заполни анкету и мы обязательно добавим тебя на сайт.
						</p>
						<Button>Оставить заявку</Button>
					</div>
					<Image
						src={FooterImageRight}
						alt='right-image'
						priority
						className='absolute w-[26vw] right-0 top-10'
					/>
				</div>
			</div>
		</Layout>
	)
}

export default Home
