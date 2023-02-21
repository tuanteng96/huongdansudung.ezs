import clsx from 'clsx'
import React, { useState, Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}

function Navbar(props) {
  const { PostsCate, LoadingList } = useSelector(({ posts }) => ({
    PostsCate: posts.PostsCate,
    LoadingList: posts.LoadingList
  }))
  const [CountSlice, setCountSlice] = useState(5)

  const { cate } = useParams()

  const getActive = arr => {
    return arr && arr.some(x => x.slug === cate) && 'active'
  }

  const getNameActive = () => {
    const index = PostsCate && PostsCate.findIndex(x => x.slug === cate)
    if (index > -1) {
      return PostsCate[index].name
    }
  }

  const handleClick = e => {
    if (LoadingList) e.preventDefault()
  }

  return (
    <Fragment>
      <ul className="nav-menu h-100 d-none d-md-flex">
        {PostsCate &&
          PostsCate.slice(0, CountSlice).map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={handleClick}
                to={`/${item.slug}-${item.id}`}
                //className={clsx(cate === item.slug && 'active')}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: item?.name
                  }}
                ></span>
              </NavLink>
            </li>
          ))}
        {PostsCate && PostsCate.length > CountSlice && (
          <li>
            <div
              className={clsx(
                'more',
                getActive(PostsCate.slice(CountSlice, PostsCate.length))
              )}
            >
              Xem thêm <i className="fa-regular fa-angle-down"></i>
            </div>
            <PerfectScrollbar
              options={perfectScrollbarOptions}
              className="scroll nav-menu-sub"
              style={{ position: 'relative' }}
            >
              <ul>
                {PostsCate.slice(CountSlice, PostsCate.length).map(
                  (item, index) => (
                    <li key={index}>
                      <NavLink
                        onClick={handleClick}
                        to={`/${item.slug}-${item.id}`}
                        //className={clsx(cate === item.slug && 'active')}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.name
                          }}
                        ></span>
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </PerfectScrollbar>
          </li>
        )}
      </ul>
      <div className="h-100 d-flex align-items-center d-md-none">
        <Dropdown className="nav-menu-dropdown">
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            <span>{getNameActive()}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {PostsCate &&
              PostsCate.map((item, index) => (
                <Dropdown.Item
                  href={`/${item.slug}-${item.id}`}
                  key={index}
                  active={item.slug === cate}
                  onClick={handleClick}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item?.name
                    }}
                  ></span>
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Fragment>
  )
}

export default Navbar
