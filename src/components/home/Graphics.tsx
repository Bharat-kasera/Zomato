import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { homeStyles } from '@unistyles/homeStyles'
import LottieView from 'lottie-react-native'

const Graphics = () => {

    const { styles } = useStyles(homeStyles)

    return (
        <View style={styles.lottieContainer} pointerEvents='none'>
            <LottieView
                style={styles.lottie}
                source={require('@assets/animations/event.json')}
                autoPlay
                loop={Platform.OS !== 'android'}
                hardwareAccelerationAndroid
            />
        </View>
    )
}

export default Graphics