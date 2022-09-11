import React, { useRef } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid';
import { Box } from '@mui/material';
import { JsxElement } from 'typescript';




type hotel = {
  id: string
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
  setOpenIt: React.Dispatch<React.SetStateAction<boolean>>
  // openIt: boolean
  setModalHotel: React.Dispatch<React.SetStateAction<hotel | undefined>>
  // modalHotel: hotel | undefined
}

const ProductDisplayGrid: React.FC<Properties> = ({hotels, setOpenIt, setModalHotel}) => {

  const handleOpen = (name: string, description: string) => {
    // console.log(openIt)
    let actModalHotel = hotels.filter((hotel)=>{
      return hotel.name === name && hotel.description === description
    })
    setModalHotel(actModalHotel[0]); //
    setOpenIt(true);
  }
  

  const hotelRef = useRef([])
  hotelRef.current = []

  const addToRefs =(el: JsxElement): void =>{
    if(el){
      // hotelRef.current.push(el)
    }
  }


  

  let theCard =hotels.map((hotel, index) => {
    
    return(
      <React.Fragment key={hotel.id}>
        <Box key={index} ref={addToRefs} ml={4}>
          <Grid sx={{xs: 12, md: 5, lg: 3}}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                data-testid={`image for hotel #${index}`}
                component="img"
                height="140"
                image={hotel.imgs[0].url}
                alt={hotel.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.description.slice(0, 50) + "..."}
                </Typography>
                <Typography variant="overline" color="text.info">
                  {hotel.location.town + ", " + hotel.contacts.email }
                </Typography>

              </CardContent>
              <CardActions>
                <Button data-testid={`viewButton-${index}`} onClick={()=>handleOpen(hotel.name, hotel.description)} size="small">View</Button>
                
              </CardActions>
              
                
                {/* <BasicModal hotel={hotel} openIt={openIt} setOpenIt={setOpenIt}/> */}
              
              
            </Card>
          </Grid>
        </Box>
      </React.Fragment>
  )})


  return (
    <Grid sx={{width: '98%'}} container spacing={2}>
      {theCard}
    </Grid>
  )
}

export default ProductDisplayGrid