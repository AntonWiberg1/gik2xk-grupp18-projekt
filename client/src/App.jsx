import { Link, Outlet } from "react-router-dom"

function App() {


  return (
    <>
      <ul>
      <li> 
          <Link to="/">Webshop</Link>
        </li>
        <li> 
          <Link to="/products/new">Skapa inlägg</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default App
