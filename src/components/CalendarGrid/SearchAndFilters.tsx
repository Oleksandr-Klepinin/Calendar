import React from 'react';
import { Button, Chip, TextField } from '@mui/material';
import { filtersStore } from "../../stores/FiltersStore.ts";
import { observer } from "mobx-react-lite";

interface SearchAndFiltersProps {
    colors: string[];
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = observer(({
    colors,
}) => {
    const selectedFilterLabels = filtersStore.getFilterLabels();

    return (
        <div>
            <TextField
                label="Search Tasks"
                variant="outlined"
                size="small"
                value={filtersStore.getText()}
                onChange={(e) => filtersStore.setText(e.target.value)}
                style={{ margin: '0 5px' }}
            />
            <div>
                {colors.map((color) => (
                    <Chip
                        key={color}
                        label=""
                        clickable
                        size="small"
                        style={{
                            backgroundColor: color,
                            width: '24px',
                            height: '24px',
                            margin: '3px',
                            border: selectedFilterLabels.includes(color) ? '2px solid black' : 'none',
                        }}
                        onClick={() => filtersStore.toggleFilterLabel(color)}
                    />
                ))}
                <Button
                    onClick={() => filtersStore.clearFilters()}
                    style={{ margin: '5px' }}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
})