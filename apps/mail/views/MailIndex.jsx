const { Outlet, Link, useSearchParams } = ReactRouterDOM

// import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
// import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { mailService } from "../../mail/services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailFooter } from "../cmps/MailFooter.jsx"
import { MailSidebar } from "../cmps/MailSidebar.jsx"
import { DynamicHeader } from "../../../cmps/DynamicHeader.jsx"
import { DynamicSidebar } from "../../../cmps/DynamicSidebar.jsx"
// import { mailService } from "../services/mail.service.js"
// import { showSuccessMsg } from "../services/event-bus.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'

const { useState, useEffect, useRef } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    let intervalIdRef = useRef()

    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [isSbOpen, setIsSbOpen] = useState(!isMobile) //intialize sb to be closed on mobile
    const [isSbFull, setIsSbFull] = useState(true) /* desktop only */
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function handleResize() {
        const currIsMobile = window.innerWidth <= 768
        setIsMobile(currIsMobile)

    }
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



    function onSetIsSbFull() {
        setIsSbFull(isSbFull => !isSbFull)
    }

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

    // if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index page main-layout full">
            <DynamicHeader onSetIsSbFull={onSetIsSbFull} />
            {/* {isSbOpen && <MailSidebar isSbFull={isSbFull}/>} */}
            <DynamicSidebar isSbFull={isSbFull} />
            <div>
                <MailHeader />
                {/* <div>Mister Email</div> */}
                {/* <MailFilter filterBy={{ txt, minSpeed }} onSetFilter={onSetFilter} /> */}
                <MailList mails={mails} />
                {/* <MailList mails={mails} onRemoveMail={onRemoveMail} /> */}
                {/* <DataTable mails={mails}/> */}
                <MailFooter />
            </div>
            <Outlet /> {/*  <MailEdit />  */}
        </section>
    )
}

