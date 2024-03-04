import React from 'react';
import { TaskCard, LabelBar, Label, TaskTitle } from './CalendarStyles';
import { Task } from "../../models/TaskModel";

type TaskCardProps = {
    task: Task;
    handleEditTask: (task: Task, e: React.MouseEvent<HTMLDivElement>) => void;
};

export const TaskCardComponent: React.FC<TaskCardProps> = ({ task, handleEditTask }) => {
    return (
        <TaskCard
            key={task.id}
            data-task-id={task.id}
            draggable="true"
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", task.id);
                e.dataTransfer.setData("task-date", task.date.toISOString());
            }}
            onClick={(e) => handleEditTask(task, e)}
            className="task-card"
        >
            <LabelBar>
                {task.labels?.map((color, index) => (
                    <Label key={index} color={color} />
                ))}
            </LabelBar>
            <TaskTitle>{task.title}</TaskTitle>
        </TaskCard>
    );
};