import {BsFilterRight} from 'react-icons/bs'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const changeSearch = event => {
    const {searcheFunc} = props
    searcheFunc(event.target.value)
  }

  const {sortbyOptions, activeOptionId} = props

  return (
    <div className="products-header">
      <div className="searchCont">
        <input
          onChange={changeSearch}
          type="search"
          placeholder="search"
          className="search"
        />
        <FaSearch className="searchicon" />
      </div>
      <div className="ProductHeadandFilterCont">
        <h1 className="products-list-heading">All Products</h1>
        <div className="sort-by-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductsHeader
