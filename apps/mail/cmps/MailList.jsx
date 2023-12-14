const { Fragment, useState } = React
const { Link } = ReactRouterDOM

import { MailPreview } from "../cmps/MailPreview.jsx";
// export function MailList({ mails, onRemoveMail }) {
export function MailList({ mails }) {

    // const ulProps = {
    //     className: "mail-list",
    //     title:'CARLISTTTTTTTTTTTT'
    // }

    if (!mails) return <div>Loading...</div>
    return (
        <ul className="mail-list">

            {mails.map(mail =>
                <li key={mail.id}>
                    <Link to={`/mail/${mail.id}`}>
                        <MailPreview mail={mail} />
                    </Link>
                </li>
            )}
        </ul>
    )
}
