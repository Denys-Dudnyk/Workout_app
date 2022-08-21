import React from 'react'

import Layout from '../../common/Layout'
import bgImage from '../../../images/new-workout-bg.jpg'
import { useNavigate } from 'react-router-dom'

const NewWorkout = () => {
	const history = useNavigate()
	return <Layout bgImage={bgImage} backCallback={() => history(-1)}></Layout>
}

export default NewWorkout
