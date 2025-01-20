import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { RelativePathString, router, useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthContext } from '@/context/AuthProvider'

const Score = () => {
    const {user} = useAuthContext()
    const { score, id, subjectName, topic } = useLocalSearchParams()
    const router = useRouter()
    return (
        <View className='flex-1 items-center p-6'>
        <Image
            source={require('@/assets/images/score_image.png')}
            className='h-3/6'
            style={{aspectRatio: 1}}
        />
        <Text className='text-lg mt-2 text-purple-500'>
            Congradulations!! {user?.email?.split('@')[0]} You Scored {score} ponts
        </Text>
        <Pressable 
            className='bg-purple-500 p-4 mt-4 rounded-full w-full'
            onPress={() => router.replace({
                pathname: `/subject/${id}/SelectTopic` as RelativePathString,
                params: {subjectName: subjectName, topic: topic}
            })}
        >
            <Text className='text-white text-md text-center font-bold'>
            Play Again
            </Text>
        </Pressable>
        </View>
    )
}

export default Score