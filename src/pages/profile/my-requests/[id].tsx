import { useAppSelector } from '@/hooks/hooks'
import MentorService from '@/services/mentor.services'
import { acceptRequest, deniedRequest } from '@/redux/apiCalls'
import { IRequest } from '@/types/mentor.interface'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface IProps {
	user: IRequest
}

type TRequest = {
	accepted: boolean
	denied: boolean
}

const UserModal = ({ user }: IProps) => {
	const access = useAppSelector(state => state.user.tokens.access)

	function handleClick() {
		const request: TRequest = {
			accepted: true,
			denied: false,
		}
		acceptRequest(user.id, request, access)
	}

	function handleClick2() {
		const request: TRequest = {
			accepted: false,
			denied: true,
		}
		deniedRequest(user.id, request, access)
	}

	return (
		<div
			className={`w-full h-full bg-tertiary fixed top-0 flex duration-200 justify-center items-center`}
		>
			<div className='w-3/4 py-[4.5rem] px-[13.875rem] bg-white rounded-2xl flex flex-col items-center'>
				<div className='flex flex-col gap-y-3 text-center mb-8'>
					<h3 className='text-[#272343] font-semibold text-[25px]'>
						{user.name}
					</h3>
					<h4 className='text-[#086CB7] text-xl font-normal'>{user.email}</h4>
					<h4 className='text-little-text text-xl font-normal'>
						Telegram{' '}
						{user.telegram[0] == '@' ? user.telegram : `@${user.telegram}`}
					</h4>
				</div>
				<p className='px-14 py-10 text-left mb-10'>{user.description}</p>
				<div className='flex gap-x-10 mb-[4.375rem] items-center'>
					<p className='text-paragraph text-lg font-medium'>Мой уровень</p>
					<p className='text-[#272343] text-xl font-medium py-[14px] px-[45px] rounded-full bg-tertiary'>
						{user.my_level}
					</p>
				</div>
				<div className='flex gap-x-11'>
					<button className='accent-btn' onClick={handleClick}>
						Принять заявку
					</button>
					<button className='little-text-btn' onClick={handleClick2}>
						Отказать
					</button>
				</div>
			</div>
		</div>
	)
}

interface Params extends ParsedUrlQuery {
	id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const users = await MentorService.getAllUser()
	return {
		paths: users.map(user => ({
			params: {
				id: String(user.id),
			},
		})),

		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const user = await MentorService.getUserByID(Number(params?.id))

	return {
		props: { user },
	}
}

export default UserModal
