import { createContext, useState } from "react";

const userContext = createContext()
export default userContext

export function UserProvider ({children}) {

    const [userData, setUserData] = useState()

    return (
        <userContext.Provider value={{userData, setUserData}}>
            {children}
        </userContext.Provider>
    )
}