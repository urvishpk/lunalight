import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  landing: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
  },
  heading: {
    flexGrow: 1,
    textAlign: "center",
  },
  headingText: {
    width: "100%",
    paddingTop: "32%",
  },
  footer: {
    display: "flex",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "8px",
  },
  copyright: {
    flexGrow: 1,
  },
  vendorLink: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "orange",
      cursor: "pointer",
    },
  },
}));

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.landing}>
      <Box className={classes.heading} data-testid="heading">
        <Typography component="h1" variant="h3" className={classes.headingText}>
          We'll be up soon.
        </Typography>
      </Box>
      <Box className={classes.footer}>
        <Box className={classes.copyright} data-testid="copyright">
          <Typography>&copy; 2020 Lunalight</Typography>
        </Box>
        <Box data-testid="vendorLogin">
          <Link to="/login" className={classes.vendorLink}>
            <Typography>Vendor Login &rarr;</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
