
export function RateByTxt({ handleChange, initRate }) {
  return (
    <input name="rating" onChange={handleChange} value={initRate} className="rate-by-txt" type="text" placeholder="Write a review" />
  )
}
