import { deleteAccount } from '@/redux/apiCalls'
import DefaultInputs from '@/components/inputs/default'
import PasswordInputs from '@/components/inputs/password'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

interface IProps {
	setModal: Dispatch<SetStateAction<boolean>>
	modal: boolean
}

const DeleteModal: FC<IProps> = ({ setModal, modal }) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isVisPass, setIsVisPass] = useState<boolean>(false)

	const { tokens, error } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	function handleDelete() {
		if (!email.trim() || !password.trim()) {
			toast.error('Some inputs are empty', {
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
		const user = {
			email,
			password,
		}

		deleteAccount(dispatch, user, tokens?.access)

		if (!error) setModal(false)
	}

	return (
		<div
			className={`${
				modal
					? 'z-1 opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-1 opacity-0'
			} w-full h-full bg-[rgba(179,179,179,0.4)] fixed top-0 flex duration-200 justify-center items-center`}
			onClick={() => setModal(false)}
		>
			<Toaster />
			<div
				className='h-[23rem] rounded-2xl bg-[#fffffe] px-36 flex items-center'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex items-end gap-x-16'>
					<div className='w-[25.6rem] flex flex-col gap-y-8'>
						<DefaultInputs state={email} setState={setEmail} label='Email' />
						<PasswordInputs
							setState={setPassword}
							state={password}
							label='Пароль'
							setPassVis={setIsVisPass}
							passVis={isVisPass}
						/>
					</div>
					<button
						onClick={handleDelete}
						className='mt-12 py-[1.08rem] px-[2.4rem] bg-little-text rounded-md text-[#fffffe] text-sm hover:bg-tertiary active:bg-[#C9FFFF] hover:duration-300 duration-300 hover:text-paragraph mb-9'
					>
						Удалить профиль
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
