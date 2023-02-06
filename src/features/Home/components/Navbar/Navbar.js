import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

function Navbar(props) {
  const { PostsCate } = useSelector(({ posts }) => ({
    PostsCate: posts.PostsCate
  }))

  const { cate } = useParams()

  return (
    <ul className="nav-menu">
      {PostsCate &&
        PostsCate.map((item, index) => (
          <li key={index}>
            <NavLink
              to={`/${item.slug}-${item.id}`}
              className={clsx(cate === item.slug && 'active')}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: item?.name
                }}
              ></span>
            </NavLink>
          </li>
        ))}
    </ul>
  )
}

export default Navbar
