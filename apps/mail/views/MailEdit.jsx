import { mailService } from "../../mail/services/mail.service.js"
// import { showSuccessMsg, showErrorMsg, emit } from "../../../services/event-bus.service.js"
import { eventBusService, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useNavigate, Link, useParams, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailEdit() {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // const params = useParams()

    // useEffect(() => {
    //     if (params.mailId) {
    //         loadMail()
    //     }
    // }, [])

    // function loadMail() {
    //     mailService.get(params.mailId)
    //         .then(setMailToEdit)
    //         .catch(err=>console.log('err:', err))
    // }

    function handleChange({ target }) {
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

        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        const sentAtNow = { sentAt: new Date().getTime() }
        setMailToEdit(prevMail => ({ ...prevMail, ...sentAtNow }))
        mailService.save({ ...mailToEdit, ...sentAtNow })
            .then((savedMail) => {
                // throw new Error('error')
                showSuccessMsg('Mail sent successfully')
                eventBusService.emit('load-mails')
                // console.log(savedMail)
                navigate('/mail')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error - mail not sent')
            })
    }

    function onCloseCompose() {
        // Remove the "compose" parameter from the search parameters
        const updatedSearchParams = new URLSearchParams(searchParams)
        updatedSearchParams.delete('compose')

        // Construct the new URL with updated search parameters
        const newUrl = `${window.location.pathname}?${updatedSearchParams.toString()}`

        // Navigate to the new URL
        navigate(newUrl)
    }

    const { to, subject, body } = mailToEdit
    return (
        <section className="mail-edit mail-edit-layout">
            <header className="mail-edit-header mail-edit-layout full">
                <div>
                    <h4>New Messege</h4>
                    <Link onClick={onCloseCompose} className="btn" to="#">X</Link>
                    {/* <Link className="btn" to="/mail">X</Link> */}
                </div>
            </header>
            {/* <form > */}
            <form onSubmit={onSaveMail}>
                <input onChange={handleChange} placeholder="To" value={to} type="email" name="to" />
                <input onChange={handleChange} placeholder="Subject" value={subject} type="text" name="subject" />
                <textarea onChange={handleChange} value={body} type="text" name="body" />

                <button className="submit" disabled={!to}>Save</button>
            </form>

        </section>
    )
}