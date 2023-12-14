import { mailService } from "../../mail/services/mail.service.js"

const { useNavigate, Link, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailEdit() {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
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
        setMailToEdit(prevMail => ({ ...prevMail, [sentAt]: new Date().getTime() }))
        mailService.save(mailToEdit)
            .then((savedMail) => {
                console.log(savedMail)
                // navigate('/mail')
            })
            .catch(err => console.log('err:', err))
    }

    const { to, subject, body } = mailToEdit
    return (
        <section className="mail-edit mail-edit-layout">
            <header className="mail-edit-header mail-edit-layout full">
                <div>
                    <h4>New Messege</h4>
                    <Link className="btn" to="/mail">X</Link>
                </div>
            </header>
            <form >
                {/* <form onSubmit={onSaveMail}> */}
                {/* <label htmlFor="to">To</label> */}
                <input onChange={handleChange} placeholder="To" value={to} type="email" name="to" id="to" />
                {/* <label htmlFor="subject">Subject</label> */}
                <input onChange={handleChange} placeholder="Subject" value={subject} type="text" name="subject" id="subject" />
                {/* <label htmlFor="mail-body">Body</label> */}
                <textarea onChange={handleChange} value={body} type="text" name="body" id="mail-body" />

                <button className="submit" disabled={!to}>Save</button>
            </form>

        </section>
    )
}