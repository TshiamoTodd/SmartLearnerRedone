import { View, Text } from 'react-native'
import React from 'react'

interface ProgressBarProps {
    progress: number
    height?: number
    outerBackgroundColor?: string
    innerBackgroundColor?: string
    padded?: boolean
}

const ProgressBar = ({
    progress, 
    height, 
    outerBackgroundColor, 
    innerBackgroundColor, 
    padded
}: ProgressBarProps) => {
  return (
    <View className={`w-full border rounded-xl items-start justify-center h-[${height}px] border-${outerBackgroundColor} ${padded ? 'p-1' : 'p-0'}`}>
      <View
        className={`rounded-xl h-[10px] bg-purple-300`}
        style={{width: `${progress * 100}%`}}
      >
        <Text></Text>
      </View>
    </View>
  )
}

export default ProgressBar