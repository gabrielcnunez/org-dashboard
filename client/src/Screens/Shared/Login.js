import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import logo from "../../Assets/logo.png";
import { Navigate } from "react-router-dom";
import { errorState, userState } from "../../globalstate";
import { login } from "../../Services/users";
const Login = () => {
    const [user, setUser] = useRecoilState(userState);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = useRecoilState(errorState);

    const paperStyle = { justifyContent: "center", alignItems: "center", padding: 20, height: '40vh', width: "30vw", color: "#1ba098", background: "#051622", border: "1px solid #deb992", borderRadius: "5px", display: "flex", flexDirection: "column" }
    const avatarStyle = { backgroundColor: '#1bbd7e', height: "80px", width: "80px" }
    const btnstyle = { margin: '8px 0', background: "#051622", color: "#1ba098", border: "1px solid #1ba098", borderRadius: "5%", width: "10vw" }
    const inputStyle = {
        background: "#051622", borderBottom: "1px solid #deb992", marginBottom: "10px", textAlign: "center"
    }


    const handleLogin = async () => {
        if (username === "" || password === "") {
            setError({ isError: true, message: "Please fill out all fields" })
            return;
        }

        const response = await login(username, password).catch((err) => {
            setError({ isError: true, message: "Invalid username or password" })
        });

        if (!response) {
            setError({ isError: true, message: "No Response From Server" })
        } else

            if (response) {
                setError({ isError: false, message: "" })
                setUser({
                    isLoggedIn: true,
                    id: response.id,
                    profile: response.profile,
                    isAdmin: response.admin,
                    active: response.active,
                    status: response.status,
                    companies: response.companies,
                    teams: response.teams,
                })
            }
    }


    if (user.isLoggedIn) {
        return <Navigate replace to="/company" />
    } else {

        return (
            <Grid style={{ justifyContent: "center", alignItems: "center", height: "100vh", background: "#051622", color: "#1ba098", display: "flex", flexDirection: "column" }} >
                <Grid align='center'>
                    <Avatar style={avatarStyle} src={logo}></Avatar>
                    <h2>Cook Systems</h2>
                    <h3>A Final App</h3>
                </Grid>
                <Paper elevation={10} style={paperStyle}>
                    <TextField value={username} onChange={(e) => setUsername(e.target.value)} sx={{ input: { color: "#1ba098" }, "label": { color: "#1ba098" } }} id="username" label='Username' placeholder='Enter username' type='text' required style={inputStyle} />
                    <br />
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: "#1ba098" }, "label": { color: "#1ba098" } }} label='Password' placeholder='Enter password' type='password' required style={inputStyle} />
                    <br />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} pill="true" onClick={() => handleLogin()}>Login</Button>
                    {error.isError ? <p style={{ color: "red" }}>{error.message}</p> : null}
                </Paper>
            </Grid >

        );
    }
}

export default Login;
