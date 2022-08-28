import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel'
import { Button, Card, CardActions, CardContent, Grid, Rating, Typography } from '@mui/material';



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
  setOpenIt: React.Dispatch<React.SetStateAction<boolean>>
  // openIt: boolean
  setModalHotel: React.Dispatch<React.SetStateAction<hotel | undefined>>
  // modalHotel: hotel | undefined

}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


const ProductDisplayList: React.FC<Properties> = ({hotels, setOpenIt, setModalHotel}) => {
  
  const handleOpen = (name: string, description: string) => {
    // console.log(openIt)
    let actModalHotel = hotels.filter((hotel)=>{
      return hotel.name === name && hotel.description === description
    })
    setModalHotel(actModalHotel[0]); //
    setOpenIt(true);
  }
  

  


  const theListItems = hotels.map((hotel, index)=>{
    return (
      <>
        <Box key={index} sx={{  m:2, ml: 4, width: '100%' }}>
          <Stack spacing={2}>
              <Card sx={{ display: 'flex' }}>
                {/* <CardMedia
                  component="img"
                  sx={{ width: 300, height: 300 }}
                  image={hotel.imgs[0].url}
                  alt={hotel.name}
                /> */}
                <CardContent sx={{ width: 300, height: 300 }}>
                  <Carousel sx={{width: 300, height: 300}}>
                    {hotel.imgs.map((img, index)=>{
                      return (
                      <CardMedia
                        key={index}
                        component="img"
                        sx={{ width: 300, height: 300 }}
                        image={img.url}
                        alt={hotel.name}
                      />)
                    })}
                  </Carousel>
                </CardContent>
                <Stack sx={{display:'flex', direction:'column'}}>
                  <CardContent sx={{width:"95%"}}>
                    <Box sx={{ width: '95%', display: 'flex', direction: 'row',  justifyContent: "space-between"}}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {hotel.contacts.telephone}
                      </Typography>
                      <Rating value={Number(hotel.rating)} readOnly />
                    </Box>
                    <Typography variant="h5" component="div">
                      {hotel.name}{bull}<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{hotel.location.country}</Typography>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {hotel.location.addresses[0]}
                    </Typography>
                    <Typography variant="body2">
                      {hotel.description.slice(0, 150) + "..."}
                      <br />
                      {hotel.contacts.email}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>handleOpen(hotel.name, hotel.description)} size="small">View</Button>
                  </CardActions>
                </Stack>
              </Card>
          </Stack>
        </Box>
      </>
    )

    })
  
  return (
    <Box>
      <Grid sx={{ position: 'relative', left: 15, width: '100%'}} container spacing={2}>
        {theListItems}
      </Grid>
    </Box>
  )
}

export default ProductDisplayList