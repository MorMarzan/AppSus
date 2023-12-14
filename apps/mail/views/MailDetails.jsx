import { DynamicHeader } from "../../../cmps/DynamicHeader.jsx"
import { mailService } from "../services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect, Fragment } = React

export function MailDetails() {

    // const [mail, setMail] = useState(null)
    // const params = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     loadMail()
    // }, [params.mailId])


    // function loadMail() {
    //     mailService.get(params.mailId)
    //         .then(mail => setMail(mail))
    //         .catch(err => {
    //             console.log('err:', err)
    //             navigate('/')
    //         })
    // }

    // function onBack() {
    //     navigate('/mail')
    //     // navigate(-1)
    // }

    // console.log('Render');

    // if (!mail) return <div>Loading...</div>
    return (
        <Fragment>
            <DynamicHeader />
            <section className="mail-details page">
                <h1>mail details!</h1>
                {/* <h1>Mail Vendor: {mail.vendor}</h1>
            <h1>Mail Speed: {mail.maxSpeed}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button onClick={onBack}>Back</button>
        <Link to={`/mail/u4QgwL`}>Next Mail</Link> */}
            </section>
        </Fragment>
    )
}