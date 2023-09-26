import { devLvl } from '@/arrays/arrays'
import { useAppDispatch } from '@/hooks/hooks'
import RequestModal from '@/components/modal/writingModal'
import { writing } from '@/redux/apiCalls'
import { IMentorSingle } from '@/types/mentor.interface'
import { IMentee } from '@/types/types'
import Image from 'next/image'
import { FC, useId, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Select from 'react-select'
import BigInputs from '../inputs/big'
import DefaultInputs from '../inputs/default'
import Layout from '../layout/Layout'
import { NextRouter, useRouter } from 'next/router'

interface IMenteeWriting extends IMentee {
	mentor_service: number
}

const WritingMentor: FC<IMentorSingle> = ({ mentor }) => {
	const [modal, setModal] = useState<boolean>(false)

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [my_level, setMy_level] = useState('')
	const [telegram, setTelegram] = useState('')

	const dispatch = useAppDispatch()

	const router: NextRouter = useRouter()

	function handleSend() {
		if (
			!email.trim() ||
			!name.trim() ||
			!description.trim() ||
			!my_level.trim() ||
			!telegram.trim()
		) {
			toast.error('Некоторые поля пусты', {
				style: {
					borderRadius: '6px',
					background: '#333',
					color: '#fff',
					padding: '20px auto',
					fontSize: '20px',
				},
			})
			return
		}

		const mentee: IMenteeWriting = {
			email,
			name,
			description,
			my_level,
			telegram,
			mentor_service: mentor.id,
		}

		writing(dispatch, mentee, setModal, router)
	}

	const getValue = () => {
		return my_level ? devLvl.find(c => c.value === my_level) : ''
	}

	const onChange = (newValue: any) => {
		setMy_level(newValue.value)
	}

	return (
		<Layout>
			<Toaster />
			<RequestModal modal={modal} setModal={setModal} />
			<div className='w-full max-w-[1440px] px-[28.13rem] mb-44'>
				<h1 className='mb-16'>Запись к ментору</h1>
				<div className='flex gap-x-[3.8rem] mb-24'>
					<Image
						src={`${mentor.photo}`}
						alt=''
						className='rounded-lg'
						width={189}
						height={159}
					/>
					<div className='flex flex-col'>
						<h3 className='text-[#272343] text-3xl font-semibold mb-[0.63rem]'>
							{mentor.username}
						</h3>
						<h5 className='text-[#485174] text-xl font-normal mb-6'>
							{mentor.position} {mentor.place_of_work}
						</h5>
						<ul>
							<li>Опыт: {mentor.experience} лет</li>
							<li>
								{mentor.price == 'Бесплатно' ||
								mentor.price == 'По договоренности' ? (
									<p>💰 {mentor.price}</p>
								) : (
									<p>💰 {mentor.price} руб</p>
								)}
							</li>
						</ul>
					</div>
				</div>
				<form
					className='flex flex-col items-start gap-y-8 w-[35.57rem]'
					onSubmit={e => e.preventDefault()}
				>
					<DefaultInputs
						className='w-full'
						state={email}
						label='Email'
						setState={setEmail}
					/>
					<DefaultInputs
						className='w-full'
						state={name}
						label='Ваше имя и фамилия'
						setState={setName}
					/>
					<BigInputs
						className='w-full'
						state={description}
						label='О чём хотите поговорить?'
						setState={setDescription}
					/>
					<div className='flex flex-col gap-y-[0.87rem] w-full mb-12'>
						<label htmlFor='' className='label-in-register'>
							Как вы оцениваете свой уровень?
						</label>
						<Select
							classNamePrefix='custom-select2'
							instanceId={useId()}
							options={devLvl}
							onChange={onChange}
							value={getValue()}
						/>
					</div>
					<DefaultInputs
						className='w-full'
						state={telegram}
						label='Telegram @username'
						setState={setTelegram}
					/>
					<button
						onClick={handleSend}
						className='bg-accent rounded-lg py-[1.57rem] px-14 text-lg font-medium hover:bg-tertiary active:bg-active hover:duration-150 duration-200 text-[#2D334A]'
					>
						Оставить заявку
					</button>
				</form>
			</div>
		</Layout>
	)
}

export default WritingMentor
