
export function RateBySelect({ handleChange, initRate }) {
  return (
    <select name="rating" onChange={handleChange} value={initRate} className="rate-by-select">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
  )
}
