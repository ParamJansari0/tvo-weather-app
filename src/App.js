import { React, useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormHelperText,
  Input,
  Button,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';

function App() {
  const [cityName, setCityName] = useState('Toronto')
  const [weatherData, setWeatherData] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.cityName.value)
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
        console.log(response.data);
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
