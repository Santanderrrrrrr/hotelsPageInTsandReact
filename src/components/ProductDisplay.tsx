import { Stack, Box, styled, Tabs, Tab,  } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, {useState} from 'react';

import ProductDisplayList from './moduleOrList/ProductDisplayList';
import ProductDisplayGrid from './moduleOrList/ProductDisplayGrid';
import RoomDisplay from './roomsList/RoomDisplay'

import BasicModal from './moduleOrList/modal/BasicModal';

import * as theTypes from '../componentTypes/allTheTypes.types'


const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({theme})=>({
  border: 'none',
  // backgroundColor: "#222",
  
}))

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProductDisplay: React.FC<theTypes.Properties> = ({ hotels, filteredHotelRoomSets}) => {
  
  const [openIt, setOpenIt] = useState<boolean>(false);
  const [ modalHotel, setModalHotel ] = useState<theTypes.hotel>()
  const [view, setView] = useState<string>('list');
  const [ seeRooms, setSeeRooms ] = useState<number>(0)

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);

    // console.log(nextView)
  };
  const handleTabChange =(event: React.SyntheticEvent, newValue: number) => {
    setSeeRooms(newValue);
  };

  return (
    <Box sx={{ width:'100%'}}>
      <Box sx={{  width:'100%', display: 'flex', direction: 'column', alignItems:"center", justifyContent: "space-between", p:0, mr:8}}>
        {/* <Typography variant="h6" sx={{ml:4}}>{seeRooms === 0? 'Viewing Hotels': 'Viewing Rooms'}</Typography> */}

        {/*Choose between viewing hotels and rooms */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", m:2}}>
          <Tabs
            value={seeRooms}
            onChange={handleTabChange}
            aria-label="basic tabs"
          >
            <Tab label="Hotels w/ Rooms" {...a11yProps(0)} />
            <Tab label="Hotels" {...a11yProps(1)} />
            
          </Tabs>
        </Box>

        {/* toggle between list and module view */}
        {!!seeRooms && <Stack sx={{ m: 2,  direction: 'column', alignItems: {md:'flex-end', xs:'flex-end'}, justifyContent:'space-between', width:{xs:"30%", md: "30%"}}}>  
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
        </Stack>}
      </Box>

      <Stack>
        {!!seeRooms?( 
          <>
            {view === "list" && <ProductDisplayList hotels={hotels} setOpenIt={setOpenIt} setModalHotel={setModalHotel}/>}
            {view === "module" && <ProductDisplayGrid hotels={hotels} setOpenIt={setOpenIt} setModalHotel={setModalHotel}/>}
          </>
        ):(
          <RoomDisplay hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>
        )}
        <BasicModal hotel={modalHotel} openIt={openIt} setOpenIt={setOpenIt}/>
      </Stack>

    </Box>
  )
}

export default ProductDisplay