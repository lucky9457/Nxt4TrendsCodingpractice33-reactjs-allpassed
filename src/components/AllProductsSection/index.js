import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const api = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    category: categoryOptions[0].categoryId,
    ratingid: ratingsList[0].ratingId,
    searchinp: '',
    apiStatus: api.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
      apiStatus: api.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {searchinp, ratingid, activeOptionId, category} = this.state
    console.log(ratingid)
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchinp}&category=${category}&rating=${ratingid}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        apiStatus: api.success,
      })
    } else {
      this.setState({
        apiStatus: api.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="productsnotfoundCont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="no-products-image"
          />
          <h1 className="headNoProducts">No Products Found</h1>
          <p className="parafil">
            We could not find any Products. Try another filters
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureview = () => (
    <div className="productsnotfoundCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="no-products-image"
      />
      <h1 className="headNoProducts">Oops! Something Went Wrong</h1>
      <p className="parafil">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  getCategoryClickId = id => {
    this.setState(
      {
        category: id,
      },
      this.getProducts,
    )
  }

  getratingClickId = id => {
    this.setState(
      {
        ratingid: id,
      },
      this.getProducts,
    )
  }

  clearFilterFunc = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        category: categoryOptions[0].categoryId,
        ratingid: ratingsList[0].ratingId,
      },
      this.getProducts,
    )
  }

  searchChange = val => {
    this.setState(
      {
        searchinp: val,
      },
      this.getProducts,
    )
  }

  checkStatusAndRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case api.failure:
        return this.failureview()
      case api.inprogress:
        return this.renderLoader()
      case api.success:
        return this.renderProductsList()

      default:
        return null
    }
  }

  succesView = () => {
    const {apiStatus, isLoading, category} = this.state
    const {ratingid, productsList, activeOptionId} = this.state
    return (
      <div className="">
        {/* TODO: Update the below element */}
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searcheFunc={this.searchChange}
        />
        <div className="filterAndProductsCont">
          <FiltersGroup
            ratingClickFunc={this.getratingClickId}
            activeRating={ratingid}
            activeCategory={category}
            categoryClickFunc={this.getCategoryClickId}
            ratinglist={ratingsList}
            categoryList={categoryOptions}
            filterClearFuncPass={this.clearFilterFunc}
          />
          {this.checkStatusAndRender()}
        </div>
      </div>
    )
  }

  render() {
    const a = 'a'
    return <div>{this.succesView()}</div>
  }
}

export default AllProductsSection
