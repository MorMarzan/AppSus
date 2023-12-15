// import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../../mail/services/mail.service.js"
import { showSuccessMsg, showErrorMsg, eventBusService } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    let intervalIdRef = useRef()


    // const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))


    //intial render && when filter changes
    useEffect(() => {
        loadMails()
        // setSearchParams(filterBy)
    }, [])
    // }, [filterBy])

    //render after mail edit/add
    useEffect(() => {
        const unsubscribe = eventBusService.on('load-mails', loadMails)
        return () => {
            unsubscribe()
        }
    }, [])

    //render every 30 min so that the user will see the change in sentAt
    useEffect(() => {
        intervalIdRef.current = setInterval(loadMails, 30 * 60 * 1000)

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [])

    function loadMails() {
        mailService.query()
            // mailService.query(filterBy)
            .then(setMails)
            .catch(err => console.log('err:', err))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => {
                    return prevMails.filter(mail => mail.id !== mailId)
                })
                showSuccessMsg(`Mail successfully removed! ${mailId}`)
            })
            .catch(err => console.log('err:', err))

    }


    // function onSetFilter(filterBy) {
    //     // setFilterBy(filterBy)
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))

    // }

    // const { txt, minSpeed, maxPrice } = filterBy

    // function onToggleIsReadStat(mailId, isRead) {
    //     console.log('mailId', mailId)
    //     mailService.get(mailId)
    //         .then(mail => {
    //             mailService.save({ ...mail, isRead: isRead })
    //             setMails(prevMails => prevMails.map(mail => ({ ...mail, timestamp: Date.now() })));

    //         })
    //         .catch(err => {
    //             console.log('err:', err)
    //             showErrorMsg('Error - can\'t find mail details ')
    //         })
    // }

    function onToggleIsReadStat(mailId, isRead) {
        mailService.get(mailId)
            .then(mailToUpdate => {
                // Find the index of the mail in the current mails array
                const mailIndex = mails.findIndex(mail => mail.id === mailId)

                if (mailIndex !== -1) {
                    // Update the isRead property of the mail in a new array
                    const updatedMails = [...mails];
                    updatedMails[mailIndex] = { ...mailToUpdate, isRead: isRead }

                    // Set the new array in state
                    setMails(updatedMails)
                }

                // Save the updated mail to the server
                // showSuccessMsg(`Mail marked as ! ${mailId}`)
                showSuccessMsg(`Mail marked as ${isRead ? 'read' : 'unread'}! ${mailId}`)

                return mailService.save({ ...mailToUpdate, isRead: isRead })
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error - can\'t find mail details ')
            })
    }



    return (
        <section className="mail-index">
            {/* <MailFilter filterBy={{ txt, minSpeed }} onSetFilter={onSetFilter} /> */}
            <MailList mails={mails} onToggleIsReadStat={onToggleIsReadStat} onRemoveMail={onRemoveMail} />
            {/* <MailList mails={mails} onRemoveMail={onRemoveMail} /> */}
        </section>
    )
}

