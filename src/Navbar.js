import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className='nav'>
            <Link to='/' className='site-title'>
                Hotpot Website
            </Link>
            <ul>
                <CustomLink to='/'>Home</CustomLink>
                <CustomLink to='/review'>Menu</CustomLink>
                <CustomLink to='/user'>User</CustomLink>
                <CustomLink to='/contact'>Contact</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}