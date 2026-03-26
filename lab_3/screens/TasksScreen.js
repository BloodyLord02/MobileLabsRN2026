import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';

const Container = styled.ScrollView`
    flex: 1;
    padding: 20px;
    background-color: ${props => props.isDark ? '#121212' : '#f2f2f2'};
`;

const TaskCard = styled.View`
    background-color: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    elevation: 3;
`;

const TaskTitle = styled.Text`
    font-size: 16px;
`;

const Status = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export default function TasksScreen() {
    const { stats, score, isDark } = useContext(GameContext);

    const tasks = [
        { title: "10 кліків", done: stats.taps >= 10 },
        { title: "5 подвійних кліків", done: stats.doubleTaps >= 5 },
        { title: "Утримання 3 сек", done: stats.longPress },
        { title: "Перетягування", done: stats.moved },
        { title: "Свайп вправо", done: stats.swipeRight },
        { title: "Свайп вліво", done: stats.swipeLeft },
        { title: "Масштабування", done: stats.scaled },
        { title: "100 очок", done: score >= 100 },
        { title: "Моє: 50 очок", done: score >= 50 },
    ];

    return (
        <Container isDark={isDark}>
            {tasks.map((task, i) => (
                <TaskCard key={i} isDark={isDark}>
                    <TaskTitle style={{ color: isDark ? 'white' : 'black' }}>
                        {task.title}
                    </TaskTitle>
                    <Status style={{ color: task.done ? '#4CAF50' : '#888' }}>
                        {task.done ? "+" : "-"}
                    </Status>
                </TaskCard>
            ))}
        </Container>
    );
}