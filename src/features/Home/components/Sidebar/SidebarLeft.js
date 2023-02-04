import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useQuery from 'src/hooks/useQuery'
import SVG from 'react-inlinesvg'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'
import clsx from 'clsx'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

function NavItems({ cate, onChangeCate, CateActive }) {
  const [active, setActive] = useState(false)
  const { slug } = useParams()
  const { id } = useQuery()

  useEffect(() => {
    if (cate.Items) {
      const index = cate.Items.findIndex(post => post.slug === slug)
      if (index > -1) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
  }, [cate, slug])

  const onChangeActive = ({ slug }) => {
    if (active) {
      setActive(false)
    } else {
      onChangeCate(slug)
    }
  }

  return (
    <li
      className={clsx(CateActive === cate.slug && 'active', active && 'active')}
    >
      <NavLink to="#" onClick={() => onChangeActive(cate)}>
        <span className="svg-icon">
          <SVG
            src={AssetsHelpers.toAbsoluteUrl(
              '/media/svg/icons/Design/Layers.svg'
            )}
          />
        </span>
        <span className="text">{cate.name}</span>
        <i className="menu-arrow"></i>
      </NavLink>
      <ul>
        {cate.Items &&
          cate.Items.map((item, idx) => (
            <li key={idx}>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={`${cate.slug}/${item.slug}.html${id ? '?id=' + id : ''}`}
              >
                <i className="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${idx + 1}. ${item?.title.rendered}`
                  }}
                ></span>
              </NavLink>
            </li>
          ))}
      </ul>
    </li>
  )
}

function SidebarLeft(props) {
  const { PostsList } = useSelector(({ posts }) => ({
    PostsList: posts.PostsList
  }))
  const [CateActive, setCateActive] = useState()

  const onChangeCate = patch => {
    setCateActive(prevState => (prevState === patch ? '' : patch))
  }

  return (
    <Fragment>
      <div className="top">
        <h4>Hướng dẫn sử dụng EZS.VN</h4>
      </div>
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="scroll sidebar-navs"
        style={{ position: 'relative' }}
      >
        <ul>
          {PostsList &&
            PostsList.map((cate, index) => (
              <NavItems
                cate={cate}
                key={index}
                onChangeCate={onChangeCate}
                CateActive={CateActive}
              />
            ))}
        </ul>
      </PerfectScrollbar>
    </Fragment>
  )
}

export default SidebarLeft
