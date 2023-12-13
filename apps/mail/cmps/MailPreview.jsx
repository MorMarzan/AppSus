import { utilService } from "../../../services/util.service.js"
export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <div>{mail.from}</div>
            <div>{mail.subject} - {mail.body}</div>
            <div>{utilService.formatTimestamp(mail.sentAt)}</div>
        </article>
    )
}