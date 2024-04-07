import './index.css'

const CategoryItem = props => {
  const {classChange, categoryItem, categoryclickpassFunc} = props
  const {categoryId, name} = categoryItem
  const clickcategory = () => {
    categoryclickpassFunc(categoryId)
  }
  const activemakingClass = classChange && 'activetab'
  return (
    <li className="listEleCategory">
      <p
        onClick={clickcategory}
        className={`${activemakingClass} buttonCategory`}
        type="button"
      >
        {name}
      </p>
    </li>
  )
}
export default CategoryItem
