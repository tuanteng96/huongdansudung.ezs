import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Navbar(props) {
  const { PostsCate } = useSelector(({ posts }) => ({
    PostsCate: posts.PostsCate
  }))

  return (
    <div>
      <ul className="menu-nav">
        {PostsCate &&
          PostsCate.map((item, index) => (
            <li key={index}>
              <NavLink className="menu-link menu-toggle" to="/">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item?.name
                  }}
                ></span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Navbar
