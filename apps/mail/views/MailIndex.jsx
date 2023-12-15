// import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../../mail/services/mail.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'

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
    },[])

    function loadMails() {
        mailService.query()
            // mailService.query(filterBy)
            .then(setMails)
            .catch(err => console.log('err:', err))
    }

    // function onRemoveMail(mailId) {
    //     mailService.remove(mailId)
    //         .then(() => {
    //             // const newMails = mails.filter(mail => mail.id !== mailId)
    //             // setMails(newMails)
    //             setMails(prevMails => {
    //                 return prevMails.filter(mail => mail.id !== mailId)
    //             })
    //             showSuccessMsg(`Mail successfully removed! ${mailId}`)
    //         })
    //         .catch(err => console.log('err:', err))

    // }


    // function onSetFilter(filterBy) {
    //     // setFilterBy(filterBy)
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))

    // }

    // const { txt, minSpeed, maxPrice } = filterBy

    
    return (
        <section className="mail-index">
                {/* <MailFilter filterBy={{ txt, minSpeed }} onSetFilter={onSetFilter} /> */}
                <MailList mails={mails} />
                {/* <MailList mails={mails} onRemoveMail={onRemoveMail} /> */}
        </section>
    )
}

