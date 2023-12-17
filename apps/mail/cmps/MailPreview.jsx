import { utilService } from "../../../services/util.service.js"
import { MailEditToolbar } from "./MailEditToolbar.jsx"

const { useLocation } = ReactRouterDOM


export function MailPreview({ mail, mailHoverId, onToggleIsReadStat, onRemoveMail, onToggleIsStarred }) {

    const location = useLocation()
    const isSentPage = location.pathname.includes('sent')
    const isDraftPage = location.pathname.includes('draft')


    const { subject, body, isRead, sentAt, from, to, isStarred } = mail
    const readStat = !isRead ? 'unread' : ''

    let leftColContent
    if (isSentPage) {
        leftColContent = 'To: ' + to
    } else if (isDraftPage) {
        leftColContent = 'Draft'
    } else {
        leftColContent = from
    }

    let rightColContent = isDraftPage ? 'Not sent yet' : utilService.formatTimestamp(sentAt)

    return (
        <article className={readStat + ' mail-preview'}>
            <div className="from text-overflow-ellipsis">{leftColContent}</div>
            <div className="mail-content text-overflow-ellipsis"><span className="subject">{subject}</span> - {body}</div>
            {mailHoverId !== mail.id && <div className="date">{rightColContent}</div>}
            {mailHoverId === mail.id &&
                <MailEditToolbar onToggleIsReadStat={onToggleIsReadStat} mailId={mail.id} onRemoveMail={onRemoveMail} isRead={isRead} onToggleIsStarred={onToggleIsStarred} isStarred={isStarred}/>
            }
        </article>
    )
}