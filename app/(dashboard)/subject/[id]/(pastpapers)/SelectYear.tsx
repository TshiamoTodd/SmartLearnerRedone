import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const SelectYear = () => {
    const {grade, subject} = useLocalSearchParams()
    console.log({grade, subject})

    return (
        <View>
        <Text>SelectYear</Text>
        </View>
    )
}

export default SelectYear