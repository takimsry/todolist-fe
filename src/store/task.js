import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  createTask: async (newTask) => {
    if(!newTask.title) {
      return { success: false, message: "Please provide task title" };
    }

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    })

    const data = await res.json();
    set((state) => ({ tasks: [...state.tasks, data]}));
    return { success: true, message: "Task created successfully" };  
  },

  fetchTasks: async (status) => {
    const query = `?status=${status}`;
    const res = await fetch(`/api/tasks/all${query}`);
    const data = await res.json();
    set({ tasks: data });
  },

  deleteTask: async (id) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if(!data) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }));
    return { success: true, message: data.message };
  },

  updateTask: async (id, updatedTask) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    if(!data) {
      return { success: false, message: "Something went wrong" };
    }

    set((state) => ({
      tasks: state.tasks.map((task) => (
        task.id === id ? data : task
      ))
    }))
    return { success: true, message: "Task updated successfully" };
  },

  updateTaskStatus: async (id) => {
    const res = await fetch(`/api/tasks/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if(!data) {
      return { success: false, message: "Something went wrong" };
    }

    set((state) => ({
      tasks: state.tasks.map((task) => (
        task.id === id ? data : task
      ))
    }))
    return { success: true, message: "Task status updated successfully" };
  },

}));
