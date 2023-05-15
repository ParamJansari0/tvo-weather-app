import React from 'react';
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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <form>
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
