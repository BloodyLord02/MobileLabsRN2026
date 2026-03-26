import React, { useContext } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-start; 
    padding-top: 60px;           
    background-color: ${props => props.isDark ? 'black' : 'white'};
`;

const Label = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  color: ${props => props.isDark ? 'white' : 'black'};
`;

export default function SettingsScreen() {
    const { isDark, setIsDark } = useContext(GameContext);

    return (
        <Container isDark={isDark}>
            <Label isDark={isDark}>Темна тема</Label>
            <Switch value={isDark} onValueChange={val => setIsDark(val)} />
        </Container>
    );
}