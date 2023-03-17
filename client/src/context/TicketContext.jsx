import React, { createContext, useState, useEffect } from 'react'

const TicketContext = createContext();

function TicketContextProvider(props) {
    const [ticket, setTicket] = useState();
    const ticketInfo = { ticket, getTicketInfo }
    useEffect(() => {
        getTicketInfo();
    }, []);

    function getTicketInfo(value) {
        setTicket(value);
    }

    return (
        <TicketContext.Provider value={ticketInfo}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContext
export { TicketContextProvider }