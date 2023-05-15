import { React, useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormHelperText,
  Input,
  Button,
  VStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  Image,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';

function WeatherCard(props) {
  const weatherData = props.weatherData

  return (
    weatherData !== undefined &&
    <Card>
      <CardHeader>
        <Text>{weatherData.name}</Text>
      </CardHeader>
      <CardBody>
        <Image src={`${process.env.REACT_APP_OPEN_WEATHER_ICON_API}${weatherData?.weather[0].icon}@2x.png`}></Image>
        <Text>{`${weatherData.main.temp.toFixed(0)} °C`}</Text>
      </CardBody>
    </Card>
  )
}
function App() {
  const [cityName, setCityName] = useState('Toronto')
  const [weatherData, setWeatherData] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    setCityName(event.target.cityName.value)
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_OPEN_WEATHER_API, {
      params: {
        q: `${cityName}, CA`,
        appid: 'ac354a64e71cf853731343f90fdcf94a',
        units: 'metric'
      }
    })
      .then(function (response) {
        setWeatherData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [cityName])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <WeatherCard weatherData={weatherData} />
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Input
                  name='cityName'
                  placeholder='City Name'
                />
                <FormHelperText>Enter a city in Canada.</FormHelperText>
              </FormControl>
              <Button type='submit' my={5} color={'teal'}>Submit</Button>
            </form>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
