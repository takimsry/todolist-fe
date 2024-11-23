import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react"
import { useTaskStore } from "../store/task";

const CreatePage = () => {
  const [newTask, setNewTask] = useState({
    title: ""
  });

  const toast = useToast();

  const { createTask } = useTaskStore();

  const handleAddTask = async () => {
    const { success, message } = await createTask(newTask);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      });
    }

    setNewTask({ title: "" });
  }

  return (
    <Container maxW={"container.sm"} pt={"100px"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Task
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          p={6}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddTask} w="full">
              Add Task
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage