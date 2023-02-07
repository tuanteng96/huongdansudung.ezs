import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postsApi from 'src/api/posts.api'

export const getCateID = createAsyncThunk('/list', async (id, thunkAPI) => {
  try {
    const { data: ListCates } = await postsApi.getListParentCate(id)
    return ListCates.sort((a, b) => a?.acf?.vi_tri - b?.acf?.vi_tri)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getListPostsID = createAsyncThunk(
  '/list-cate',
  async (id, thunkAPI) => {
    try {
      const { data: ListPosts } = await postsApi.getListPostsID(id)
      const { data: CurrentCate } = await postsApi.getCateID(id)
      return [
        {
          ...CurrentCate,
          Items: ListPosts
            ? ListPosts.sort((a, b) => a?.acf?.vi_tri - b?.acf?.vi_tri)
            : []
        }
      ]
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const Posts = createSlice({
  name: 'posts',
  initialState: {
    PostsCate: null,
    PostsList: null
  },
  reducers: {},
  extraReducers: {
    [getCateID.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        PostsCate: payload
      }
    },
    [getListPostsID.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        PostsList: payload
      }
    }
  }
})

const { reducer } = Posts // actions
//export const { setToken } = actions
export default reducer
