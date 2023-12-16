import { utilService } from "../../../services/util.service.js"
import { MailEditToolbar } from "./MailEditToolbar.jsx"

const { useLocation } = ReactRouterDOM


export function MailPreview({ mail, mailHoverId, onToggleIsReadStat, onRemoveMail }) {
    
    const location = useLocation()
    const isSentPage = location.pathname.includes('sent')

    const { subject, body, isRead, sentAt, from, to } = mail
    const readStat = !isRead ? 'unread' : ''

    return (
        <article className={readStat + ' mail-preview'}>
            <div className="from text-overflow-ellipsis">{isSentPage ? 'To: ' + to : from}</div>
            <div className="mail-content text-overflow-ellipsis"><span className="subject">{subject}</span> - {body}</div>
            {mailHoverId !== mail.id && <div className="date">{utilService.formatTimestamp(sentAt)}</div>}
            {mailHoverId === mail.id &&
                // <div>
                //     <button className="btn">
                //         <i className="fa-solid fa-trash" aria-hidden="true"></i>
                //     </button>
                // </div>
                <MailEditToolbar onToggleIsReadStat={onToggleIsReadStat}  mailId={mail.id} onRemoveMail={onRemoveMail} isRead={isRead}/>
            }
        </article>
    )
}