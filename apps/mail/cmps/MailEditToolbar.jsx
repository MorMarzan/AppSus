
export function MailEditToolbar({ onToggleIsReadStat, mailId, onRemoveMail, isRead, onToggleIsStarred, isStarred }) {
    return (
        <div className="mail-edit-toolbar" onClick={(ev) => ev.stopPropagation()}>
            <div
                title={`Mark as ${isStarred ? 'unstarred' : 'starred'}`}
                onClick={(ev) => {
                    onToggleIsStarred(mailId, !isStarred)
                    ev.stopPropagation()
                }}
            >
                {isStarred && <i className="fa-solid fa-star"></i>}
                {!isStarred && <i className="fa-regular fa-star"></i>}
                
            </div>
            <div
                title={`Mark as ${isRead ? 'unread' : 'read'}`}
                onClick={(ev) => {
                    onToggleIsReadStat(mailId, !isRead)
                    ev.stopPropagation()
                }}
            >
                {!isRead && <i className="fa-solid fa-envelope-open"></i>}
                {isRead && <i className="fa-regular fa-envelope"></i>}
            </div>
            <div
                title="Delete"
                onClick={(ev) => {
                    onRemoveMail(mailId)
                    ev.stopPropagation()
                }}
            >
                <i className="fa-solid fa-trash" aria-hidden="true"></i>
            </div>
        </div>
    )
}
