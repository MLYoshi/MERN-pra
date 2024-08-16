import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import GoalForm from '../components/GoalForm'

const Dashboard = () => {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <section className="heading pt-8">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      <GoalForm />
    </section>
  )
}

export default Dashboard