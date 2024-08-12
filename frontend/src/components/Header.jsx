import { Link } from "react-router-dom"
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"

const Header = () => {
  return (
    <header className="flex justify-between py-4 bg-slate-400 text-emerald-800 text-2xl">
        <div className="logo">
            <Link className="pl-5" to={'/'}>GoalSetter</Link>
        </div>
        <ul className="flex gap-5 pr-3">
            <li>
                <Link className="flex" to={'/login'}><FaSignInAlt className="pr-2" />login</Link>
            </li>
            <li>
                <Link className="flex" to={'/register'}><FaUser className="pr-2" />register</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header