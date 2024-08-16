import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../features/auth/goalSlice"

const GoalForm = () => {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({text}))
        setText('')
    }


  return (
    <section className="form">
        <form onSubmit={onSubmit}>
        <div className="flex pt-9 flex-col items-center ">
            <label className="flex text-gray-500  font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Goal
            </label>

            <input className="flex bg-gray-200 appearance-none 
                w-1/2 border-2 border-gray-200 rounded py-2 px-4
             text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name" type="text" value={text} onChange={(e)=>{setText(e.target.value)}} />
        </div>
        <div>
            <button type="submit" className="btn bg-green-900 text-slate-100 m-6 w-1/2 hover:scale-[1.2]">
                Add goal
            </button>
        </div>
        </form>
    </section>
  )
}

export default GoalForm