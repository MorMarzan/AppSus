import { DynamicHeader } from "../../../cmps/DynamicHeader.jsx"
import { mailService } from "../services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect, Fragment } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    // console.log('Render');

    if (!mail) return <div>Loading...</div>
    const { subject, from, to, sentAt, body } = mail
    return (
        <Fragment>
            <DynamicHeader />
            <section className="mail-details page">
                <h1>{subject}</h1>
                <div>
                    <p>{from}</p>
                    <p>{sentAt}</p>
                    <p>{to}</p>
                </div>
                <p>{body}</p>
                
                {/* <button onClick={onBack}>Back</button> */}
                {/* <Link to={`/mail/u4QgwL`}>Next Mail</Link> */}
            </section>
        </Fragment>
    )
}