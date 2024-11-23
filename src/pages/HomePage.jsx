import { Box, Button, Container, Flex, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import TasksList from "../components/TasksList"

const HomePage = () => {
  const [taskStatus, setTaskStatus] = useState("all");

  return (
    <Container maxW='container.xl' py={12} pt={"100px"}>
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
              variant={taskStatus === "all" ? "solid" : "ghost"}
              colorScheme={taskStatus === "all" ? "blue" : "gray"}
              onClick={() => setTaskStatus("all")}
            >
              <Text>All Tasks</Text>
              {taskStatus === "all" && (
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
              variant={taskStatus === "ongoing" ? "solid" : "ghost"}
              colorScheme={taskStatus === "ongoing" ? "blue" : "gray"}
              onClick={() => setTaskStatus("ongoing")}
            >
              <Text>On-Going</Text>
              {taskStatus === "ongoing" && (
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
              variant={taskStatus === "completed" ? "solid" : "ghost"}
              colorScheme={taskStatus === "completed" ? "blue" : "gray"}
              onClick={() => setTaskStatus("completed")}
            >
              <Text appearance="blue">Completed</Text>
              {taskStatus === "completed" && (
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