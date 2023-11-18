import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videodata: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = videos => ({
    id: videos.id,
    name: videos.name,
    imageurl: videos.image_url,
    description: videos.description,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.course_details)
      console.log(updatedData)
      this.setState({
        videodata: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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

  renderProductDetailsView = () => {
    const {videodata} = this.state
    console.log(videodata)
    return (
      <div>
        <div className="container">
          <img src={videodata.imageurl} alt={videodata.name} />
          <div>
            <h1>{videodata.name}</h1>
            <p>{videodata.description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div data-testid="videoItemDetails">
        <Header />
        <div className="tophomecontainer">
          <div className="home-section-small-size">
            {this.renderProductDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
