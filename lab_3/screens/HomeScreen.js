import React, { useContext } from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';
import {
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    Directions,
    PinchGestureHandler,
} from 'react-native-gesture-handler';

import { GameContext } from '../context/GameContext';

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.isDark ? '#121212' : '#f2f2f2'};
    align-items: center;
    padding-top: 50px;
`;

const ScoreCard = styled.View`
    width: 80%;
    background-color: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
    border-radius: 15px;
    padding: 20px;
    align-items: center;
    margin-bottom: 30px;
    elevation: 5;
`;

const ScoreLabel = styled.Text`
    color: gray;
    font-size: 14px;
`;

const ScoreText = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: #3aa0ff;
`;

const ClickWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const CatImage = styled.Image`
  width: 150px;
  height: 150px;
`;
const BottomCard = styled.View`
  position: absolute;
  bottom: 20px;
  width: 90%;
  background-color: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
  border-radius: 15px;
  padding: 15px;
  elevation: 5;
`;

const InfoCard = styled.View`
  width: 90%;
  background-color: ${props => props.isDark ? '#1e1e1e' : '#ffffff'};
  border-radius: 15px;
  padding: 15px;
  margin-top: 30px;
  elevation: 5;
`;

const InfoText = styled.Text`
  color: ${props => props.isDark ? 'white' : 'black'};
  margin-bottom: 5px;
`;

export default function HomeScreen({ navigation }) {
    const { score, setScore, stats, setStats, isDark } = useContext(GameContext);

    const addScore = (val) => setScore(score + val);

    const handleTap = () => {
        addScore(1);
        setStats({ ...stats, taps: stats.taps + 1 });
    };

    const handleDoubleTap = () => {
        addScore(2);
        setStats({ ...stats, doubleTaps: stats.doubleTaps + 1 });
    };

    const handleLongPress = () => {
        addScore(5);
        setStats({ ...stats, longPress: true });
    };

    const handleSwipeRight = () => {
        addScore(Math.random() * 10);
        setStats({ ...stats, swipeRight: true });
    };

    const handleSwipeLeft = () => {
        addScore(Math.random() * 10);
        setStats({ ...stats, swipeLeft: true });
    };

    const handleMove = () => {
        setStats({ ...stats, moved: true });
    };

    const handlePinch = () => {
        addScore(3);
        setStats({ ...stats, scaled: true });
    };

    return (
        <Container isDark={isDark}>

            {/* SCORE */}
            <ScoreCard isDark={isDark}>
                <ScoreLabel>SCORE</ScoreLabel>
                <ScoreText>{Math.floor(score)}</ScoreText>
            </ScoreCard>

            {/* CAT CLICK */}
            <FlingGestureHandler direction={Directions.RIGHT} onActivated={handleSwipeRight}>
                <FlingGestureHandler direction={Directions.LEFT} onActivated={handleSwipeLeft}>
                    <PanGestureHandler onActivated={handleMove}>
                        <PinchGestureHandler onGestureEvent={handlePinch}>
                            <LongPressGestureHandler onActivated={handleLongPress}>
                                <TapGestureHandler numberOfTaps={2} onActivated={handleDoubleTap}>
                                    <TapGestureHandler onActivated={handleTap}>

                                        <ClickWrapper>
                                            <CatImage source={require('../assets/cat.png')} />
                                        </ClickWrapper>

                                    </TapGestureHandler>
                                </TapGestureHandler>
                            </LongPressGestureHandler>
                        </PinchGestureHandler>
                    </PanGestureHandler>
                </FlingGestureHandler>
            </FlingGestureHandler>
            <InfoCard isDark={isDark}>
                <InfoText isDark={isDark}> Натискання: +1 очко</InfoText>
                <InfoText isDark={isDark}> Подвійний клік: +2 очки</InfoText>
                <InfoText isDark={isDark}> Утримання: +5 очок</InfoText>
                <InfoText isDark={isDark}> Свайп: +1–10 випадкових очок</InfoText>
                <InfoText isDark={isDark}> Масштабування: +3 очки</InfoText>
            </InfoCard>
            <BottomCard isDark={isDark}>
                <InfoText
                    isDark={isDark}
                    onPress={() => navigation.navigate('Завдання')}
                >
                    Завдання
                </InfoText>

                <InfoText
                    isDark={isDark}
                    onPress={() => navigation.navigate('Налаштування')}
                >
                    Налаштування
                </InfoText>
            </BottomCard>

        </Container>
    );
}