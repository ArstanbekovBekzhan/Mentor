import { register } from '@/redux/apiCalls'
import { useAppDispatch } from '@/hooks/hooks'
import { ILanguage, IOption, IUserReg } from '@/types/types'
import React, { useState, useId } from 'react'
import Select, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import {
	prices,
	languages,
	experiences,
	specializations,
} from '@/arrays/arrays'
import Image from 'next/image'
import AbsoluteImages from '@/components/absoluteImages'

import DefaultInputs from '@/components/inputs/default'
import PasswordInputs from '@/components/inputs/password'
import BigInputs from '@/components/inputs/big'
import ActivationModal from '@/components/modal/activationModal'
import Layout from '@/components/layout/Layout'

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import app from '@/firebase'
import { toast, Toaster } from 'react-hot-toast'

const RegisterPage = () => {
	const [modal, setModal] = useState<boolean>(false)
	const [focus, setFocus] = useState(false)

	const [isVisPass, setIsVisPass] = useState<boolean>(false)
	const [isVisPassConf, setIsVisPassConf] = useState<boolean>(false)
	const [username, setFull_name] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [password_confirm, setPassword_confirm] = useState<string>('')
	const [image, setImage] = useState<any>(null)
	const [position, setPost] = useState<string>('')
	const [place_of_work, setPlace_of_work] = useState<string>('')
	const [about_me, setBio] = useState<string>('')
	const [help, setHelp] = useState<string>('')
	const [level_mentor, setMentee_level] = useState<string>('')
	const [experience, setExp] = useState('')
	const [specialization, setSpec] = useState<string[]>([''])
	const [skills, setSkill] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [language, setLanguage] = useState('')
	// const [specId, setSpecId] = useState<number[]>([])

	const [loaded, setLoaded] = useState('Сохранить изменения')

	const dispatch = useAppDispatch()

	const animatedComponents = makeAnimated()

	function handleRegister() {
		if (
			!username.trim() ||
			!email.trim() ||
			!password.trim() ||
			!password_confirm.trim() ||
			!position.trim() ||
			!place_of_work.trim() ||
			!about_me.trim() ||
			!help.trim() ||
			!level_mentor.trim() ||
			!experience.trim() ||
			specialization.length == 0 ||
			!skills.trim() ||
			!price.trim() ||
			!language.trim()
		) {
			toast.error('Некоторые поля не заполнены', {
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
		console.log(loaded)
		const fileName = new Date().getTime() + image.name
		const storage = getStorage(app)
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, image)

		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setLoaded('Загруска выполнена на ' + progress + '%')

				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused')
						break
					case 'running':
						console.log('Upload is running')
						break
					default:
				}
			},
			error => {
				console.log(error)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					const user: IUserReg = {
						username,
						email,
						password,
						password_confirm,
						photo: downloadURL,
						position,
						place_of_work,
						about_me,
						help,
						level_mentor,
						experience,
						specialization,
						skills,
						price,
						language,
					}
					register(dispatch, user, setModal)
				})
			}
		)
	}

	// console.log(image)

	const getValue1 = () => {
		return experience ? experiences.find(c => c.value === experience) : ''
	}

	const onChange1 = (newValue: any) => {
		setExp(newValue.value)
	}

	const getValue2 = () => {
		return specialization
			? specializations.filter(c => specialization.indexOf(c.value) >= 0)
			: []
	}

	const onChange2 = (newValue: OnChangeValue<IOption, boolean>) => {
		if (specialization.length >= 5) return
		setSpec((newValue as IOption[]).map(v => v.value))
		// setSpecId((newValue as ISpec[]).map(v => v.id))
	}

	return (
		<Layout>
			<Toaster />
			<div className='relative overflow-hidden mb-44'>
				<AbsoluteImages />
				<ActivationModal
					modal={modal}
					setModal={setModal}
					email={email}
					password={password}
				/>
				<div className=''>
					<h1>
						Стань частью нашей <br /> команды
					</h1>
					<h6 className='bg-[#E3F6F580] w-[43.44rem] mx-auto rounded-2xl mb-20 px-4 py-[2.13rem] text-lg leading-7 text-paragraph font-normal text-center'>
						Помогать другим – почётно и круто. Спасибо, что хотите этим <br />
						заниматься.Заполните форму ниже, и мы обязательно рассмотрим вашу{' '}
						<br />
						заявку как можно скорее.
					</h6>
					<form
						onSubmit={e => e.preventDefault()}
						className='flex flex-col gap-y-5 mx-auto w-[46.88rem]'
					>
						<DefaultInputs
							label='ФИО'
							state={username}
							setState={setFull_name}
						/>
						<DefaultInputs
							label='Email'
							state={email.toLocaleLowerCase()}
							setState={setEmail}
						/>
						<PasswordInputs
							label='Пароль'
							state={password}
							setState={setPassword}
							passVis={isVisPass}
							setPassVis={setIsVisPass}
						/>
						<PasswordInputs
							label='Повтор пароля'
							state={password_confirm}
							setState={setPassword_confirm}
							passVis={isVisPassConf}
							setPassVis={setIsVisPassConf}
						/>
						<div className='flex flex-col gap-y-[0.87rem] w-96'>
							<label className='label-in-register'>
								Ваша фотография для профиля
							</label>
							<div className='relative'>
								<input
									type='file'
									className='file-input w-full h-full z-1 absolute bg-transparent opacity-0'
									// ref={filePicker}
									accept='image/*,.png,.jpg,.web'
									size={2}
									onChange={e =>
										setImage(e.target.files ? e.target.files[0] : null)
									}
								/>
								<div className='flex justify-between cursor-pointer bg-[#E3F6F5] pl-7 pr-3 py-4 rounded-md'>
									<p
										className={`${
											image ? 'text-black' : ''
										} text-[#485174B2] text-lg`}
									>
										{image ? image.name : 'Attach file'}
									</p>
									<Image
										width={28}
										height={28}
										src='/images/attachment_24px.svg'
										alt=''
										className='w-7'
									/>
									{image ? (
										<Image
											onClick={() => setImage(null)}
											src='/images/trash-icon.svg'
											alt=''
											width={22}
											height={22}
											className='absolute -right-11 hover:scale-125 hover:duration-100 duration-200'
										/>
									) : (
										''
									)}
								</div>
							</div>
							<p className='text[#485174B2] '>(пожалуйста, не более 2Мб)</p>
						</div>
						<DefaultInputs
							label='Должность'
							state={position}
							setState={setPost}
						/>
						<DefaultInputs
							label='Место работы'
							state={place_of_work}
							setState={setPlace_of_work}
						/>
						<BigInputs label='О себе' state={about_me} setState={setBio} />
						<BigInputs
							label='С чем вы можете помочь?'
							state={help}
							setState={setHelp}
						/>
						<BigInputs
							label='Какого уровня менти могут обращаться к вам за помощью?'
							state={level_mentor}
							setState={setMentee_level}
						/>
						<div className='flex flex-col gap-y-[0.87rem] w-[30.38rem] mb-12'>
							<label htmlFor='' className='label-in-register'>
								Опыт
							</label>
							<Select
								instanceId={useId()}
								classNamePrefix='custom-select'
								onChange={onChange1}
								isSearchable={false}
								value={getValue1()}
								options={experiences}
								placeholder=''
							/>
						</div>
						<div className='flex flex-col gap-y-[0.87rem] mb-11 w-[30.38rem]'>
							<label htmlFor='' className='flex flex-col gap-y-1 w-[89%]'>
								<span className='mb-[1.63rem] leading-[1.63rem] text-xl text-paragraph font-medium'>
									Ваша специализация
								</span>{' '}
								<p className='font-light leading-5 text-base'>
									Здесь вам нужно указать основную вашу текущую специализацию и
									ту, в которой вы хорошо разбираетесь и готовы оказать помощь.
									До 5 тегов. По ним вас будут находить при использовании тегов
									в поисковом блоке. Они также будут видны в вашем профиле.
								</p>
							</label>
							<Select
								instanceId={useId()}
								classNamePrefix='custom-select1'
								onChange={onChange2}
								value={getValue2()}
								placeholder=''
								isMulti
								components={animatedComponents}
								options={specializations}
								className=' h-14'
								isSearchable={true}
								closeMenuOnSelect={true}
							/>
						</div>
						<div className='flex flex-col gap-y-[0.87rem] mb-14'>
							<label htmlFor='' className='flex flex-col gap-y-1 w-[89%]'>
								<span className='mb-[1.63rem] leading-[1.63rem] text-xl text-paragraph font-medium'>
									Навыки и технологии
								</span>{' '}
								<p className='font-light leading-5 text-base'>
									Перечислите через запятую навыки, по которым хотите
									консультировать. Например: JavaScript, React, Leadership, Code
									Review. По ним менти смогут вас найти.
								</p>
							</label>
							<input
								onChange={e => setSkill(e.target.value)}
								value={skills}
								name='username'
								className='reg-inputs'
								type='text'
							/>
						</div>
						<div className='flex flex-col gap-y-[0.87rem] w-[30.38rem] mb-14'>
							<label htmlFor='' className='flex flex-col gap-y-1 w-[89%]'>
								Стоимость консультации
							</label>

							<div className='relative'>
								<input
									type='text'
									className='reg-inputs bg-tertiary mb-3'
									value={price}
									onClick={e => {
										e.stopPropagation()
									}}
									onChange={e => setPrice(e.target.value)}
									onFocus={() => setFocus(!focus)}
								/>
								<ul
									className={`bg-tertiary absolute duration-500 w-full rounded-xl overflow-y-hidden ${
										focus
											? 'h-[5.5rem] duration-300 shadow-[3px_2.4px_5.8px_#485174]'
											: 'h-0 duration-300'
									}`}
									onClick={() => setFocus(true)}
								>
									{prices.map((price, i) => (
										<li
											className='py-2 text-xl hover:bg-[#656565] cursor-pointer hover:text-white hover:duration-150 duration-150 pl-3'
											onClick={e => {
												e.stopPropagation()
												setFocus(false)
												setPrice(price.value)
											}}
											key={i}
										>
											{price.value}
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className='flex flex-col gap-y-[0.87rem] mb-32'>
							<label htmlFor='label-in-register'>
								Выберите язык на котором можете <br /> консультировать (можно
								оба)
							</label>
							<div className='flex flex-col gap-y-[0.62rem] '>
								{languages.map((item: ILanguage) => (
									<div
										className='border border-[#73737380] rounded-md flex justify-between py-2 px-6 w-[22.5rem]'
										key={item.lang}
										onClick={() => setLanguage(item.lang)}
									>
										<div
											className={`${
												item.label == 'Оба языка' ? 'ml-14 py-2' : ''
											} flex items-center gap-x-4`}
										>
											{item.image ? (
												<Image src={item.image} width={37} height={37} alt='' />
											) : null}
											<p>{item.label}</p>
										</div>
										<Image
											src={
												language == item.lang
													? '/images/checked.svg'
													: '/images/no-checked.svg'
											}
											alt=''
											width={20}
											height={20}
										/>
									</div>
								))}
							</div>
						</div>
						<button
							onClick={() => {
								handleRegister()
							}}
							className='mx-auto text-lg font-medium px-[3.825rem] py-6 rounded-xl text-paragraph bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200'
						>
							Оставить заявку
						</button>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default RegisterPage
