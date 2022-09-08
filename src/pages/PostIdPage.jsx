import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useFetching} from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div style={{width:'45vw', marginTop:30}}>
            <h1>PostIdPage with ID = {params.id}</h1>
        {isLoading
            ? <Loader />
            : <div style={{marginTop:10}}>{post.id}. {post.title}</div>
        }
        <h1 style={{marginTop:10}}>Comments</h1>
        {isComLoading
            ? <Loader />
            : <div>
                {comments.map(comment => 
                    <div key={comment.id} style={{marginTop:15}}>
                        <h5>{comment.email}</h5>
                        <div>{comment.body}</div>
                    </div>
                )}
              </div>  
        }
        </div>
    )
}

export default PostIdPage