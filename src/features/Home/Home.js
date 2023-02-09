import clsx from 'clsx'
import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import '../../_assets/sass/pages/_posts.scss'
import Navbar from './components/Navbar/Navbar'
import PostSearch from './components/PostSearch/PostSearch'
import SidebarLeft from './components/Sidebar/SidebarLeft'
import { getListPostsID } from './HomeSlice'

export const PostsContext = createContext('light')

export default function Home() {
  const [show, setShow] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()

  const { cateid } = useParams()
  useEffect(() => {
    if (cateid) {
      dispatch(getListPostsID(cateid))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateid, dispatch])

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
          <div className="h-100 bg-white">
            <div className="title-top justify-content-between">
              <div className="h-100 d-flex">
                <Navbar />
              </div>
              <div className="d-flex">
                <PostSearch />
                <div className="btn-menu" onClick={onOpen}>
                  <i className="fa-solid fa-bars"></i>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
        {show && <div className="_bg" onClick={onHide}></div>}
      </div>
    </PostsContext.Provider>
  )
}
