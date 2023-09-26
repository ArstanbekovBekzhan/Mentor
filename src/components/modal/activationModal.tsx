import DefaultInputs from '@/components/inputs/default'
import { API, login } from '@/redux/apiCalls'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

interface IProps {
	modal: boolean
	setModal: Dispatch<SetStateAction<boolean>>
	email: string
	password: string
}

const ActivationModal: FC<IProps> = ({ modal, setModal, email, password }) => {
	const [code, setCode] = useState<string>('')

	const dispatch = useDispatch()

	const router = useRouter()

	async function handleSend() {
		if (!code.trim()) {
			toast.error('Некоторые входы пусты', {
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

		console.log(code)

		try {
			await axios.post(`${API}account/activate/${code}/`)
			setModal(false)
			setTimeout(() => {
				const user = {
					email,
					password,
				}

				login(dispatch, user, router)
			}, 2000)
			toast.success('Аккаунт активирован', {
				style: {
					borderRadius: '6px',
					background: '#333',
					color: '#fff',
					padding: '20px auto',
					fontSize: '20px',
				},
			})
		} catch (err) {
			console.log(err)
			toast.error('Произошла ошибка', {
				style: {
					borderRadius: '6px',
					background: '#333',
					color: '#fff',
					padding: '20px auto',
					fontSize: '20px',
				},
			})
		}
	}

	return (
		<div
			className={`${
				modal
					? 'z-2 opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-1 opacity-0'
			} w-full h-full bg-[rgba(179,179,179,0.4)] fixed top-0 flex duration-200 justify-center items-center`}
		>
			<Toaster />
			<div className='w-[53.4rem] text-center rounded-2xl bg-secondary py-12 px-14'>
				<h3 className='text-2xl text-paragraph font-semibold'>Последний шаг</h3>
				<p className='mt-11 mb-14 text-xl text-little-text font-medium'>
					К вам на почту пришло письмо с кодом для активации <br /> аккаунта.
					Вам необходимо будет пройти на почту, <br /> скопировать код и
					вставить его в поле, чтобы <br /> завершить регистрацию. <br /> <br />
					<span className='text-[rgba(#485174, 70%)]'>
						Обратите внимание: письмо может попасть в папку Спам, <br />{' '}
						обязательно проверьте ее.
					</span>
				</p>
				<DefaultInputs label='Введите код' state={code} setState={setCode} />
				<button
					onClick={handleSend}
					className='bg-little-text px-14 py-3 rounded-[0.63rem] text-xl text-[#fffffe] hover:bg-tertiary hover:text-little-text active:bg-active hover:duration-150 duration-200 mt-11'
				>
					Start
				</button>
			</div>
		</div>
	)
}

export default ActivationModal
