import { ISpecializationsFilter } from '@/types/types'
import React, { FC } from 'react'

type THandleCategorySelect = (category: string) => void

interface ISelectFilter {
	specializations: ISpecializationsFilter
	handleCategorySelect: THandleCategorySelect
	selectedCategories: string[]
}

const SelectFilter: FC<ISelectFilter> = ({
	handleCategorySelect,
	specializations,
	selectedCategories,
}) => {
	return (
		<div className='flex justify-center'>
			<div>
				<div className='relative' data-te-dropdown-ref>
					<button
						className={`
						)} flex items-center justify-center whitespace-nowrap rounded-[90px]  w-[11.5rem] bg-tertiary px-6 py-3 text-base font-medium leading-normal text-title shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-title hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-title focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),
							focus:text-white
							0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none`}
						type='button'
						id='dropdownMenuButton1'
						data-te-dropdown-toggle-ref
						aria-expanded='false'
						data-te-ripple-init
						data-te-ripple-color='light'
					>
						{specializations.name}
						<span className='ml-2 w-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								className='h-5 w-5'
							>
								<path
									fillRule='evenodd'
									d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
									clipRule='evenodd'
								/>
							</svg>
						</span>
					</button>
					<ul
						className='absolute z-[1000]  w-[11.5rem]  float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-[#2D334A] bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block'
						aria-labelledby='dropdownMenuButton1'
						data-te-dropdown-menu-ref
					>
						{specializations.specializations.map((specialization, index) => (
							<li
								key={index}
								onClick={() => {
									handleCategorySelect(specialization)
								}}
							>
								<a
									className={`${
										selectedCategories.includes(specialization)
											? 'text-white'
											: 'bg-tertiary'
									}  block w-full whitespace-nowrap py-2 px-4 text-sm font-normal  hover:bg-slate-600  active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 `}
									data-te-dropdown-item-ref
								>
									{specialization}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SelectFilter
