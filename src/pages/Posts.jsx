import React, {useState, useMemo, useRef, useEffect} from 'react'
import '../styles/App.css'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import MyModal from '../components/UI/MyModal/MyModal'
import MyButton from '../components/UI/button/MyButton'
import {usePosts} from '../hooks/usePosts'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import {useFetching} from '../hooks/useFetching'
import {getPageCount} from '../utils/pages'
//import Pagination from '../components/UI/pagination/Pagination.jsx'

function Posts(){

  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()
  const observer = useRef()
  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  useEffect(() => {
    if(isPostsLoading) return
    if(observer.current) observer.current.disconnect()

    let callback = function(entries, observer){
      if (entries[0].isIntersecting && page < totalPages){
        setPage(page+1)
      }
    }
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(lastElement.current)
  }, [isPostsLoading])

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className='App'>
      
      <MyButton
        style={{marginTop:10}}
        onClick={() => setModal(true)}
      >
        Create post
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      
      <div style={{margin: '15px 0'}} />

     <PostFilter
      filter={filter}
      setFilter={setFilter}
     />
     {
       postError &&
        <h1>Error ${postError}</h1>
     }

    <PostList posts={sortedAndSearchedPosts} remove={removePost} title='List of the posts' />
    <div ref={lastElement} style={{height:20, background:'white'}} />

     {isPostsLoading &&
      <div style={{display:'flex', justifyContent:'center', marginTop:50}}><Loader /></div>
     }     
     
    </div>
  )
}

export default Posts

//<Pagination page={page} totalPages={totalPages} changePage={changePage}/>