import React, { FC, PropsWithChildren } from 'react'
import SideBar from '../sidebar'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicSidebarWithNoSSR = dynamic(() => import('../navbar/Navbar'), {
	ssr: false,
})

const LayoutAccount: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { pathname } = useRouter()

	return (
		<>
			<DynamicSidebarWithNoSSR />
			<div
				className={`flex ${
					pathname === '/profile/my-requests' ? '' : 'gap-x-28'
				} items-start mt-16`}
			>
				<div className='w-72'>
					<SideBar />
				</div>
				{children}
			</div>
		</>
	)
}

export default LayoutAccount
