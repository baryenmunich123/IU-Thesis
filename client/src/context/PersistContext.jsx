import React, { useState, useEffect } from "react";

const PersistContext = React.createContext();

function PersistenceContextProvider(props) {
    const [valuePersist, setValuePersist] = useState();
    const persistValue = {
        valuePersist,
        setValuePersist,
        getPersistState

    };

   

    const setPersistState = (persistState) => {
        // localStorage.setItem("parentValueKey", persistState);
        console.log("á")

    }
    const getPersistState = (persistState) => {
        // localStorage.getItem("parentValueKey", persistState);
        console.log("12á")

    }

    useEffect(() => {
        setPersistState()
    }, [valuePersist]);
    return (
        <PersistContext.Provider value={persistValue}>
            {props.children}
        </PersistContext.Provider>
    );
}
export default PersistContext;
export { PersistenceContextProvider }