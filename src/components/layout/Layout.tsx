import React, { FC, PropsWithChildren } from 'react'
import Footer from '../footer/Footer'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'

const DynamicSidebarWithNoSSR = dynamic(() => import('../navbar/Navbar'), {
	ssr: false,
})

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div>
			<DynamicSidebarWithNoSSR />
			<Toaster />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
