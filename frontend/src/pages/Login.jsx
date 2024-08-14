import {useEffect, useState} from 'react'
import { FaSignInAlt  } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate =useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect (() => {
    if(isError) {
      toast.error(message)
    }

    if(user){
      navigate('/')
    } 

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate])

  const onChange = (e) => {
    setFormData((preState)=>({
      ...preState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))

  }

  if ( isLoading )
  {
    return <Spinner />
  }

  return (
    <>
      <section className="pt-8">
      <h1 className='text-5xl  inline-flex'>
        <FaSignInAlt className='pr-3 size-9' /> Login
      </h1>
      <p className='pt-2'>Pls login and set your goals</p>
    </section>

    <section className='p-4 px-40 '>


  <form className='form flex flex-col items-center ' onSubmit={onSubmit}>
    <input 
      type='email'  
      className='border-2 border-red-200 rounded-md p-2 w-[450px] my-2 ' 
      id='email' 
      value={formData.email} 
      onChange={onChange} 
      placeholder='Email' 
    />
    <input 
      type='password' 
      className='border-2 border-red-200 rounded-md p-2 w-[450px] my-2 ' 
      id='password' 
      value={formData.password} 
      onChange={onChange} 
      placeholder='Password' 
    />
    <button type="submit" className='bg-slate-900 w-80 text-stone-100 text-4xl my-4 ' >Login</button>
  </form>
</section>

    </>
)}

export default Login