import React from 'react';
import { DayCellContainer, DayNumber, TasksCount, TasksContainer } from './CalendarStyles';
import { Task } from "../../models/TaskModel.ts";
import { TaskCardComponent } from './TaskCardComponent';
import { filtersStore } from "../../stores/FiltersStore.ts";
import { observer } from "mobx-react-lite";
import { handleDrop } from "./utils.ts";

type DayCellProps = {
    day: number;
    currentDate: Date;
    setSelectedDate: (date: Date) => void;
    tasks: Task[];
    holidayInfo?: { date: string; name: string };
    handleEditTask: (task: Task, e: React.MouseEvent) => void;
};

export const DayCell: React.FC<DayCellProps> = observer(({
    day,
    currentDate,
    setSelectedDate,
    tasks,
    holidayInfo,
    handleEditTask
}) => {
    const selectedFilterLabels = filtersStore.getFilterLabels();

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const getTasksByFilters = (task: Task) => task.title.toLowerCase().includes(filtersStore.getText().toLowerCase()) &&
        (selectedFilterLabels.length === 0 || task.labels?.some(label => selectedFilterLabels.includes(label)));

    const filteredTasks = tasks.filter(getTasksByFilters);

    const dayDate = new Date(year, month, day);

    return (
        <DayCellContainer
            isCurrentMonth={true}
            onClick={() => setSelectedDate(dayDate)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, dayDate)}
        >
            <DayNumber isCurrentMonth={true}>{day}</DayNumber>
            {filteredTasks.length > 0 && (
                <TasksCount>{filteredTasks.length} {' '}card(s)</TasksCount>
            )}
            {holidayInfo && <div style={{ fontSize: '0.75rem', color: '#FF0000', marginLeft : '13px' }}>{holidayInfo.name}</div>}
            <TasksContainer>
                {filteredTasks.map(task =>
                    <TaskCardComponent key={task.id} task={task} handleEditTask={handleEditTask} />
                )}
            </TasksContainer>
        </DayCellContainer>
    );
})