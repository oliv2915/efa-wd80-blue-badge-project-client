import {createContext, useEffect, useState} from "react"

const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
        
    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
    }, [])
    
    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", token);

            fetch(`${process.env.REACT_APP_API_SERVER_BASE_URL}/user/profile`, {
                method: "GET",
                headers: new Headers({"Authorization": `Bearer ${token}`})
            }).then(res => {
                // if no 200 status, failed login attempt
                if (res.status !== 200) {
                    setToken(null);
                    setIsAuth(false);
                    setLoading(true);
                    sessionStorage.removeItem("token");
                }
                return res.json();
            }).then(data => {
                if (data.user) {
                    setUser(data.user);
                    setIsAuth(true);
                    setLoading(true);
                }
            }).catch(console.error);
        // if not token, access denied
        } else {
            setUser({});
            setIsAuth(false);
            setLoading(true);
            sessionStorage.removeItem("token");
        }
    }, [token]);


    return (
        <UserContext.Provider value={{token, setToken, isAuth, user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;