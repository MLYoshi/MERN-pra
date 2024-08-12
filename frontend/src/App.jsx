import {BrowserRouter , Routes, Route} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/Dashboard"
import Header from "./components/header"

const App = () => {
  return (
    <>
    
    <div >
      <BrowserRouter className="flex">
        <Header  />
        <Routes className="self-center items-center" >
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App