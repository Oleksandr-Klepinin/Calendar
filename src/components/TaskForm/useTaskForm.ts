import { useState, useEffect } from 'react';
import { Task } from '../../models/TaskModel.ts';
import { v4 as uuidv4 } from 'uuid';
import { taskStore } from '../../stores/TaskStore.ts';

interface UseTaskFormProps {
    editingTask?: Task;
    onClose: () => void;
    date: Date;
}

export const useTaskForm = ({ editingTask, onClose, date }: UseTaskFormProps) => {
    const [description, setDescription] = useState('');
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    useEffect(() => {
        if (editingTask) {
            setDescription(editingTask.title);
            setSelectedLabels(editingTask.labels || []);

            return;
        }

        setDescription('');
        setSelectedLabels([]);
    }, [editingTask]);

    const handleSave = () => {
        const taskData = {
            id: editingTask ? editingTask.id : uuidv4(),
            title: description,
            date: editingTask ? editingTask.date : new Date(date.setHours(0, 0, 0, 0)),
            labels: selectedLabels,
        };

        if (editingTask) {
            taskStore.updateTask(taskData);
        } else {
            taskStore.addTask(taskData);
        }

        onClose();
    };

    const toggleLabel = (color: string) => {
        setSelectedLabels((labels) =>
            labels.includes(color) ? labels.filter((label) => label !== color) : [...labels, color]
        );
    };

    return { description, setDescription, selectedLabels, toggleLabel, handleSave };
};