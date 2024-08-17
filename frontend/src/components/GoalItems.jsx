import { deleteGoals } from "../features/auth/goalSlice"
import { useDispatch } from "react-redux"

const GoalItems = ({goal}) => {
    const dispatch = useDispatch()

  return (
    <div className="flex justify-between">
        <div>{new Date(goal.createdAt).toLocaleString()}</div>
        <div className="text-yellow-400 self-center">{goal.text}</div>
        <button onClick={()=>{dispatch(deleteGoals(goal._id))}} className="text-8xl text-red-600">X</button>
    </div>
  )
}

export default GoalItems