export interface IMentor {
	telegram_status?: boolean
	id: number
	username: string
	photo: string
	position: string
	place_of_work: string
	about_me: string
	help: string
	level_mentor: string
	experience: string
	skills: string
	status: boolean
	price: string
	language: string
	specialization: string[]
}

export interface IMentorData {
	mentors: IMentor[]
}

export interface IMentorSingle {
	mentor: IMentor
}

export interface IRequest {
	id: number
	my_level: string
	name: string
	email: string
	telegram: string
	description: string
	create_at: string
	accepted: boolean
	denied: boolean
	mentor_service: string
}
