import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomeHeader'

const Homework = () => {
  return (
    <View className='flex h-full w-full justify-between'>
      <View className='flex w-full'>
        <CustomHeader  
            title='Homework'
            subtitle="Start a covresation with your AI teacher"
            showBackButton={true}
            headerStyles='pr-3'
        />
    </View>
    </View>
  )
}

export default Homework