// export function MailList() {
//     return <div>Mail list</div>
// }

import { MailPreview } from "../cmps/MailPreview.jsx";
// const { Link } = ReactRouterDOM
// export function MailList({ mails, onRemoveMail }) {
export function MailList({ mails }) {

    // const ulProps = {
    //     className: "mail-list",
    //     title:'CARLISTTTTTTTTTTTT'
    // }
    return (
        <ul className="mail-list">
        {/* <ul {...ulProps} > */}
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
