import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../features/drawerSlice";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ProfilePopover from "./ProfilePopOver";
import { setAnchorEl } from "../features/profilePopOverSlice";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { changeTheme } from "../features/themeSlice";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AssessmentIcon from "@mui/icons-material/Assessment";
const drawerWidth = 240;
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  if (name.split(" ")[1]) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  paper: "background.paper",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    color: "background.paper",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const userName = useSelector((state) => state.user.name);
  const themeName = useSelector((state) => state.theme.theme);
  const open = useSelector((state) => state.drawer.isOpen);
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    dispatch(setIsOpen(true));
  };

  const handleDrawerClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                alignSelf: "center",
                color: "secondary.main",
              }}
            >
              Welcome {userName}
            </Typography>
            <Box>
              {props.extraButton}
              <Button
                onClick={(event) => {
                  // dispatch(setAnchorEl(event.currentTarget));
                  dispatch(setAnchorEl(event.currentTarget));
                }}
              >
                <Avatar {...stringAvatar("Samrat")} />
              </Button>
            </Box>
          </Box>
          <Button
            onClick={(event) => {
              if (themeName == "Light") {
                dispatch(changeTheme("Dark"));
              } else {
                dispatch(changeTheme("Light"));
              }
            }}
            sx={{ color: "secondary.main" }}
          >
            <WbSunnyIcon />
          </Button>
          <ProfilePopover />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "primary.main",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "primary.contrastText" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "primary.contrastText" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "primary.contrastText" }} />
        <List>
          {[
            "dashboard",
            "information",
            "panels",
            "users",
            "chat",
            "assessment",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "primary.contrastText",
                }}
                onClick={() => {
                  navigate("/" + text);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "primary.contrastText",
                  }}
                >
                  {index === 0 ? (
                    <DashboardCustomizeIcon
                      sx={{ color: "primary.contrastText" }}
                    />
                  ) : index === 1 ? (
                    <PhoneInTalkIcon sx={{ color: "primary.contrastText" }} />
                  ) : index === 2 ? (
                    <PersonPinCircleIcon
                      sx={{ color: "primary.contrastText" }}
                    />
                  ) : index === 3 ? (
                    <PeopleIcon sx={{ color: "primary.contrastText" }} />
                  ) : index === 4 ? (
                    <ChatIcon sx={{ color: "primary.contrastText" }} />
                  ) : (
                    <AssessmentIcon sx={{ color: "primary.contrastText" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "primary.contrastText",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1.5,
          height: "100%",
        }}
      >
        <DrawerHeader />
        {props.content}
      </Box>
    </Box>
  );
}
