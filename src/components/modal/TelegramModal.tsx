import React, { FC, useState } from 'react'

interface ITelegramModal {
	setTelegramModal: (modal: boolean) => void
	telegramModal: boolean
}

const TelegramModal: FC<ITelegramModal> = ({
	setTelegramModal,
	telegramModal,
}) => {
	const [input, setInput] = useState('')

	function handleClick() {
		// userStatusUpdate()
		console.log(input)
	}
	return (
		<div
			className={`${
				telegramModal
					? 'z-1 opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-1 opacity-0'
			} w-full h-full bg-[rgba(179,179,179,0.4)] fixed top-0 flex duration-200 justify-center items-center`}
			onClick={() => setTelegramModal(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='text-center rounded-2xl bg-secondary py-[8.7rem] px-[3.3rem] flex flex-col justify-center items-center'
			>
				<div className='w-[34.5rem] mb-[0.6rem]'>
					<h3 className='text-2xl text-paragraph font-semibold mb-4'>
						Уважаемый ментор
					</h3>
					<p className='text-little-text text-xl leading-[160%]'>
						В Телеграм вам дан персональный код. Введите его в поле ниже.
					</p>
				</div>
				<div className='flex flex-col items-start mb-11'>
					<label className='text-xl text-title mb-3'>Введите код</label>
					<input
						type='text'
						className='w-[47rem] h-14 rounded-[6px] px-3  bg-transparent border-[1px] border-gray-400'
						onChange={e => setInput(e.target.value)}
					/>
				</div>

				<button
					className='text-white bg-little-text py-3 px-14 rounded-[10px] text-xl'
					onClick={() => {
						setTelegramModal(false)
						handleClick()
					}}
				>
					Продолжить
				</button>
				<div className='flex justify-center gap-x-12'></div>
			</div>
		</div>
	)
}

export default TelegramModal
