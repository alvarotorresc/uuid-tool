import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {
  Input,
  Heading,
  Button,
  Flex,
  Text,
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Divider,
  IconButton,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { validate as uuidValidate } from "uuid";
import { v4 as uuidv4 } from "uuid";
import { CopyIcon } from "@chakra-ui/icons";

const hyphenUuidGenerator = (uuid: string) => {
  if (uuid !== "" || uuid.indexOf("-") !== -1) {
    uuid = uuid.split("-").join("");
    const part1 = uuid.substr(0, 8);
    const part2 = uuid.substr(8, 4);
    const part3 = uuid.substr(12, 4);
    const part4 = uuid.substr(16, 4);
    const part5 = uuid.substr(20);
    uuid = `${part1}-${part2}-${part3}-${part4}-${part5}`;
  }

  return uuid;
};

const hyphenUuidRemove = (uuid: string) => {
  return uuid.split("-").join("");
};

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHyphenRef = useRef<HTMLInputElement>(null);
  const inputRemovedHyphenRef = useRef<HTMLInputElement>(null);
  const [inputValue, setinputValue] = useState<string>("");
  const [generatedUuid, setgeneratedUuid] = useState<string>("");
  const [hyphenUuid, sethyphenUuid] = useState<string>("");
  const [hyphenRemovedUuid, sethyphenRemovedUuid] = useState<string>("");

  const toast = useToast();

  const handleUuidChecker = () => {
    const uuidInput = inputRef.current?.value;

    if (!uuidInput) {
      return;
    }

    setinputValue(uuidInput);
    const isValidUuid = uuidValidate(uuidInput);
    console.log(isValidUuid);
    if (isValidUuid) {
      toast({
        title: "UUID is correct",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      toast({
        title: "UUID not correct.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const isValid = inputValue !== "" ? uuidValidate(inputValue) : true;

  const handleHyphenUuid = () => {
    const uuid = inputHyphenRef!.current!.value;
    const newUuid = hyphenUuidGenerator(uuid);
    sethyphenUuid(newUuid);
  };

  const handleHyphenRemoveUuid = () => {
    const uuid = inputRemovedHyphenRef!.current!.value;
    const newUuid = hyphenUuidRemove(uuid);
    sethyphenRemovedUuid(newUuid);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="30vh" p={8}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Heading p={5} marginBottom={50}>
            UUID Tool
          </Heading>
          <VStack spacing={8}>
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <Text>UUID checker</Text>
              <Input
                isInvalid={!isValid}
                ref={inputRef}
                placeholder="Put here an uuid"
                size="lg"
                width="auto"
              />
              <Button colorScheme="blue" onClick={handleUuidChecker}>
                Validate
              </Button>
            </Flex>
            <Divider />
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <Button
                colorScheme="red"
                onClick={() => setgeneratedUuid(uuidv4())}
              >
                Generate UUID
              </Button>
              <Text>{generatedUuid}</Text>
              {generatedUuid && (
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<CopyIcon />}
                  onClick={() => navigator.clipboard.writeText(generatedUuid)}
                />
              )}
            </Flex>
            <Divider />
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <Text>UUID hyphen</Text>
              <Input
                ref={inputHyphenRef}
                placeholder="Put here an uuid without hyphens"
                size="lg"
                width="auto"
              />
              <Button colorScheme="green" onClick={handleHyphenUuid}>
                Hyphen UUID
              </Button>
            </Flex>
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <Text>{hyphenUuid}</Text>
              {hyphenUuid && (
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<CopyIcon />}
                  onClick={() => navigator.clipboard.writeText(hyphenUuid)}
                />
              )}
            </Flex>
            <Divider />
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <Text>UUID hyphen remove</Text>
              <Input
                ref={inputRemovedHyphenRef}
                placeholder="Put here an uuid with hyphens"
                size="lg"
                width="auto"
              />
              <Button colorScheme="pink" onClick={handleHyphenRemoveUuid}>
                Unhyphen UUID
              </Button>
            </Flex>
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <Text>{hyphenRemovedUuid}</Text>
              {hyphenRemovedUuid && (
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<CopyIcon />}
                  onClick={() =>
                    navigator.clipboard.writeText(hyphenRemovedUuid)
                  }
                />
              )}
            </Flex>
          </VStack>
          <Text paddingTop={20}>
            Made with &#10084; by{" "}
            <Link color="teal.300" href="https://www.alvarotc.com/">
              Alvaro Torres
            </Link>
          </Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
