import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";
import "../assests/css/new.css";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner1.jpg)",
  },

  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className="container">
          <div
            style={{
              fontWeight: "bold",
              marginBootom: 10,
              fontSize: "40px",
              fontFamily: "Montserrat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="header">Crypto Tracker</div>
          </div>
          <div
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: "25px",
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="desc">
              Get all the Info regarding your favourite Crypto Currency.
            </div>
          </div>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
