import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/te/courses`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logourl: eachItem.logo_url,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="error-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="product-not-found-heading">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.getVideos()}>
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {videosList} = this.state
    return (
      <ul className="Rowallign">
        {videosList.map(eachitem => (
          <Link to={`/courses/${eachitem.id}`}>
            <li className="IndividualAllign">
              <img src={eachitem.logourl} alt={eachitem.name} />
              <p>{eachitem.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Courses</h1>
        <div>{this.checkApiStatus()}</div>
      </div>
    )
  }
}

export default Home
