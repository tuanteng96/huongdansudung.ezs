import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutSplashScreen } from 'src/layout/_core/SplashScreen'
import { getCateID } from '../Home/HomeSlice'

function AuthInit(props) {
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const { PostsCate } = useSelector(({ posts }) => ({
    PostsCate: posts.PostsCate
  }))
  const dispatch = useDispatch()
  // We should request user by authToken before rendering the application

  useEffect(() => {
    dispatch(getCateID(21))
  }, [dispatch])

  useEffect(() => {
    if (PostsCate) {
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostsCate])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default AuthInit
