import {Component} from 'react'
import './index.css'

class SimilarProductItem extends Component {
  render() {
    const {similarProducts} = this.props
    const {image, price, rating, brand, title} = similarProducts
    console.log(title)
    return (
      <li className="similar-items-container">
        <img src={image} className="similar-img" alt="similar product" />
        <p className="title">{title}</p>
        <p>by {brand}</p>
        <div className="price-rating">
          <p className="title">Rs {price}/-</p>
          <div className="ratings">
            <p>{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png "
              className="star"
              alt="star"
            />
          </div>
        </div>
      </li>
    )
  }
}
export default SimilarProductItem
