import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react-lite';
import { useTaskForm } from './useTaskForm.ts';
import { LabelChip } from './LabelChip.tsx';
import { taskStore } from '../../stores/TaskStore.ts';
import { Task } from '../../models/TaskModel.ts';
import { LabelsContainer } from "../CalendarGrid/CalendarStyles.ts";

const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];

export const TaskForm = observer(({ open, onClose, date, editingTask }: { open: boolean; onClose: () => void; date: Date; editingTask?: Task }) => {
    const { description, setDescription, selectedLabels, toggleLabel, handleSave } = useTaskForm({ editingTask, onClose, date });

    const handleDelete = () => {
        if (editingTask) {
            taskStore.removeTask(editingTask.id);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogContent>
                <LabelsContainer>
                    {colors.map((color) => (
                        <LabelChip key={color} color={color} isSelected={selectedLabels.includes(color)} toggleLabel={toggleLabel} />
                    ))}
                </LabelsContainer>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {editingTask && (
                    <Button
                        onClick={handleDelete}
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                )}
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
});