import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Carousel from 'react-material-ui-carousel'
import { CardContent, CardMedia, Rating, Stack } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface Properties{
  hotel: {
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
  
  } | undefined
  setOpenIt: React.Dispatch<React.SetStateAction<boolean>>
  openIt: boolean
  
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:700, sm:400, xs: '100%'},
  bgcolor: 'background.paper',
  border: '1px solid #333',
  borderRadius:'5px',
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<Properties> = ({hotel, openIt, setOpenIt}) => {
  const handleClose = () => {
    // console.log(openIt)
    setOpenIt(false);
  }
  

  return (
    <Modal
      open={openIt}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        
          {hotel && <Box sx={style}>
            <Stack spacing={2}>
              
                  <Carousel
                   next={ (next, active) => console.log(``) }
                   prev={ (prev, active) => console.log(``) }          
                   sx={{width: '100%'}}
                   NextIcon={<ArrowForwardIos/>}
                   PrevIcon={<ArrowBackIos/>}
                  >
                    {hotel.imgs.map((img, index)=>{
                      return (
                      <Stack sx={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          key={index}
                          // component="img"
                          style={{maxWidth:500, maxHeight:'100%'}}
                          src={img.url}
                          alt={hotel.name}
                        />
                      </Stack>)
                    })}
                  </Carousel>
                
                  <Stack sx={{display:'flex', direction:'column'}}>
                    <CardContent >
                      <Box sx={{ display: 'flex', direction: 'row',  justifyContent: "space-between"}}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {hotel.contacts.telephone}
                        </Typography>
                        <Rating value={Number(hotel.rating)} readOnly />
                      </Box>
                      <Typography variant="h5" component="div">
                        {hotel.name}<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{hotel.location.country}</Typography>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {hotel.location.addresses[0]}
                      </Typography>
                      <Typography variant="body2">
                        {hotel.description}
                        <br />
                        {hotel.contacts.email}
                      </Typography>
                    </CardContent>
                    

                  </Stack>
                
            </Stack>
          </Box>}
        
      </div> 
    </Modal>
  );
}

export default BasicModal