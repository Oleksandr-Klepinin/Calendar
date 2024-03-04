import React from "react";
import { taskStore } from "../../stores/TaskStore.ts";

export const handleDrop = (e: React.DragEvent<HTMLDivElement>, dayDate: Date) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const dropPointY = e.clientY;

    const taskElements = Array.from(document.querySelectorAll('.task-card'));
    let targetIndex = taskElements.length;

    for (let i = 0; i < taskElements.length; i++) {
        const taskRect = taskElements[i].getBoundingClientRect();
        if (dropPointY < taskRect.top) {
            targetIndex = i;
            break;
        }
        if (dropPointY >= taskRect.top && dropPointY <= taskRect.bottom) {
            const middlePoint = taskRect.top + (taskRect.height / 2);
            targetIndex = dropPointY <= middlePoint ? i : i + 1;
            break;
        }
    }

    taskStore.moveTask(taskId, new Date(dayDate), targetIndex);
};