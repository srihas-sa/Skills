import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="background">
    <nav>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="header"
        />
      </Link>
    </nav>
  </div>
)

export default Header
