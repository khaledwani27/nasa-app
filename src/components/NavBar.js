import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar(props) {
  return (
    <header>
      <div id="main-header" >
        <div id="main-links" className="container">
          <NavLink to="/" activeclassname="active">Home</NavLink>
          <NavLink to="/search" activeclassname="active">Search</NavLink>
          <NavLink to="/favourites" activeclassname="active">Favourites</NavLink>
        </div>
      </div>
    </header>
  )

}

export default NavBar



