// import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../../mail/services/mail.service.js"
import { showSuccessMsg, showErrorMsg, eventBusService } from "../../../services/event-bus.service.js"
import { MailFilterNotDynamic } from "../cmps/MailFilterNotDynamic.jsx"

const { useState, useEffect, useRef } = React
const { useSearchParams, useLocation } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    let intervalIdRef = useRef()
    const location = useLocation()

    // const isSentPage = location.pathname.includes('sent')
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    // const [filterBy, setFilterBy] = useState({...mailService.getDefaultFilter(), status: 'inbox'})


    // const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(mailService.getFilterFromQueryString(searchParams))


    //intial render && when filter changes
    useEffect(() => {
        loadMails()
        // setSearchParams(filterBy)
    }, [filterBy])

    //set new filter when loaction changes
    useEffect(() => {
        onSetFilter()
    }, [location])


    //render after mail edit/add
    useEffect(() => {
        const unsubscribe1 = eventBusService.on('load-mails', loadMails)
        const unsubscribe2 = eventBusService.on('on-set-filter', onSetFilter)
        return () => {
            unsubscribe1()
            unsubscribe2()
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
        // mailService.query({status: 'inbox', readStat: 'all', txt: ''})
        mailService.query(filterBy)
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

    function onSetFilter(dynamicHeaderFilter) {
        const pathSegments = location.pathname.split('/')
        const stautsVal = pathSegments[2] || ''
        // console.log('pathSegments', pathSegments)
        // console.log('dynamicHeaderFilter', dynamicHeaderFilter)

        let newStat = { status: stautsVal }

        // console.log('dynamicHeaderFilter', dynamicHeaderFilter)
        // console.log('filterBy of index', filterBy)
        if (dynamicHeaderFilter) {
            setFilterBy(() => ({ ...dynamicHeaderFilter, ...newStat }))
            // console.log('newStat', newStat)
            // console.log('dynamicHeaderFilter', { ...dynamicHeaderFilter, ...newStat })
        }

        else {
            setFilterBy(prevFilter => ({ ...prevFilter, ...newStat }))
            console.log('filterBy', { ...filterBy, ...newStat })
        }
    }


    // function onSetFilter(filterBy) {
    //     // setFilterBy(filterBy)
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))

    // }

    // const { txt, minSpeed, maxPrice } = filterBy

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

    // function onSetSortBy(sortBy) {
    //     mailService.setMailSort(sortBy)
    //         .then(setMails)
    //         .catch(err => console.log('err:', err))
    // }

    return (
        <section className="mail-index">
            <MailFilterNotDynamic onSetFilter={onSetFilter} filterBy={filterBy}/>
            {/* <MailFilter filterBy={{ txt, minSpeed }} onSetFilter={onSetFilter} /> */}
            <MailList mails={mails} onToggleIsReadStat={onToggleIsReadStat} onRemoveMail={onRemoveMail} />
            {/* <MailList mails={mails} onRemoveMail={onRemoveMail} /> */}
        </section>
    )
}

