import { createContext, useEffect, useState } from "react";
import axios from "axios";
import UserApi from "./api/UserApi";
import { data, useNavigate } from "react-router-dom";
import ContactApi from "./api/ContactApi";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    });
    const [contactsList, setContactsList] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [refreshContact, setRefreshContact] = useState(true)

    // console.log('userId ->', userId);
    // console.log('user ->', user);

    const refreshtoken = async (rf_token) => {
        try {
            const res = await axios.post('http://localhost:8000/user/refresh_token', {
                rf_token
            });

            // console.log('refresh_token ->', res.data.user.id);
            localStorage.setItem('accessToken', res.data.accessToken);

            setUserId(res.data.user.id);
        } catch (err) {
            console.error('refresh_token error ->', err.message);
        }
    };

    useEffect(() => {


        const rf_token = localStorage.getItem('refreshToken');
        // console.log('refreshToken ->', rf_token);
        if (rf_token) {
            setToken(rf_token)
        }

        else {
            navigate('/')
        }


    }, [refresh]);

    useEffect(() => {
        // console.log(token)

        if (token) {
            refreshtoken(token);
        }

    }, [token])

    useEffect(() => {
        if (userId !== '') {
            ContactApi(userId).then((data) => {
                // console.log(data)
                if (!data) {
                    console.log('No')
                } else {
                    setContactsList(data)
                }
            })
        }
    }, [refreshContact])



    useEffect(() => {
        if (userId !== '') {
            UserApi(userId).then((data) => {
                setUser(data);
            });
            setRefreshContact(!refreshContact)
        }
    }, [userId]);

    useEffect(() => {
        const isUserEmpty = Object.values(user).every(value => value === '');

        if (!isUserEmpty) {
            navigate('/home/chatpage')
        }
    }, [user]);




    const states = {
        userId: [userId, setUserId],
        user: [user, setUser],
        refresh: [refresh, setRefresh],
        contactsList: [contactsList, setContactsList],
        refreshContact : [refreshContact,setRefreshContact]
    };

    return (
        <GlobalState.Provider value={states}>
            {children}
        </GlobalState.Provider>
    );
};

export default DataProvider;
