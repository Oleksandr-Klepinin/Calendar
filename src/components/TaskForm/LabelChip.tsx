import React from 'react';
import { Chip } from '@mui/material';

interface LabelChipProps {
    color: string;
    isSelected: boolean;
    toggleLabel: (color: string) => void;
}

export const LabelChip: React.FC<LabelChipProps> = ({ color, isSelected, toggleLabel }) => (
    <Chip
        label=""
        clickable
        size="medium"
        style={{
            backgroundColor: color,
            width: '24px',
            height: '24px',
            border: isSelected ? '2px solid black' : 'none',
        }}
        onClick={() => toggleLabel(color)}
    />
);