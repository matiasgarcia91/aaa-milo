import React from 'react'
import { Link } from 'react-router-dom'
// Static Component
function Header() {
    
    return(
        <div className="main-heading">
            <Link to='/'><h1 className=''>New News()</h1></Link>
        </div>
    )
}

export default Header;