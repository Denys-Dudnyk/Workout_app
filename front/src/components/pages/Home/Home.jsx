import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'
import bgImage from '../../../images/home-bg.jpg'

const Home = () => {
	return (
		<Layout height='100%' bgImage={bgImage}>
			<Button text='New' type='main' callback={() => {}} />
			<h1>EXERCISES FOR THE SHOULDERS</h1>
			<Counters />
		</Layout>
	)
}

export default Home
