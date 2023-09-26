import { ILanguage, IOption, IPages, ISortMentors, ISpec } from '@/types/types'

export const specializations: ISpec[] = [
	{ id: 6, value: 'Agile', label: 'Agile' },
	{ id: 7, value: 'Android', label: 'Android' },
	{ id: 8, value: 'Backend', label: 'Backend' },
	{ id: 9, value: 'Cloud', label: 'Cloud' },
	{ id: 10, value: 'Code Review', label: 'Code Review' },
	{ id: 11, value: 'Content/Copy', label: 'Content/Copy' },
	{ id: 12, value: 'Data Science/ML', label: 'Data Science/ML' },
	{ id: 13, value: 'Databases', label: 'Databases' },
	{ id: 14, value: 'Entrepreneurship', label: 'Entrepreneurship' },
	{ id: 15, value: 'Frontend', label: 'Frontend' },
	{ id: 16, value: 'HR', label: 'HR' },
	{ id: 17, value: 'iOS', label: 'iOS' },
	{ id: 18, value: 'Marketing', label: 'Marketing' },
	{ id: 19, value: 'Product Management', label: 'Product Management' },
	{ id: 20, value: 'Project Management', label: 'Project Management' },
	{ id: 21, value: 'QA', label: 'QA' },
	{ id: 22, value: 'System Design', label: 'System Design' },
	{ id: 23, value: 'Team Lead/Management', label: 'Team Lead/Management' },
	{ id: 24, value: 'UX/UI/Design', label: 'UX/UI/Design' },
	{ id: 25, value: 'Аналитика', label: 'Аналитика' },
	{ id: 26, value: 'Карьера', label: 'Карьера' },
	{ id: 27, value: 'Собеседования', label: 'Собеседования' },
	{ id: 28, value: 'Сети', label: 'Сети' },
]

export const specializationsFilter = [
	{
		name: 'Development',
		specializations: [
			'Android',
			'Backend',
			'iOS',
			'Frontend',
			'System Design',
			'Code Review',
			'Data Science/ML',
		],
	},
	{
		name: 'Management',
		specializations: [
			'Agile',
			'Product Management',
			'Project Management',
			'Team Lead/Management',
		],
	},
	{
		name: 'DevOps',
		specializations: ['Databases', 'Сети', 'Cloud'],
	},
	{
		name: 'HR',
		specializations: ['HR', 'Карьера', 'Собеседования', 'Entrepreneurship'],
	},
	{
		name: 'Marketing',
		specializations: ['Content/Copy', 'Marketing'],
	},
	{
		name: 'Другое',
		specializations: ['QA', 'Аналитика', 'UX/UI/Design'],
	},
]

export const pages: IPages[] = [
	{
		id: 1,
		text: 'Заявки',
		image: '/images/trending_arrow.svg',
		path: '/profile/my-requests',
		image2: '/images/r/trending_arrow.svg',
	},
	{
		id: 2,
		text: 'Мои данные',
		image: '/images/star.svg',
		path: '/profile/my-profile',
		path2: '/profile/my-profile/edit',
		image2: '/images/r/star.svg',
	},
	{
		id: 3,
		text: 'Корзина',
		image: '/images/trash.svg',
		path: '/profile/requests-trash',
		image2: '/images/r/trash.svg',
	},
	{
		id: 4,
		text: 'Настройки',
		image: '/images/settings.svg',
		path: '/profile/settings',
		image2: '/images/r/settings.svg',
	},
]

export const sortMentors: ISortMentors[] = [
	{
		name: 'Язык',
		options: ['Оба языка', 'Русский', 'Кыргызский'],
	},
	{
		name: 'Цена',
		options: [
			'Бесплатно',
			'По договоренности',
			'По убыванию',
			'По возрастанию',
		],
	},
	{
		name: 'Опыт',
		options: ['10+', '5-10', '2-5', 'Нет опыта'],
	},
]

export const prices: IOption[] = [
	{ value: 'Бесплатно', label: 'Бесплатно' },
	{ value: 'По договоренности', label: 'По договоренности' },
]

export const experiences: IOption[] = [
	{ value: 'Нет опыта', label: 'Нет опыта' },
	{ value: '2-5', label: '2-5' },
	{ value: '5-10', label: '5-10' },
	{ value: '10+', label: '10+' },
]

export const skills: IOption[] = [
	{ value: 'JavaScript', label: 'JavaScript' },
	{ value: 'React', label: 'React' },
	{ value: 'Leadership', label: 'Leadership' },
	{ value: 'Code Review', label: 'Code Review' },
]

export const languages: ILanguage[] = [
	{ lang: 'Кыргызский/Русский', label: 'Оба языка', image: '' },
	{ lang: 'Кыргызский ', label: 'Кыргызский', image: '/images/kgz.svg' },
	{ lang: 'Русский', label: 'Русский', image: '/images/rus.svg' },
]

export const devLvl: IOption[] = [
	{ value: 'junior', label: 'junior ' },
	{ value: 'junior+', label: 'junior+' },
	{ value: 'middle', label: 'middle' },
	{ value: 'middle+', label: 'middle+' },
	{ value: 'senior', label: 'senior' },
]
