import { specializationsFilter, sortMentors } from '@/arrays/arrays'
import { IMentorData } from '@/types/mentor.interface'
import React, { FC, useEffect, useState } from 'react'
import ButtonPrimary from '../UI/button/ButtonPrimary'
import SelectFilter from '../UI/select/SelectFilter'
import SelectSort from '../UI/select/SelectSort'
import MentorItem from './MentorItem'

interface ISort {
	expirience: string
	language: string
	price: string
}

const MentorList: FC<IMentorData> = ({ mentors }) => {
	const [query, setQuery] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [sortMentorsSelect, setSortMentorsSelect] = useState<ISort>({
		expirience: '',
		language: '',
		price: '',
	})
	const [data, setData] = useState(mentors)
	const [limit, setLimit] = useState<number>(10)
	const mentorsData = data.slice(1, limit)
	// useEffect(() => {
	// 	mentorsData = data.slice(1, limit)
	// 	console.log(limit)
	// }, [limit])
	useEffect(() => {
		let filteredMentors = mentors
			.filter(mentor => {
				// Фильтруем по категориям
				if (selectedCategories.length > 0) {
					return mentor.specialization.some(category =>
						selectedCategories.includes(category)
					)
				} else {
					return true
				}
			})
			.filter(mentor => {
				// Фильтруем по запросу
				if (query.length > 0) {
					const mentorName = `${mentor.username}`.toLowerCase()
					return mentorName.includes(query.toLowerCase())
				} else {
					return true
				}
			})

		if (sortMentorsSelect.expirience === '10+') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.experience === '10+') {
					return -1
				}
				if (a.experience !== '10+') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.expirience === '5-10') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.experience === '5-10') {
					return -1
				}
				if (a.experience !== '5-10') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.expirience === '2-5') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.experience === '2-5') {
					return -1
				}
				if (a.experience !== '2-5') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.expirience === 'Нет опыта') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.experience === 'Нет опыта') {
					return -1
				}
				if (a.experience !== 'Нет опыта') {
					return 1
				}
				return 0
			})
		}

		if (sortMentorsSelect.language === 'Оба языка') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.language === 'Оба языка') {
					return -1
				}
				if (a.language !== 'Оба языка') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.language === 'Русский') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.language === 'Русский') {
					return -1
				}
				if (a.language !== 'Русский') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.language === 'Кыргызский') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.language === 'Кыргызский') {
					return -1
				}
				if (a.language !== 'Кыргызский') {
					return 1
				}
				return 0
			})
		}

		if (sortMentorsSelect.price === 'Бесплатно') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.price === 'Бесплатно') {
					return -1
				}
				if (a.price !== 'Бесплатно') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.price === 'По договоренности') {
			filteredMentors = filteredMentors.sort(a => {
				if (a.price === 'По договоренности') {
					return -1
				}
				if (a.price !== 'По договоренности') {
					return 1
				}
				return 0
			})
		} else if (sortMentorsSelect.price === 'По убыванию') {
			filteredMentors = filteredMentors.sort((a, b) => {
				if (Number(a.price) < Number(b.price)) return 1
				if (Number(a.price) > Number(b.price)) return -1
				if (a.price === 'Бесплатно') return -1
				if (a.price === 'По договоренности') return -1
				return 0
			})
		} else if (sortMentorsSelect.price === 'По возрастанию') {
			filteredMentors = filteredMentors.sort((a, b) => {
				if (a.price === 'Бесплатно') return -1
				if (a.price === 'По договоренности') return -1
				if (Number(a.price) > Number(b.price)) return 1
				if (Number(a.price) < Number(b.price)) return -1
				return 0
			})
		}

		setData(filteredMentors)
	}, [selectedCategories, query, sortMentorsSelect, mentors])

	function handleCategorySelect(category: string) {
		setSelectedCategories(prevSelectedCategories => {
			if (prevSelectedCategories.includes(category)) {
				return prevSelectedCategories.filter(c => c !== category)
			} else {
				return [...prevSelectedCategories, category]
			}
		})
	}

	function resetAll() {
		setSortMentorsSelect({
			expirience: '',
			language: '',
			price: '',
		})
		setSelectedCategories([])
		setQuery('')
	}

	return (
		<>
			<div className='flex flex-col items-center mb-32'>
				<input
					type='text'
					className='w-[51rem] h-[4rem] bg-secondary rounded-[15px] m-auto text-lg px-16 bg-[url("../../public/images/search_24px.svg")] bg-no-repeat bg-[750px] mb-16'
					placeholder='Search...'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
				<div className='flex gap-5 mb-12 flex-wrap'>
					{specializationsFilter.map(specializations => (
						<SelectFilter
							specializations={specializations}
							handleCategorySelect={handleCategorySelect}
							selectedCategories={selectedCategories}
							key={specializations.name}
						/>
					))}
				</div>
				<div className='flex justify-between w-[65%]'>
					<div className='flex gap-5 flex-wrap'>
						<SelectSort
							sortMentor={sortMentors[0]}
							selectedSort={sortMentorsSelect.language}
							onClick={(selectedSort: string) =>
								setSortMentorsSelect({
									...sortMentorsSelect,
									language: selectedSort,
								})
							}
						/>
						<SelectSort
							sortMentor={sortMentors[2]}
							selectedSort={sortMentorsSelect.expirience}
							onClick={(selectedSort: string) =>
								setSortMentorsSelect({
									...sortMentorsSelect,
									expirience: selectedSort,
								})
							}
						/>
						<SelectSort
							sortMentor={sortMentors[1]}
							selectedSort={sortMentorsSelect.price}
							onClick={(selectedSort: string) =>
								setSortMentorsSelect({
									...sortMentorsSelect,
									price: selectedSort,
								})
							}
						/>
					</div>
					<button
						className='flex items-center justify-between whitespace-nowrap rounded-[12px] w-[11.5rem] px-6 py-3 text-base font-medium leading-normal text-white bg-little-text  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-title hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-title focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),
							focus:text-white border-[1px] border-black
							0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none'
						onClick={resetAll}
					>
						Сбросить все
					</button>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='flex flex-wrap gap-6 mb-28'>
					{mentorsData.map(mentor => {
						if (mentor.username === 'admin') return
						return <MentorItem key={mentor.id} mentor={mentor} />
					})}
				</div>
				<ButtonPrimary onClick={(prev: number) => setLimit(prev + limit)}>
					Показать больше
				</ButtonPrimary>
			</div>
		</>
	)
}

export default MentorList
