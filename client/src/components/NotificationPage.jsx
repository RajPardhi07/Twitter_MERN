import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";




const NotificationPage = () => {


    const { user } = useSelector(store => store.user);

    console.log("user",user._id)

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/notification/${user._id}`)
                console.log(res.data)
                setNotifications(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchNotification();
    }, [])

    if (loading) return <div>Loading Notification....</div>

    return (
        <div>
            <h2>NotificationPage</h2>


            {notifications.length === 0 ? (
                <p>No notification available</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification._id}>
                            <p>{notification.from.username} {notification.type === "follow" ? "Followed You" : "liked post"}</p>

                        </li>
                    ))}
                </ul>
            )


            }
        </div>
    )
}

export default NotificationPage