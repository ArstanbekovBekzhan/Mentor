import React from 'react'

const FAQ = () => {
	return (
		<div className='flex flex-col items-center'>
			<h4 className='text-title font-bold text-5xl mb-10'>FAQ</h4>
			<div id='accordionExample' className='w-[80%]'>
				<div className='rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-secondary'>
					<h2 className='mb-0' id='flush-headingTwo'>
						<button
							className='group relative flex w-full items-center rounded-none border-0 bg-white py-8 px-5 text-left text-2xl font-medium transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none '
							type='button'
							data-te-collapse-init
							data-te-collapse-collapsed
							data-te-target='#flush-collapseOne'
							aria-expanded='false'
							aria-controls='flush-collapseOne'
						>
							<span className=' mr-[4rem] shrink-0 rotate-[90deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-[4rem] group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none '>
								<svg
									width='18'
									height='30'
									viewBox='0 0 18 30'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M16.5 16.7625L5.02495 28.2375C4.04995 29.2125 2.47495 29.2125 1.49995 28.2375C0.52495 27.2625 0.52495 25.6875 1.49995 24.7125L11.2 14.9875L1.49995 5.2875C0.52495 4.3125 0.52495 2.7375 1.49995 1.7625C2.47495 0.7875 4.04995 0.7875 5.02495 1.7625L16.5 13.2375C17.475 14.1875 17.475 15.7875 16.5 16.7625Z'
										fill='#FFD803'
										stroke='#2D334A'
									/>
								</svg>
							</span>
							Зачем всё это?
						</button>
					</h2>
					<div
						id='flush-collapseOne'
						className='!visible hidden border-0'
						data-te-collapse-item
						aria-labelledby='flush-headingOne'
						data-te-parent='#accordionFlushExample'
					>
						<div className='py-4 px-5 text-lg'>
							Мы видим огромную потребность у современных специалистов в
							наставниках, которые помогали бы им преодолевать трудности и
							научили бы тонкостям и тайным знаниям. Этот сервис — попытка
							построить комьюнити наставников и учеников, чтобы облегчить им
							поиск друг друга.
						</div>
					</div>
				</div>
				<div className='rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-secondary'>
					<h2 className='mb-0' id='flush-headingTwo'>
						<button
							className='group relative flex w-full items-center rounded-none border-0 bg-white py-8 px-5 text-left text-2xl font-medium transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none '
							type='button'
							data-te-collapse-init
							data-te-collapse-collapsed
							data-te-target='#flush-collapseTwo'
							aria-expanded='false'
							aria-controls='flush-collapseTwo'
						>
							<span className=' mr-[4rem] shrink-0 rotate-[90deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-[4rem] group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none '>
								<svg
									width='18'
									height='30'
									viewBox='0 0 18 30'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M16.5 16.7625L5.02495 28.2375C4.04995 29.2125 2.47495 29.2125 1.49995 28.2375C0.52495 27.2625 0.52495 25.6875 1.49995 24.7125L11.2 14.9875L1.49995 5.2875C0.52495 4.3125 0.52495 2.7375 1.49995 1.7625C2.47495 0.7875 4.04995 0.7875 5.02495 1.7625L16.5 13.2375C17.475 14.1875 17.475 15.7875 16.5 16.7625Z'
										fill='#FFD803'
										stroke='#2D334A'
									/>
								</svg>
							</span>
							Я записался к ментору. Что теперь?
						</button>
					</h2>
					<div
						id='flush-collapseTwo'
						className='!visible hidden border-0'
						data-te-collapse-item
						aria-labelledby='flush-headingTwo'
						data-te-parent='#accordionFlushExample'
					>
						<div className='py-4 px-5 text-lg'>
							Отлично! Сразу после того, как ты оставил заявку на менторство, мы
							передаём её выбранному эксперту. Он или она рассмотрят её в
							течение пары дней. Если ментор решит, что готов помочь по этой
							заявке, то он сам свяжется с тобой для выбора времени и способа
							встречи. Однако может случиться такое, что ментор решит отказаться
							от заявки. Это не значит, что ты сделал что-то не так, просто у
							ментора может не быть времени или необходимой экспертизы. В этом
							случае мы обязательно оповестим тебя об отказе, чтобы ты мог найти
							себе другого специалиста.
						</div>
					</div>
				</div>
				<div className='rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-secondary'>
					<h2 className='mb-0' id='flush-headingThree'>
						<button
							className='group relative flex w-full items-center rounded-none border-0 bg-white py-8 px-5 text-left text-2xl font-medium transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none '
							type='button'
							data-te-collapse-init
							data-te-collapse-collapsed
							data-te-target='#flush-collapseThree'
							aria-expanded='false'
							aria-controls='flush-collapseThree'
						>
							<span className=' mr-[4rem] shrink-0 rotate-[90deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-[4rem] group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none '>
								<svg
									width='18'
									height='30'
									viewBox='0 0 18 30'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M16.5 16.7625L5.02495 28.2375C4.04995 29.2125 2.47495 29.2125 1.49995 28.2375C0.52495 27.2625 0.52495 25.6875 1.49995 24.7125L11.2 14.9875L1.49995 5.2875C0.52495 4.3125 0.52495 2.7375 1.49995 1.7625C2.47495 0.7875 4.04995 0.7875 5.02495 1.7625L16.5 13.2375C17.475 14.1875 17.475 15.7875 16.5 16.7625Z'
										fill='#FFD803'
										stroke='#2D334A'
									/>
								</svg>
							</span>
							Сколько это стоит?
						</button>
					</h2>
					<div
						id='flush-collapseThree'
						className='!visible hidden border-0'
						data-te-collapse-item
						aria-labelledby='flush-headingThree'
						data-te-parent='#accordionFlushExample'
					>
						<div className='py-4 px-5 text-lg'>
							Мы хотим построить сообщество, поэтому не хотим приплетать в
							процесс деньги. Однако мы понимаем, что время эксперта может
							чего-то стоить. Поэтому у нас каждый ментор сам назначает
							стоимость своей консультации, которую мы затем показываем на
							карточке. Эта цена носит рекомендательный характер и всегда
							обсуждается с экспертом напрямую. При этом наша площадка абсолютно
							ничего не берёт себе из этой цены.
						</div>
					</div>
				</div>
				<div className='rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-secondary'>
					<h2 className='mb-0' id='flush-headingFour'>
						<button
							className='group relative flex w-full items-center rounded-none border-0 bg-white py-8 px-5 text-left text-2xl font-medium transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none '
							type='button'
							data-te-collapse-init
							data-te-collapse-collapsed
							data-te-target='#flush-collapseFour'
							aria-expanded='false'
							aria-controls='flush-collapseFour'
						>
							<span className=' mr-[4rem] shrink-0 rotate-[90deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-[4rem] group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none '>
								<svg
									width='18'
									height='30'
									viewBox='0 0 18 30'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M16.5 16.7625L5.02495 28.2375C4.04995 29.2125 2.47495 29.2125 1.49995 28.2375C0.52495 27.2625 0.52495 25.6875 1.49995 24.7125L11.2 14.9875L1.49995 5.2875C0.52495 4.3125 0.52495 2.7375 1.49995 1.7625C2.47495 0.7875 4.04995 0.7875 5.02495 1.7625L16.5 13.2375C17.475 14.1875 17.475 15.7875 16.5 16.7625Z'
										fill='#FFD803'
										stroke='#2D334A'
									/>
								</svg>
							</span>
							Как мне стать ментором?
						</button>
					</h2>
					<div
						id='flush-collapseFour'
						className='!visible hidden border-0'
						data-te-collapse-item
						aria-labelledby='flush-headingFour'
						data-te-parent='#accordionFlushExample'
					>
						<div className='py-4 px-5 text-lg'>
							Очень просто. Достаточно оставить заявку, и мы обязательно вас
							добавим.
						</div>
					</div>
				</div>
				<div className='rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-secondary'>
					<h2 className='mb-0' id='flush-headingFive'>
						<button
							className='group relative flex w-full items-center rounded-none border-0 bg-white py-8 px-5 text-left text-2xl font-medium transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none '
							type='button'
							data-te-collapse-init
							data-te-collapse-collapsed
							data-te-target='#flush-collapseFive'
							aria-expanded='false'
							aria-controls='flush-collapseFive'
						>
							<span className=' mr-[4rem] shrink-0 rotate-[90deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-[4rem] group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none '>
								<svg
									width='18'
									height='30'
									viewBox='0 0 18 30'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M16.5 16.7625L5.02495 28.2375C4.04995 29.2125 2.47495 29.2125 1.49995 28.2375C0.52495 27.2625 0.52495 25.6875 1.49995 24.7125L11.2 14.9875L1.49995 5.2875C0.52495 4.3125 0.52495 2.7375 1.49995 1.7625C2.47495 0.7875 4.04995 0.7875 5.02495 1.7625L16.5 13.2375C17.475 14.1875 17.475 15.7875 16.5 16.7625Z'
										fill='#FFD803'
										stroke='#2D334A'
									/>
								</svg>
							</span>
							Я не нашёл ментора. Что делать?
						</button>
					</h2>
					<div
						id='flush-collapseFive'
						className='!visible hidden border-0'
						data-te-collapse-item
						aria-labelledby='flush-headingFive'
						data-te-parent='#accordionFlushExample'
					>
						<div className='py-4 px-5 text-lg'>
							Так бывает, но не нужно расстраиваться. Ты можешь поделиться
							ссылкой на этот сайт в своих сетях, чтобы больше людей узнало о
							площадке и пришло сюда в качестве экспертов.
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FAQ
