import CategoryItem from '../CategoryItem'
import RatingItem from '../RatingItem'
import './index.css'

const FiltersGroup = props => {
  const {
    ratingClickFunc,
    activeCategory,
    categoryList,
    ratinglist,
    categoryClickFunc,
    activeRating,
    filterClearFuncPass,
  } = props
  const clickCategory = id => {
    categoryClickFunc(id)
  }

  const clickedOnRating = id => {
    ratingClickFunc(id)
  }

  const clearFilters = () => {
    filterClearFuncPass()
  }

  return (
    <div className="filters-group-container">
      <h1 className="categoryhead">Category</h1>
      <ul className="ulCont">
        {categoryList.map(each => (
          <CategoryItem
            classChange={each.categoryId === activeCategory}
            categoryclickpassFunc={clickCategory}
            key={each.categoryId}
            categoryItem={each}
          />
        ))}
      </ul>
      <h1 className="categoryhead">Rating</h1>
      <ul className="ulCont">
        {ratinglist.map(each => (
          <RatingItem
            tappedRatingItemFunc={clickedOnRating}
            classChangeRating={each.ratingId === activeRating}
            key={each.ratingId}
            ratingitem={each}
          />
        ))}
      </ul>
      <button
        onClick={clearFilters}
        type="button"
        className="clearFiltersButton"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
