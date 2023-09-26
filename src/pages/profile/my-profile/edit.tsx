import Image from 'next/image'
import React, { useState, useId } from 'react'
import makeAnimated from 'react-select/animated'
import Select, { OnChangeValue } from 'react-select'
import {
	experiences,
	languages,
	prices,
	specializations,
} from '@/arrays/arrays'
import { publicReq, userUpdate } from '@/redux/apiCalls'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import DefaultInputs from '@/components/inputs/default'
import BigInputs from '@/components/inputs/big'
import { ILanguage, IOption, IUserReg, IUserToEdit } from '@/types/types'

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import app from '@/firebase'
import LayoutAccount from '@/components/layout/LayoutAccount'
import { useRouter } from 'next/router'

interface IProps {
	mentor: IUserReg
}

const ProfileEdit = ({ mentor }: IProps) => {
	const { tokens } = useAppSelector(state => state.user)

	const [focus, setFocus] = useState(false)

	const [username, setFull_name] = useState(mentor.username)
	const [photo, setImage] = useState(mentor.photo)
	const [position, setPost] = useState(mentor.position)
	const [place_of_work, setPlace_of_work] = useState(mentor.place_of_work)
	const [about_me, setBio] = useState(mentor.about_me)
	const [help, setHelp] = useState(mentor.help)
	const [level_mentor, setMentee_level] = useState(mentor.level_mentor)
	const [experience, setExp] = useState(mentor.experience)
	const [specialization, setSpec] = useState(mentor.specialization)
	const [skills, setSkill] = useState(mentor.skills)
	const [price, setPrice] = useState(mentor.price)
	const [language, setLanguage] = useState(mentor.language)

	const [loaded, setLoaded] = useState('Сохранить изменения')

	const animatedComponents = makeAnimated()

	const dispatch = useAppDispatch()

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
	}

	function handleEdit() {
		const fileName = new Date().getTime() + photo.name
		const storage = getStorage(app)
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, photo)
		console.log(loaded)

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
					const user: IUserToEdit = {
						username,
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
					userUpdate(dispatch, user, tokens.access)
				})
			}
		)
	}

	const router = useRouter()
	console.log(router)

	return (
		<LayoutAccount>
			<div className='flex gap-x-28 items-start'>
				<div className='w-[46.6rem] pb-44'>
					<form
						onClick={() => setFocus(false)}
						onSubmit={e => e.preventDefault()}
						className='flex flex-col gap-y-5 mx-auto w-[46.88rem]'
					>
						<DefaultInputs
							label='ФИО'
							state={username ? username : ''}
							setState={setFull_name}
						/>
						<div className='flex flex-col gap-y-[0.87rem] w-96'>
							<label className='label-in-register'>
								Ваша фотография для профиля
							</label>
							<div className='relative'>
								<input
									type='file'
									className='file-input w-full h-full z-20 absolute bg-transparent opacity-0'
									accept='image/*,.png,.jpg,.web'
									size={2}
									onChange={e =>
										setImage(e.target.files ? e.target.files[0] : null)
									}
								/>
								<div className='flex justify-between cursor-pointer bg-[#E3F6F5] pl-7 pr-3 py-4 rounded-md'>
									<p
										className={`${
											photo ? 'text-black' : ''
										} text-[#485174B2] text-lg`}
									>
										{photo ? photo.name : 'Attach file'}
									</p>
									<Image
										width={28}
										height={28}
										src='/images/attachment_24px.svg'
										alt=''
										className='w-7'
									/>
									{photo ? (
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
							<DefaultInputs
								label='Должность'
								state={position ? position : ''}
								setState={setPost}
							/>
							<DefaultInputs
								label='Место работы'
								state={place_of_work ? place_of_work : ''}
								setState={setPlace_of_work}
							/>
							<BigInputs
								label='О себе'
								state={about_me ? about_me : ''}
								setState={setBio}
							/>
							<BigInputs
								label='С чем вы можете помочь?'
								state={help ? help : ''}
								setState={setHelp}
							/>
							<BigInputs
								label='Какого уровня менти могут обращаться к вам за помощью?'
								state={level_mentor ? level_mentor : ''}
								setState={setMentee_level}
							/>
						</div>
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
								Ваша специализация
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
								Навыки и технологии
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
							<label htmlFor='label-in-register'>Выберите язык</label>
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
						<div className='flex justify-start'>
							<button
								className='mx-auto text-lg font-medium px-[3.825rem] py-6 rounded-xl text-paragraph bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200'
								onClick={handleEdit}
							>
								Сохранить
							</button>
						</div>
					</form>
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

	const { data } = await publicReq(`base/personal-profile/`, config)

	return {
		props: { mentor: data },
	}
}

export default ProfileEdit
