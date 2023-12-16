
export default function ChooseRating({reviewMethod, onMethodChange}) {
  return (
    <fieldset className="choose-rating">
    <legend>Rating Method:</legend>
       <div>
        <input onChange={() => onMethodChange('stars')} checked={reviewMethod === 'stars'} type="radio" id="stars" />
        <label htmlFor="stars">Stars</label>

       <input onChange={() => onMethodChange('txt')} checked={reviewMethod === 'txt'} type="radio" id="txt"/>
        <label htmlFor="txt">Text Box</label>

       <input onChange={() => onMethodChange('select')} checked={reviewMethod === 'select'} type="radio" id="select" />
       <label htmlFor="select">Select</label>
       </div>
   </fieldset>
  )
}
