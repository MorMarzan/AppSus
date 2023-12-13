import { utilService } from "../../../services/util.service.js"


export function MailPreview({ mail }) {
    const { subject, body, isRead, sentAt, from} = mail

    const readStat = !isRead ? 'unread' : ''

    return (
        // <article className="mail-preview">
        <article className={readStat + ' mail-preview'}>
            <div className="from text-overflow-ellipsis">{from}</div>
            <div className="mail-content text-overflow-ellipsis"><span className="subject">{subject}</span> - {body}</div>
            <div className="date">{utilService.formatTimestamp(sentAt)}</div>
        </article>
    )
}