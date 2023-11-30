import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const renderStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    mainProduct: '',
    similarProducts: [],
    renderStatus: renderStatusConstants.loading,
    count: 1,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getProductDetails(id)
  }

  getProductDetails = async id => {
    console.log('Fetching product details for id:', id)
    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(api, options)
    const data = await response.json()
    const mainProductData = {
      id: data.id,
      image: data.image_url,
      price: data.price,
      title: data.title,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
      description: data.description,
    }
    const similarProductData = data.similar_products.map(each => ({
      id: each.id,
      image: each.image_url,
      price: each.price,
      title: each.title,
      brand: each.brand,
      totalReviews: each.total_reviews,
      rating: each.rating,
      availability: each.availability,
    }))
    // console.log(mainProductData)
    // console.log(similarProductData)
    this.setState({
      mainProduct: mainProductData,
      similarProducts: similarProductData,
      renderStatus: renderStatusConstants.success,
    })
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    } else {
      this.setState({count: 1})
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  renderSuccessView = () => {
    const {mainProduct, similarProducts, count} = this.state
    const {
      image,
      price,
      rating,
      brand,
      title,
      totalReviews,
      availability,
      description,
    } = mainProduct
    return (
      <>
        <div className="product-item-details-container">
          <img src={image} className="product-img" alt="product" />
          <div className="product-details">
            <h1>{title}</h1>
            <p className="title">Rs {price}/-</p>
            <div className="rating-review">
              <div className="ratings">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                  className="star"
                  alt="star"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p className="title">Availability: {availability}</p>
            <p className="title">Brand: {brand}</p>
            <div className="cart-container">
              <div className="max">
                <button
                  className="max-btn"
                  type="button"
                  onClick={this.onDecrement}
                  data-testid="minus"
                >
                  <BsDashSquare />
                  <p>&apos;</p>
                </button>
                <p>{`${count}`}</p>
                <button
                  className="max-btn"
                  type="button"
                  onClick={this.onIncrement}
                  data-testid="plus"
                >
                  <BsPlusSquare />
                  <p>&apos;</p>
                </button>
              </div>
              <button className="cart-button" type="button">
                <Link to="/cart">
                  <p className="btn-info">ADD TO CART</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="similar-products-container">
          <h1>Similar Products</h1>
          <ul className="similar-list-container" type="none">
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} similarProducts={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="product-item-details-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error"
        alt="error view"
      />
      <h1 className="title">Product Not Found</h1>
      <button type="button" className="product-button">
        <Link to="/products">Continue Shopping</Link>
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="product-item-details-container" data-testid="loader">
      <Loader type="waves" height={100} width={100} />
    </div>
  )

  renderFinalView = () => (
    <div className="main-product-container">
      <Header />
      {this.switchRenderStatus()}
    </div>
  )

  switchRenderStatus = () => {
    const {renderStatus} = this.state

    switch (renderStatus) {
      case renderStatusConstants.success:
        return this.renderSuccessView()
      case renderStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return this.renderFinalView()
  }
}

export default ProductItemDetails
