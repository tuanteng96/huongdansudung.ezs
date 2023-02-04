import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postsApi from 'src/api/posts.api'

export const getCateID = createAsyncThunk('/list', async (id, thunkAPI) => {
  try {
    const { data: ListCates } = await postsApi.getListParentCate(id)
    const ListCatesOrder = ListCates.sort(
      (a, b) => a?.acf?.vi_tri - b?.acf?.vi_tri
    )
    const { data: ListPosts } = await postsApi.getListPostsID(
      ListCatesOrder[0].id
    )
    const { data: ListCatesParent } = await postsApi.getListParentCate(
      ListCatesOrder[0].id
    )
    const result = ListCatesParent.map(item => ({
      ...item,
      Items: ListPosts.filter(post => post.categories.includes(item.id)).sort(
        (a, b) => a?.acf?.vi_tri - b?.acf?.vi_tri
      )
    })).sort((a, b) => a?.acf?.vi_tri - b?.acf?.vi_tri)
    console.log(ListCatesOrder[0].slug)
    console.log(ListCatesParent)
    console.log(result)
    return {
      PostsList: result,
      PostsCate: ListCatesOrder
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const Posts = createSlice({
  name: 'posts',
  initialState: {
    PostsList: null,
    PostsCate: null
  },
  reducers: {},
  extraReducers: {
    [getCateID.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        PostsList: payload.PostsList,
        PostsCate: payload.PostsCate
      }
    }
  }
})

const { reducer } = Posts // actions
//export const { setToken } = actions
export default reducer
