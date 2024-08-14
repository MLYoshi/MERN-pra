import { Link } from "react-router-dom"
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, reset } from "../features/auth/authSlice"

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className="flex justify-between py-4 bg-slate-300 text-emerald-800 text-2xl">
        <div className="logo">
            <Link className="pl-5" to={'/'}>GoalSetter</Link>
        </div>
        <ul className="flex gap-5 pr-3">
            { user ? <button onClick={onLogout} className="flex flex-row">
                <FaSignOutAlt className="pr-[2px] pt-[5px] size-8" /> Logout
            </button> : 
            <>
                <li>
                    <Link className="flex" to={'/login'}><FaSignInAlt className="pr-2" />login</Link>
                </li>
                <li>
                    <Link className="flex" to={'/register'}><FaUser className="pr-2" />register</Link>
                </li>
            </>}
        </ul>
    </header>
  )
}

export default Header