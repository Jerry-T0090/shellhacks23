import { Avatar } from '@suid/material';
import Logout from "@suid/icons-material/Logout";
import { A } from "@solidjs/router";

import { AppBar, Box, IconButton, Toolbar, Typography,  Menu,
  MenuItem,
  ListItemIcon,
  Divider, } from '@suid/material';

import { createSignal } from "solid-js";

export default function BasicAppBar() {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => Boolean(anchorEl());
  const handleClose = () => setAnchorEl(null);

  return (
    <>
    <Box sx={{ flexGrow: 1 ,  padding: '10px', backgroundColor: "#D77A61"}}>
      <AppBar position="static" sx={{ boxShadow: 'none', backgroundColor: "#D77A61"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '4rem' }}><A href="/home">
          Leftover Love
          </A>
          </Typography>
          <IconButton
            title="Account settings"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open() ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open() ? "true" : undefined}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: '4rem', height: '4rem' }}
            />
          </IconButton>
          

        </Toolbar>
      </AppBar>
    </Box>
    <Menu
    anchorEl={anchorEl()}
    id="account-menu"
    open={open()}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        ["& .MuiAvatar-root"]: {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        "&:before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)",
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{
      horizontal: "right",
      vertical: "top",
    }}
    anchorOrigin={{
      horizontal: "right",
      vertical: "bottom",
    }}
  >
    <MenuItem>
      <Avatar /> <A href="/profile">Profile</A>
    </MenuItem>
    <Divider />
    <MenuItem>
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
</>
);
}
