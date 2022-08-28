import { Stack, Box, styled, Typography,  } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, {useState, useEffect} from 'react';
import { getHotels } from '../dataSource/axiosData'

import ProductDisplayList from './moduleOrList/ProductDisplayList';
import ProductDisplayGrid from './moduleOrList/ProductDisplayGrid';

import BasicModal from './moduleOrList/modal/BasicModal';

type hotel = {
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
interface Properties{
  
  hotels:hotel[]
  setHotels: React.Dispatch<React.SetStateAction<hotel[]>>
}


const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({theme})=>({
  border: 'none',
  // backgroundColor: "#222",
  
}))



const ProductDisplay: React.FC<Properties> = ({hotels, setHotels}) => {
  const [openIt, setOpenIt] = useState<boolean>(false);
  const [ modalHotel, setModalHotel ] = useState<hotel>()


  
  
 

  const [view, setView] = React.useState<string>('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
    console.log(nextView)
  };

  return (
    <Box sx={{ width:'100%'}}>
      <Box sx={{  width:'100%', display: 'flex', direction: 'column', alignItems:"center", justifyContent: "space-between", p:0, mr:8}}>
        <Typography variant="h6" sx={{ml:4}}>Available Hotels</Typography>
        <Stack sx={{ m: 2,  direction: 'column', alignItems: {md:'flex-end', xs:'flex-end'}, justifyContent:'space-between', width:{xs:"50%", md: "50%"}}}>
          
          <CustomToggleButtonGroup
            orientation="horizontal"
            value={view}
            exclusive
            onChange={handleChange}
            
          >
            <ToggleButton value="list" aria-label="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
              <ViewModuleIcon />
            </ToggleButton>
            
          </CustomToggleButtonGroup>
        </Stack>
      </Box>

      <Stack>
        {view === "list" && <ProductDisplayList hotels={hotels} setOpenIt={setOpenIt} setModalHotel={setModalHotel}/>}
        {view === "module" && <ProductDisplayGrid hotels={hotels} setOpenIt={setOpenIt} setModalHotel={setModalHotel}/>}
        <BasicModal hotel={modalHotel} openIt={openIt} setOpenIt={setOpenIt}/>
      </Stack>

    </Box>
  )
}

export default ProductDisplay