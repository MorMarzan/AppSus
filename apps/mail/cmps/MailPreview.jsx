import { utilService } from "../../../services/util.service.js"
export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <div className="from text-overflow-ellipsis">{mail.from}</div>
            <div className="mail-body text-overflow-ellipsis">{mail.subject} - {mail.body}</div>
            <div className="date">{utilService.formatTimestamp(mail.sentAt)}</div>
        </article>
    )
}