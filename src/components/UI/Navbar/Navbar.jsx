import {useContext} from 'react'
import {Link} from 'react-router-dom'
import MyButton from '../button/MyButton'
import {AuthContext} from '../../../context'


const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')

    }

    return (
        isAuth
            ?
            <div className="navbar">
                
                <div className="navbar__links">
                    <Link className="link" to="/about">About</Link>
                    <Link className="link" to="/posts">Posts</Link>
                </div>
                <MyButton onClick={logout}>Log out</MyButton>
                    
            </div>
            : null
    )
}

export default Navbar