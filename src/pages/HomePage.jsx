import { Box, Button, Container, Flex, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import TasksList from "../components/TasksList"

const HomePage = () => {
  const [taskStatus, setTaskStatus] = useState(false);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Tasks
        </Text>

        <Box mb={8}>
          <Flex>
            <Button
              flex="1"
              p={3}
              textAlign="center"
              cursor="pointer"
              variant={taskStatus === false ? "solid" : "ghost"}
              colorScheme={taskStatus === false ? "blue" : "gray"}
              onClick={() => setTaskStatus(false)}
            >
              <Text>On-Going</Text>
              {taskStatus === false && (
                <Box
                  position="absolute"
                  bottom={0}
                  left="50%"
                  transform="translateX(-50%)"
                  width="2.5rem"
                  height="2px"
                  bg="primary"
                  borderRadius="full"
                />
              )}
            </Button>

            <Button
              flex="1"
              p={3}
              textAlign="center"
              cursor="pointer"
              variant={taskStatus === true ? "solid" : "ghost"}
              colorScheme={taskStatus === true ? "blue" : "gray"}
              onClick={() => setTaskStatus(true)}
            >
              <Text appearance="blue">Completed</Text>
              {taskStatus === true && (
                <Box
                  position="absolute"
                  bottom={0}
                  left="50%"
                  transform="translateX(-50%)"
                  width="2.5rem"
                  height="2px"
                  bg="primary"
                  borderRadius="full"
                />
              )}
            </Button>
          </Flex>
        </Box>
        
        <TasksList taskStatus={taskStatus} />
      </VStack>
    </Container>
  )
}

export default HomePage