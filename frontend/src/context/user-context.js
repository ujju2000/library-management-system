import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../client/backend-api"

const UserContext = createContext({
    user: null,
    loginUser: () => { },
})

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        setIsAdmin(user && user.role === 'admin')
    }, [user])

    useEffect(() => {
        BackendApi.user.getProfile().then(({ user, error }) => {
            if (error) {
                console.error(error)
            } else {
                setUser(user)
            }
        }).catch(console.error)

        BackendApi.getFeedback().then(({res , error}) => {
            if(error) {
                console.log(error);
            }
            else {
                setFeedbacks(res)
            }
        }).catch(err => console.error) 
    }, [])

    const loginUser = async (username, password) => {
        const { user, error } = await BackendApi.user.login(username, password)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            setUser(user)
        }
    }
    const registerUser = async (name , username , password) => {
        const {user, error} = await BackendApi.user.register(name , username ,password);
        if(error) {
            NotificationManager.error(error);
        }
        else {
            NotificationManager.success('New User Registered');
            setUser(user);
        }
    }
    const logoutUser = async () => {
        setUser(null)
        await BackendApi.user.logout()
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin, registerUser , feedbacks}}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }