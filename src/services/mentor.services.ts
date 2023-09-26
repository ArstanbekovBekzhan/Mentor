import { publicReq } from '@/redux/apiCalls'
import { IMentor, IRequest } from '@/types/mentor.interface'

const MentorService = {
	async getAll() {
		const { data } = await publicReq<IMentor[]>('base/mentors')
		return data
	},
	async getById(id: number) {
		const { data } = await publicReq<IMentor>(`base/public-profile/${id}`)
		return data
	},
	async getAllUser() {
		const { data } = await publicReq<IRequest[]>(`/statement/statements/`)
		return data
	},
	async getUserByID(id: number) {
		const { data } = await publicReq<IRequest>(`/statement/statements/${id}`)
		return data
	},
}

export default MentorService
