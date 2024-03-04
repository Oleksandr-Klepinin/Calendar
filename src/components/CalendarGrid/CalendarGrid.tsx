import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { TaskForm } from '../TaskForm/TaskForm.tsx';
import { taskStore } from '../../stores/TaskStore.ts';
import { Task } from "../../models/TaskModel.ts";
import { getPublicHolidays, Holiday } from '../../services/HolidayService.ts';
import { Grid, DayCellContainer, DayNumber, WeekdaysRow, Weekday } from './CalendarStyles';
import { SearchAndFilters } from './SearchAndFilters';
import { CalendarHeader } from './CalendarHeader';
import { ExportImportButtons } from './ExportImportButtons';
import { DayCell } from './DayCellComponent.tsx';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid = observer(() => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];

    useEffect(() => {
        const fetchHolidays = async () => {
            const year = currentDate.getFullYear();
            const holidaysData = await getPublicHolidays(year);

            setHolidays(holidaysData);
        };

        fetchHolidays();
    }, [currentDate]);

    const prevMonth = useCallback(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }, [currentDate]);

    const nextMonth = useCallback(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }, [currentDate]);

    const handleEditTask = useCallback((task: Task, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingTask(task);
        setSelectedDate(task.date);
    }, []);

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const daysFromPrevMonth = firstDayOfMonth;
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    const prevMonthCells = Array.from({length: daysFromPrevMonth}, (_, i) => {
        const day = prevMonthDays - daysFromPrevMonth + i + 1;
        return (
            <DayCellContainer key={`prev-month-day-${i}`} isCurrentMonth={false}>
                <DayNumber isCurrentMonth={false}>
                    {day} {new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day).toLocaleString('default', { month: 'short' })}
                </DayNumber>
            </DayCellContainer>
        );
    });

    const currentMonthCells = Array.from({length: daysInMonth}, (_, day) => {
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1);
        const tasksForDay = taskStore.getTasksForDate(dayDate);

        const holidayInfo = holidays.find(holiday => {
            const holidayDate = new Date(holiday.date);

            return holidayDate.getDate() === dayDate.getDate() && holidayDate.getMonth() === dayDate.getMonth();
        });

        return (
            <DayCell
                key={day + 1}
                day={day + 1}
                currentDate={currentDate}
                setSelectedDate={setSelectedDate}
                tasks={tasksForDay}
                holidayInfo={holidayInfo}
                handleEditTask={handleEditTask}
            />
        );
    });

    const totalCells = prevMonthCells.length + currentMonthCells.length;
    const nextMonthDaysToShow = totalCells > 35 ? 42 - totalCells : 35 - totalCells;

    const nextMonthCells = Array.from({length: nextMonthDaysToShow}, (_, i) => {
        return (
            <DayCellContainer key={`next-month-day-${i}`} isCurrentMonth={false}>
                <DayNumber isCurrentMonth={false}>
                    {i + 1} {new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1).toLocaleString('default', { month: 'short' })}
                </DayNumber>
            </DayCellContainer>
        );
    });

    const cells = [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];

    return (
        <div>
            <ExportImportButtons/>
            <SearchAndFilters
                colors={colors}
            />
            <div id="calendarToExport">
            <CalendarHeader
                currentDate={currentDate}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
            />
            <WeekdaysRow>
                {WEEK_DAYS.map(day => (
                    <Weekday key={day}>{day}</Weekday>
                ))}
            </WeekdaysRow>
            <Grid>
                {cells}
            </Grid>
            {selectedDate && (
                <TaskForm
                    open={Boolean(selectedDate)}
                    onClose={() => {
                        setSelectedDate(null);
                        setEditingTask(undefined);
                    }}
                    date={selectedDate}
                    editingTask={editingTask}
                />
            )}
            </div>
        </div>
    );
});