import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container
      as={"header"}
      position={"fixed"}
      maxW={"100%"}
      px={20}
      zIndex={2}
      backgroundColor={useColorModeValue("gray.100/80", "gray.900/80")}
      backdropFilter={useColorModeValue("saturate(180%) blur(5px)", "saturate(120%) blur(5px)")}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Todolist</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20"/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar