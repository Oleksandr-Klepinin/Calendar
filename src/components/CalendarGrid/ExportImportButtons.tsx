import React, { useCallback, useRef } from 'react';
import { Button } from '@mui/material';
import { taskStore } from "../../stores/TaskStore.ts";
import html2canvas from "html2canvas";

export const ExportImportButtons: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleExport = useCallback(() => {
        const dataStr = taskStore.exportTasks();
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'tasks-export.json';
        const linkElement = document.createElement('a');

        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }, []);

    const handleDownloadImage = useCallback(async () => {
        const calendarElement = document.getElementById('calendarToExport');
        if (calendarElement) {
            const canvas = await html2canvas(calendarElement);
            const image = canvas.toDataURL('image/png', 1.0);
            downloadImage(image, 'calendar.png');
        }
    }, []);

    const downloadImage = (blob: string, fileName: string) => {
        const fakeLink = window.document.createElement('a');
        fakeLink.setAttribute('style', 'display:none;');
        fakeLink.download = fileName;

        fakeLink.href = blob;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);

        fakeLink.remove();
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                text && taskStore.importTasks(text.toString());
            };
            reader.readAsText(file);
        }
    };

    return (
        <div style={{ textAlign: 'right', margin: '5px' }}>
            <Button onClick={handleExport}>Export Tasks</Button>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImport}
            />
            <Button onClick={handleImportClick}>Import Tasks</Button>
            <Button onClick={handleDownloadImage}>Download as Image</Button>
        </div>
    );
};