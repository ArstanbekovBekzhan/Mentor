import MentorDetail from '@/components/mentor/MentorDetail'
import { IMentorSingle } from '@/types/mentor.interface'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import MentorService from '../../services/mentor.services'

const MentorPage: NextPage<IMentorSingle> = ({ mentor }) => {
	return <MentorDetail mentor={mentor} />
}

interface Params extends ParsedUrlQuery {
	id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const mentors = await MentorService.getAll()
	return {
		paths: mentors.map(mentor => ({
			params: {
				id: String(mentor.id),
			},
		})),

		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps<IMentorSingle> = async ({
	params,
}) => {
	const mentor = await MentorService.getById(Number(params?.id))

	return {
		props: { mentor },
	}
}

export default MentorPage
