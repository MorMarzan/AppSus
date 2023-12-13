
export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <div>{mail.from}</div>
            <div>{mail.subject} - {mail.body}</div>
            <div>{mail.sentAt}</div>
        </article>
    )
}