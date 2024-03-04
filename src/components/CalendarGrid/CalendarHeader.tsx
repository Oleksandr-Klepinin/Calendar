import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { MonthAndYear } from './CalendarStyles';

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrevMonth, onNextMonth }) => {
    return (
        <div>
            <MonthAndYear>
                <IconButton onClick={onPrevMonth}>
                    <ArrowBack />
                </IconButton>
                <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
                <IconButton onClick={onNextMonth}>
                    <ArrowForward />
                </IconButton>
            </MonthAndYear>
        </div>
    );
};