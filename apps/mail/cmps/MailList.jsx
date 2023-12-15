const { Link, useNavigate } = ReactRouterDOM
const { useState, Fragment } = React

import { MailPreview } from "../cmps/MailPreview.jsx";
import { MailEditToolbar } from "./MailEditToolbar.jsx";
// export function MailList({ mails, onRemoveMail }) {
export function MailList({ mails, onToggleIsReadStat, onRemoveMail }) {

    const [mailHoverId, setMailHoverId] = useState(null)
    const navigate = useNavigate()

    function onMailPreviewClick(mailId) {
        navigate(`/mail/inbox/${mailId}`)
        onToggleIsReadStat(mailId, true)
    }

    if (!mails) return <div>Loading...</div>
    if (!mails.length) return <div>No mails match this search</div>
    return (
        <ul className="mail-list">

            {mails.map(mail =>
                <li key={mail.id}
                    className="btn"
                    onClick={() => onMailPreviewClick(mail.id)}
                    onMouseEnter={() => setMailHoverId(mail.id)}
                    onMouseLeave={() => setMailHoverId(null)}
                >
                    <MailPreview mail={mail} mailHoverId={mailHoverId} onToggleIsReadStat={onToggleIsReadStat} onRemoveMail={onRemoveMail}/>

                </li>
            )}
        </ul>
    )
}
