import { mailService } from "../../mail/services/mail.service.js"
const { useNavigate, useParams } = ReactRouterDOM
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
        <section className="mail-edit">
            <h1>Add/edit Mail</h1>
            <form >
            {/* <form onSubmit={onSaveMail}> */}
                <label htmlFor="to">To</label>
                <input onChange={handleChange} value={to} type="email" name="to" id="to" />

                <label htmlFor="subject">Subject</label>
                <input onChange={handleChange} value={subject} type="text" name="subject" id="subject" />

                <label htmlFor="mail-body">Body</label>
                <textarea onChange={handleChange} value={body} type="text" name="body" id="mail-body" />

                <button disabled={!to}>Save</button>
            </form>

        </section>
    )
}