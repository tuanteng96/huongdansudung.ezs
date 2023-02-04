import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from 'src/features/Home/Home'
import DetailPost from 'src/features/Home/pages/DetailPost'

function Routers(props) {
  const [UrlHome, setUrlHome] = useState('')
  const { PostsList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList
  }))

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if (
      PostsList &&
      PostsList.length > 0 &&
      PostsList[0].Items &&
      PostsList[0].Items.length > 0
    ) {
      setUrlHome(
        `${PostsList[0].slug}/${PostsList[0].Items[0].slug}.html${
          id ? '?id=' + id : ''
        }`
      )
    }
  }, [PostsList])

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {UrlHome && <Route index element={<Navigate to={UrlHome} replace />} />}
        <Route path=":cate/:slug.html" element={<DetailPost />} />
      </Route>
    </Routes>
  )
}

export default Routers
