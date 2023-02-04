import clsx from 'clsx'
import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '../../_assets/sass/pages/_posts.scss'
import SidebarLeft from './components/Sidebar/SidebarLeft'

export const PostsContext = createContext('light')

export default function Home() {
  const [show, setShow] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (show) {
      onHide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const onOpen = () => {
    setShow(true)
  }

  const onHide = () => {
    setShow(false)
  }

  return (
    <PostsContext.Provider value={{ show: show, onOpen: onOpen }}>
      <div className="posts-page">
        <div className={clsx('posts-page__left', show && 'show')}>
          <SidebarLeft />
        </div>
        <div className="posts-page__content">
          <Outlet />
        </div>
        {show && <div className="_bg" onClick={onHide}></div>}
      </div>
    </PostsContext.Provider>
  )
}
