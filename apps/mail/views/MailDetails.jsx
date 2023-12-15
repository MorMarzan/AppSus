import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { MailDetailsHeader } from "../cmps/MailDetailsHeader.jsx"
import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect, Fragment } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])


    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    function onRemoveMail() {
        mailService.remove(mailId)
            .then(() => {
                showSuccessMsg(`Mail successfully removed! ${mailId}`)
                navigate('/mail')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error - mail not removed')
            })
    }

    function onMarkUnread() {
        setMail(prevMail => ({ ...prevMail, isRead: false }))
        mailService.save({ ...mail, isRead: false })
            .then(() => {
                showSuccessMsg(`Mail marked as unread! ${mailId}`)
                navigate('/mail')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error - wasn\'t marked as unread')
            })
    }


    if (!mail) return <div>Loading...</div>
    const { subject, from, to, sentAt, body } = mail
    return (
        <Fragment>
            <MailDetailsHeader onRemoveMail={onRemoveMail} onMarkUnread={onMarkUnread}/>
            <section className="mail-details">
                <h1>{subject}</h1>
                <div className="info">
                    <p>{from}</p>
                    <p>{utilService.tsToDateString(sentAt)}</p>
                    {/* <p>{sentAt}</p> */}
                    <p>{to}</p>
                </div>
                <p>{body}</p>

                {/* <Link to={`/mail/u4QgwL`}>Next Mail</Link> */}
            </section>
        </Fragment>
    )
}
