import React, { useState, useEffect } from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { getHotels} from './dataSource/axiosData'


import Map from './components/Map'
import Sidebar from './components/Sidebar'
import ProductDisplay from './components/ProductDisplay'

type hotel= {
  name: string;
  imgs: {
    url: string
  }[] 
  contacts:{
    email: string
    telephone: number
  }
  location:{
      geoLocation:{
        latitude: number
        longitude: number
        timezone: string
      }
      country: string
      town: string
      countryCode: string
      postCode: string
      addresses: string[]
  }
  rating: number
  description: string

}
export interface ForHotel{
  hotels: hotel[]
}



function App() {
const [ mahoteli, setMahoteli ] = useState<ForHotel["hotels"]>([])
const [ memHoteli, setMemHoteli ] = useState<ForHotel["hotels"]>([])
  
  const dataAfterAwait = async()=>{
    const hotelData = await getHotels()
    setMahoteli(hotelData!)
    setMemHoteli(hotelData!)
    // console.log(mahoteli)
    // console.log("this is mahoteli")
  }

  useEffect(() => {
    dataAfterAwait()
  },[])
  

  return (
    <Box>
      <Stack direction="column">
        <Box  sx={{height:'30%', backgroundColor:'skyblue'}}>
            <Map mahoteli={mahoteli}/>
        </Box>
        
        <Stack display="flex" direction={{xs:'column', md:'row'}} justifyContent="flex-start" alignItems={{xs:"flex-start", md:"flex-start"}} mb={0} pb={0}>       
          <Box  >
            <Sidebar hotels={mahoteli} setHotels={setMahoteli} memHotels={memHoteli}/>
          </Box>
          <Divider sx={{display:{sx:'none', md:'flex'}}} orientation="vertical" flexItem />
          <Box sx={{width: '100%', display:{md:"flex"}}}>
            <ProductDisplay hotels={mahoteli}  setHotels={setMahoteli}/>
          </Box>
        </Stack>
      </Stack>
      
    </Box>
  );
}

export default App;
