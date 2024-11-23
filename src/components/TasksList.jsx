import { SimpleGrid, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useTaskStore } from "../store/task"
import TaskCard from "../components/TaskCard"

const TasksList = ({ taskStatus }) => {
  const { fetchTasks, tasks } = useTaskStore();

  useEffect(() => {
    fetchTasks(taskStatus);
  }, [fetchTasks, taskStatus]);

  return (
    <>
      {tasks?.length === 0 && (
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          color={"gray.500"}
        >
          No tasks found 😭{" "}
          <Link to={"/create"}>
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create one now!
            </Text>
          </Link>
        </Text>
      )}

      <SimpleGrid
        columns={1}
        spacing={5}
        w={"full"}
      >
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} fetchTasks={() => fetchTasks(taskStatus)} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default TasksList