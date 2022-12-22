import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState } from "../../globalstate"

const Project = () => {
    const [user] = useRecoilState(userState)

    if (!user.isLoggedIn) {
        return <Navigate replace to="/" />
    } else {
        return (
            <div>
                <NavBar />
            </div>
        )
    }
}

export default Project