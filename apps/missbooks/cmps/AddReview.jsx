import { booksService } from '../services/books-service.js'
import ChooseRating from './ChooseRating.jsx'
import { RateBySelect } from './RateBySelect.jsx'
import { RateByTxt } from './RateByTxt.jsx'
import { StarRating } from './StarRating.jsx'
const { useState } = React

export function AddReview({ addReview }) {
    const [review, setReview] = useState(booksService.getEmptyReview())
    const [reviewMethod, setReviewMethod] = useState('stars')

    function handleInputChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()
        addReview(review)
        setReview(booksService.getEmptyReview())
    }

  const {fullName, rating, readAt} = review

  return (
    <section className="add-review">
        <h2>Add a Book Review</h2>

        <form onSubmit={onAddReview}>
            <label>Full Name: <input required onChange={handleInputChange} value={fullName} name='fullName' type="text" placeholder="Full Name" /></label>
            <ChooseRating reviewMethod={reviewMethod} onMethodChange={setReviewMethod} />
            
            <DynamicRating reviewMethod={reviewMethod} handleChange={handleInputChange} initRate={rating} />
            <label>Read At: <input required onChange={handleInputChange} value={readAt} name='readAt' type="date" /></label>
            <button>Add Review</button>
        </form>
    </section>
  )
}


function DynamicRating(props) {
    switch (props.reviewMethod) {
        case 'stars':
            return <StarRating {...props} />

        case 'select':
            return <RateBySelect {...props} />

        case 'txt':
            return <RateByTxt {...props} />

    }
}