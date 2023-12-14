// export function MailList() {
//     return <div>Mail list</div>
// }
const { Fragment, useState } = React

import { MailPreview } from "../cmps/MailPreview.jsx";
// const { Link } = ReactRouterDOM
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
                        <MailPreview mail={mail} />
                        <section>
                            {/* <button onClick={() => onRemoveMail(mail.id)}>Remove Mail</button> */}
                            {/* <button><Link to={`/mail/${mail.id}`}>Details</Link></button> */}
                            {/* <button><Link to={`/mail/edit/${mail.id}`}>Edit</Link></button> */}
                        </section>
                    </li>
                )}
            </ul>
    )
}
