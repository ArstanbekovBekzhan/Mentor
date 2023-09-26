import { IMentor } from '@/types/mentor.interface'
import { useState } from 'react'
import { specializations } from '@/arrays/arrays'

interface IMentorFilter {
	mentors: IMentor[]
	setMentorData: any
}

function Mentors({ mentors }: IMentorFilter) {
	const [query, setQuery] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const filteredMentors = mentors
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

	console.log(filteredMentors)

	function handleCategorySelect(category: string) {
		setSelectedCategories(prevSelectedCategories => {
			if (prevSelectedCategories.includes(category)) {
				return prevSelectedCategories.filter(c => c !== category)
			} else {
				return [...prevSelectedCategories, category]
			}
		})
	}

	return (
		<div>
			<div>
				<input
					type='text'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
				<button onClick={() => setQuery('')}>Очистить</button>
			</div>
			<div>
				{specializations.map(category => (
					<button
						key={category.value}
						onClick={() => handleCategorySelect(category.value)}
						className={
							selectedCategories.includes(category.value) ? 'selected' : ''
						}
					>
						{category.value}
					</button>
				))}
				<button onClick={() => setSelectedCategories([])}>Сбросить</button>
			</div>
		</div>
	)
}

export default Mentors
