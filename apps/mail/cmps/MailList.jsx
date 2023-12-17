const { Link, useNavigate, useLocation } = ReactRouterDOM
const { useState, Fragment } = React

import { MailPreview } from "../cmps/MailPreview.jsx";
import { MailEditToolbar } from "./MailEditToolbar.jsx";
// export function MailList({ mails, onRemoveMail }) {
export function MailList({ mails, onToggleIsReadStat, onRemoveMail, onToggleIsStarred }) {

    const [mailHoverId, setMailHoverId] = useState(null)
    const navigate = useNavigate()

    const location = useLocation()
    const isDraftPage = location.pathname.includes('draft')

    function onMailPreviewClick(mailId) {
        if (!isDraftPage) {
            navigate(`/mail/inbox/${mailId}`)
            onToggleIsReadStat(mailId, true)
        } else {
            navigate({
                search: `?compose=${mailId}`,
            })
        }
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
                    <MailPreview mail={mail} mailHoverId={mailHoverId} onToggleIsReadStat={onToggleIsReadStat} onRemoveMail={onRemoveMail} onToggleIsStarred={onToggleIsStarred}/>

                </li>
            )}
        </ul>
    )
}
