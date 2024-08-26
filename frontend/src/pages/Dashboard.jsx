import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import GoalForm from '../components/GoalForm'
import { useDispatch } from 'react-redux'
import { getGoals, reset } from '../features/auth/goalSlice'
import Spinner from '../components/Spinner'
import GoalItems from '../components/GoalItems'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

  const {isError, isLoading, message, goal} = useSelector((state)=> state.goals)

  useEffect(()=>{
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    if(user){
      dispatch(getGoals())
    }

      dispatch(reset())

  }, [user, isError, message])

  if (isLoading){
    return <Spinner />
  }

  return (
    <section className="heading pt-8">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      <GoalForm />
      
      {!Array.isArray(goal) ? ( console.log('not array')) : (<section className='display '>
        {goal.length > 0 ? (<div className='px-28 py-10 [&>*:nth-child(odd)]:bg-cyan-600 [&>*:nth-child(even)]:bg-yellow-800'>
          { goal.map((goal) => (<GoalItems key={goal._id} goal={goal}/>))} </div>)
         : (<h1>you dont have goal</h1>)}
      </section>)}
    </section>
  )
}

export default Dashboard