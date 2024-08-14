import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = formData

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

    if (password !== password2){
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return (<Spinner />)
  }

  return (
    <>
      <section className="pt-8">
      <h1 className='text-5xl  inline-flex'>
        <FaUser /> Register
      </h1>
      <p>Pls create an account</p>
    </section>

    <section className='p-4 px-40 '>


  <form className='form flex flex-col items-center ' onSubmit={onSubmit}>
    <input 
      type='text' 
      className='border-2 border-red-200 rounded-md p-2 w-[450px] my-2  ' 
      id='name' 
      value={formData.name}  
      onChange={onChange} 
      placeholder='Name' 
    />
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
    <input 
      type='password' 
      className='border-2 border-red-200 rounded-md p-2 w-[450px] my-2 ' 
      id='password2' 
      value={formData.password2} 
      onChange={onChange} 
      placeholder='Confirm Password' 
    />
    <button type="submit" className='bg-slate-900 w-80 text-stone-100 text-4xl my-4 ' >Submit</button>
  </form>
</section>

    </>
  )
}

export default Register