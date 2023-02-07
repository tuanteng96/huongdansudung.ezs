import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from 'src/features/Home/Home'
import DetailPost from 'src/features/Home/pages/DetailPost'

function Routers(props) {
  const [UrlHome, setUrlHome] = useState('')
  const { PostsCate } = useSelector(({ posts }) => ({
    PostsCate: posts.PostsCate
  }))

  useEffect(() => {
    if (PostsCate && PostsCate.length > 0) {
      setUrlHome(`${PostsCate[0].slug}-${PostsCate[0].id}`)
    }
  }, [PostsCate])

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {UrlHome && <Route index element={<Navigate to={UrlHome} replace />} />}
        <Route path=":cate-:cateid" element={<DetailPost />}>
          <Route path=":slug.html" element={<DetailPost />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
