import { makeAutoObservable } from "mobx";
import { Task } from "../models/TaskModel";

class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    removeTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTask(updatedTask: Task) {
        this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    }

    getTasksForDate(date: Date) {
        return this.tasks.filter(task =>
            task.date.getFullYear() === date.getFullYear() &&
            task.date.getMonth() === date.getMonth() &&
            task.date.getDate() === date.getDate()
        );
    }

    moveTask(id: string, newDate: Date, newIndex: number) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex > -1) {
            const task = this.tasks[taskIndex];
            const insertionIndex = this.tasks.findIndex((t, index) => {
                return t.date.getTime() === newDate.getTime() && index >= newIndex;
            });

            this.tasks.splice(taskIndex, 1);

            if (insertionIndex > -1) {
                this.tasks.splice(insertionIndex, 0, {...task, date: newDate});

                return;
            }

            this.tasks.push({...task, date: newDate});
        }
    }

    exportTasks() {
        return JSON.stringify(this.tasks);
    }

    importTasks(tasksJson: string) {
        const tasks: Task[] = JSON.parse(tasksJson);

        if (Array.isArray(tasks)) {
            tasks.forEach(task => {
                if (!this.tasks.some(t => t.id === task.id)) {
                    task.date = new Date(task.date);
                    this.addTask(task);
                } else {
                    console.warn(`Task with id ${task.id} already exists and was not imported.`);
                }
            });
        }
    }
}

export const taskStore = new TaskStore();