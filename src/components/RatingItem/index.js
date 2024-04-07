import './index.css'

const RatingItem = props => {
  const {classChangeRating, ratingitem, tappedRatingItemFunc} = props
  const {ratingId, imageUrl} = ratingitem
  const ratingItemTap = () => {
    tappedRatingItemFunc(ratingId)
  }
  const ratingChangeClass = classChangeRating && 'activeratingTab'
  console.log(ratingChangeClass)
  return (
    <li className="ratingCont">
      <img src={imageUrl} className="imgrating" alt={`rating ${ratingId}`} />
      <button
        onClick={ratingItemTap}
        type="button"
        className={`${ratingChangeClass} ratingupBtn`}
      >
        & Up
      </button>
    </li>
  )
}
export default RatingItem
