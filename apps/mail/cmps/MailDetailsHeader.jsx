const { Link, NavLink, useLocation, useParams } = ReactRouterDOM


export function MailDetailsHeader({ onRemoveMail, onToggleIsReadStat }) {


    return (
        <header className="mail-details-header mail-header">
            <section>
                <Link className="btn" title="Back to inbox"
                    to={'/mail/inbox'}>
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                <button onClick={onRemoveMail} className="btn" title="Delete">
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => onToggleIsReadStat(false)} className="btn" title="Mark as unread">
                    <i className="fa-regular fa-envelope"></i>
                </button>

            </section>
        </header>
    )
}