import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { userState } from '../globalstate';
import { useRecoilState } from 'recoil';

const NavBar = () => {
    const [user, setUser] = useRecoilState(userState);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const anchor = 'top';
    const [toggled, setToggled] = React.useState(true);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
        setToggled(!toggled);
    };

    const list = (anchor) => (
        <Box

            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List style={{ textAlign: "center", background: "#051622" }} sx={{ width: '100%' }}>
                {["Announcements", "Projects", "Teams", "Users"].map((text, index) => (
                    <ListItem key={text} disablePadding
                        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                        <Link to={"/" + text.toLowerCase()} style={{ textDecoration: "none", color: "black" }}>
                            <ListItemButton sx={{ width: '100%' }}>
                                <ListItemText style={{ color: "#1ba098" }} primary={text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
                <ListItem key={"logout"} disablePadding
                    sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                    <ListItemButton sx={{ width: '100%', textAlign: "center" }} onClick={() => {
                        setUser({});
                        localStorage.clear();
                    }}>
                        <ListItemText style={{ color: "#1ba098" }} primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box >
    );


    return (
        <div style={{ height: "8vh", color: "#1ba098", background: "#051622", paddingTop: ".5%" }}>
            {user.isAdmin ? <h1 style={{ color: "palevioletred", fontSize: "1.75rem" }}>Acting as Admin</h1> : null}
            {toggled ?
                <Button style={{ position: 'absolute', right: "2%", top: "1%", zIndex: "100" }} onClick={toggleDrawer(anchor, true)}><MenuIcon style={{ height: "5vh", width: "5vw" }} /></Button>
                :
                <Button style={{ position: 'absolute', right: "2%", top: "1%", zIndex: "100" }} onClick={toggleDrawer(anchor, false)}><CloseIcon style={{ height: "5vh", width: "5vw" }} /></Button>
            }
            <Drawer
                sx={{ zIndex: "99" }}
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}

export default NavBar;


