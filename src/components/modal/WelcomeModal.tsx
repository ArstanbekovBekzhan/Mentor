import React, { FC, useState } from 'react'

interface ITelegramModal {
	setTelegramModal: (modal: boolean) => void
}

const WelcomeModal: FC<ITelegramModal> = ({ setTelegramModal }) => {
	const [modal, setModal] = useState(true)
	return (
		<div
			className={`${
				modal
					? 'z-1 opacity-100 backdrop-blur-[9px] duration-200'
					: '-z-1 opacity-0'
			} w-full h-full bg-[rgba(179,179,179,0.4)] fixed top-0 flex duration-200 justify-center items-center`}
			onClick={() => setModal(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='w-[53.4rem] h-[23rem] text-center rounded-2xl bg-secondary py-14 px-36'
			>
				<h3 className='text-2xl text-paragraph font-semibold mb-4'>
					Добро пожаловать в <br /> команду !
				</h3>
				<p className='text-little-text text-xl leading-[160%] mb-4 '>
					Если желаете получать уведомления о запросах от менти в телеграм, то
					пройдите по ссылке и активируйте Бот нажатием кнопки "Старт"
				</p>
				<button
					className='text-white bg-little-text py-3 px-14 rounded-[10px] text-xl'
					onClick={() => {
						setModal(false)
						setTelegramModal(true)
					}}
				>
					<a href='https://t.me/GetMentorKG_bot'>Start</a>
				</button>
				<div className='flex justify-center gap-x-12'></div>
			</div>
		</div>
	)
}

export default WelcomeModal
