import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core'
import { makeStyles, mergeClasses } from '@material-ui/core/node_modules/@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api'
import {chartDays} from '../config/data'
import { SelectButton } from '../Components/SelectButton'
import { CryptoState } from '../CryptoContext'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
const useStyles = makeStyles((theme)=>({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    // [theme.breakpoints.down("md")]: {
    //   width: "100%",
    //   marginTop: 0,
    //   padding: 20,
    //   paddingTop: 0,
    // }
  },
}))




const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
const {currency}=CryptoState()

const fetchHistoricData = async () => {
  const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
setHistoricData(data.prices)
};
useEffect(() => {
  fetchHistoricData();

},[currency,days])

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


const classes = useStyles()
  return (
<ThemeProvider theme={darkTheme}>
  <div className={classes.container}>
    


    {
    
<Line
data={{
  labels: historicData?.map((coin) => {
let date = new Date(coin[0]);
 let time = 
 date.getHours() > 12 
 ? `${date.getHours()- 12} : ${date.getMinutes()} PM`
 : `${date.getHours()- 12} : ${date.getMinutes()} AM`

 return days === 1 ? time: date.toLocaleDateString()
}),
datasets:[ 
  {data: historicData?.map((coin)=> coin[1]),
  label:   `Price (Past ${days} Days) in ${currency}`,
  borderColor: '#EEBC1D',
  }
],
}}
options={{
  elements:{
    point:{
      radius: 1,

    },
  },
}}
/> 



    }
    <div
    style={{
      display:'flex',
      marginTop:20,
      justifyContent: 'space-around',
      width:'100%'
    }}
    >
{chartDays.map(day => (
  <SelectButton
  key={day.value}
  onClick={()=>setDays(day.value)}
  selected={day.value === days}

  >{day.label}</SelectButton>
))}
</div>
  </div>

</ThemeProvider>  )
}

export default CoinInfo