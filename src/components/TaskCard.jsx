import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Checkbox, Flex, Heading, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useTaskStore } from "../store/task";
import { useState } from "react";
import { format } from "date-fns";
import { IoMdTime } from "react-icons/io";

const TaskCard = ({ task, fetchTasks }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const dueColor = useColorModeValue("red", "pink");

  const { updateTask, updateTaskStatus, deleteTask } = useTaskStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const today = new Date().toISOString();

  const handleUpdateTask = async (id, updatedTask) => {
    const { success, message } = await updateTask(id, updatedTask);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 2000
      })
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 2000
      })
    }
  }

  const handleUpdateTaskStatus = async (id) => {
    const { success, message } = await updateTaskStatus(id);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 2000
      })
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 2000
      })
      fetchTasks();
    }
  }

  const handleDeleteTask = async (id) => {
    const { success, message } = await deleteTask(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 2000
      })
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 2000
      })
    }
  }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.2s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Box p={4}>
        <Flex justify={"space-between"}>
          <HStack>
            <Checkbox
              isChecked={task.status}
              onChange={() => handleUpdateTaskStatus(task.id)}
              sx={{
                borderColor: useColorModeValue("gray.400", "gray.600"),
                _hover: { borderColor: useColorModeValue("gray.600", "gray.400") }
              }}
            />
            <VStack spacing={0} align={"start"} ml={2}>
              <Heading as={"h3"} fontSize={"xl"}>
                {task.title}
              </Heading>
              {task.deadline && (
                <HStack mt={2}>
                  <IoMdTime color={(!task.status && (task.deadline < today)) ? dueColor : textColor} />
                  <Text fontSize={"md"} color={(!task.status && (task.deadline < today)) ? dueColor : textColor}>
                    {task.deadline ? format(new Date(task.deadline), "dd MMMM yyyy, HH:mm") : ""}
                  </Text>
                </HStack>
              )}
            </VStack>
          </HStack>
          <HStack spacing={2}>
            <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
            <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" />
          </HStack>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Task</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="title"
                placeholder="Task Title"
                value={updatedTask.title}
                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
              />
              <Input
                name="deadline"
                placeholder="Deadline"
                type="datetime-local"
                value={updatedTask.deadline ? format(new Date(updatedTask.deadline), "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) => setUpdatedTask({ ...updatedTask, deadline: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateTask(task.id, updatedTask)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default TaskCard