import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../globalstate'
const CompanyScreen = () => {
    const [user, setUser] = useRecoilState(userState)

    if (!user.isLoggedIn) {
        return <Navigate replace to="/" />
    } else if (!user.isAdmin) {
        return <Navigate replace to="/announcements" />
    }
    else {
        return (
            <div>
                <h1>Company</h1>
            </div>
        )
    }
}

export default CompanyScreen