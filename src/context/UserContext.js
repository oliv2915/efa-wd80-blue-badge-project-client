import {createContext, useEffect, useState} from "react"

const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({})
        
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [])
    
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);

            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/profile`, {
                method: "GET",
                headers: new Headers({"Authorization": `Bearer ${token}`})
            }).then(res => {
                // if no 200 status, failed login attempt
                if (res.status !== 200) {
                    setToken(null);
                    setIsAuth(false);
                    localStorage.removeItem("token");
                }
                return res.json();
            }).then(data => {
                if (data.id) {
                    setUser(data);
                    setIsAuth(true);
                }
            });
        // if not token, access denied
        } else {
            setUser({});
            setIsAuth(false);
            localStorage.removeItem("token");
        }
    }, [token]);


    return (
        <UserContext.Provider value={{token, setToken, isAuth, user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;