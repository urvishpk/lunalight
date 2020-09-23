import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  brandWrapper: {
    flexGrow: 1,
  },
  brand: {
    height: "100%",
    lineHeight: "36px",
  },
  logout: {
    color: "inherit",
  },
}));

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const classes = useStyles();
  const [logout] = useLogoutMutation();
  const { loading, data, refetch } = useMeQuery();
  let content;
  const handleLogout = async () => {
    await logout();
    refetch();
  };
  if (loading) {
    content = <>Loading</>;
  } else if (data && data.me.success) {
    content = (
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.container}>
            <Box className={classes.brandWrapper}>
              <Typography variant="h6" component="h1" className={classes.brand}>
                Lunalight
              </Typography>
            </Box>
            <Box>
              <Button
                className={classes.logout}
                onClick={handleLogout}
                data-testid="logoutButton"
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else {
    content = <Redirect to="/login" />;
  }
  return <>{content}</>;
};

export default NavBar;
