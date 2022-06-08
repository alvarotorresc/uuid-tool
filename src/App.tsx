import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Input, Heading, Button, Flex, Text, ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Divider,
  IconButton, } from '@chakra-ui/react'
import { useState, useRef } from 'react';
import { validate as uuidValidate } from 'uuid';
import { useToast } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';
import { CopyIcon } from "@chakra-ui/icons";



export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setinputValue] = useState<string>("");
  const [generatedUuid, setgeneratedUuid] = useState<string>("");
  const toast = useToast()
  const statuses = ['success', 'error']

  const handleUuidChecker = () => (
    // eslint-disable-next-line no-sequences
    setinputValue(inputRef!.current!.value),
    toast({
      title: 'UUID not correct.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
    );

  

  const isValid = inputValue !== "" ? uuidValidate(inputValue) : true;
  


  return (
    <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="30vh" p={8}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Heading p={32}>UUID Tool</Heading>
          <VStack spacing={8}>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
              <Text>UUID checker</Text>
              <Input isInvalid={!isValid} ref={inputRef} placeholder='Put here an uuid' size="lg" width="auto"/>
              <Button colorScheme='blue' onClick={handleUuidChecker}>Validate</Button>
            </Flex>
            <Divider />
            <Flex minWidth='max-content' alignItems='center' gap='2'>
              <Button colorScheme='red' onClick={() => setgeneratedUuid(uuidv4())}>Generate UUID</Button>
              <Text>{generatedUuid}</Text>
              {generatedUuid && 
              <IconButton
              variant='outline'
              colorScheme='teal'
              aria-label='Call Sage'
              fontSize='20px'
              icon={<CopyIcon />}
              onClick={() => navigator.clipboard.writeText(generatedUuid)}
              />  
              } 
            </Flex>
          </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
  )
}

