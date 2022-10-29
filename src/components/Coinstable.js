import React, { useEffect, useState } from "react";
import { CoinList } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import './assests/css/new.css';
import axios from "axios";
import {
  //Container,
  createTheme,
  LinearProgress,
  makeStyles,
  //Table,
  //TableBody,
  //TableCell,
  //table,
  //TableHead,
  //TableRow,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";

const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
      fontSize: "12px"
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  
  const classes = useStyles();

  const finalData = coins
    .slice((page - 1) * 10, (page - 1) * 10 + 5)
    .map((row) => {
      const profit = row.price_change_percentage_24h > 0;
      return (
        <tr
          onClick={() => navigate(`/coins/${row.id}`)}
          className={classes.row}
          style={{color:'white', align:"left"}}
          key={row.name}
          
        >
          <td>
            <img
              src={row?.image}
              alt={row.name}
              height="50"
              style={{ marginBottom: 10 }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: 22,
                }}
              >
                {row.symbol}
              </span>
              <span style={{ color: "darkgrey" }}>{row.name}</span>
            </div>
          </td>
          <td >
            {symbol} {numberWithCommas(row.current_price.toFixed(1))}
          </td>
          <td
            style={{
              color: profit > 0 ? "rgba(14,203,129)" : "red",
              fontWeight: 300,
            }}
          >
            {profit && "+"}
            {row.price_change_percentage_24h.toFixed(2)}%
          </td>
          <td>
            {symbol} {numberWithCommas(row.market_cap.toString().slice(0,3))}M
          </td>
        </tr>
      );
    });

  return (
    <ThemeProvider theme={darkTheme}  >
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) :(
        <table class="table  mytable" >
          <thead style={{ backgroundColor: "#EEBC1D" }}>
            <tr>
              <th scope="col">Coin</th>
              <th scope="col">Price</th>
              <th scope="col">24h Change</th>
              <th scope="col">Market Cap</th>
            </tr>
          </thead>
          <tbody>{finalData}</tbody>
        </table>)}
        <div className="container">
        <Pagination
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center ",
          }}
          classes={{ ul: classes.pagination }}
          count={(coins.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Coinstable;
