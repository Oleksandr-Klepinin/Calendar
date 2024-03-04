import styled from '@emotion/styled';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin: 5px;
`;

export const DayCellContainer = styled.div<{ isCurrentMonth: boolean }>`
    padding: 5px;
    background-color: ${({ isCurrentMonth }) => isCurrentMonth ? '#e0e0e0' : '#f0f0f0'};
    border: 1px solid #ddd;
    height: 140px;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
`;

export const TasksCount = styled.div`
    font-size: 0.75rem;
    color: #757575;
    margin-left: 20px;
    align-self: flex-start;
`;

export const DayNumber = styled.span<{ isCurrentMonth: boolean }>`
    position: absolute;
    top: 1px;
    left: 5px;
    color: ${({ isCurrentMonth }) => isCurrentMonth ? 'black' : '#bdbdbd'};
`;

export const MonthAndYear = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

export const WeekdaysRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 10px;
`;

export const Weekday = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
    color: #757575;
`;

export const TasksContainer = styled.div`
    max-height: 130px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #bdbdbd #e4e4e4;
    border-radius: 4px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #e4e4e4;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #bdbdbd;
        border-radius: 20px;
        border: 20px solid #bdbdbd;
    }
`;

export const TaskCard = styled.div`
    padding: 5px;
    margin-top: 4px;
    background-color: #ffffff;
    border-radius: 4px;
    font-size: 0.8rem;
    word-break: break-word;
    cursor: pointer;

    &:hover {
        background-color: #bdbdbd;
    }
`;

export const TaskTitle = styled.div`
    color: #333;
`;

export const LabelBar = styled.div`
    height: 6px;
    display: flex;
    gap: 2px;
`;

export const Label = styled.div<{ color: string }>`
    flex-grow: 0;
    flex-shrink: 0;
    border-radius: 20px;
    flex-basis: 20%;
    max-width: 19%;
    background-color: ${({ color }) => color};
`;

export const LabelsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;
