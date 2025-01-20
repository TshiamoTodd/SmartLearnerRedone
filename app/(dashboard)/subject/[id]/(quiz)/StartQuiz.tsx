import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import CustomHeader from '@/components/CustomeHeader'
import { useOnboarding } from '@/context/OnboardingProvider'

const StartQuiz = () => {
    const {activeSubject} = useOnboarding()
    const {subjectName, topic, id} = useLocalSearchParams()

    return (
        <View className='flex-1 h-full w-full bg-slate-300'>
            <CustomHeader
                title='Start Quiz'
                subtitle={subjectName as string}
                showBackButton={true}
                headerStyles='pr-3'
            />
            <Image
                source={require('@/assets/images/splash.png')}
                className='h-3/6'
                style={{aspectRatio: 1}}
            />
            <View className='w-full flex p-5'>
                <Text className='text-2xl text-center text-[#5470FD] mb-3'>Instructions</Text>
                <Text className='text-center mb-2 font-light text-md'>
                    {topic}
                </Text>
                <View style={{backgroundColor: '#5470FD'}} className=' rounded p-5 items-center justify-center'>
                    <Text className='text-white text-lg'>
                        Each Quiz Has Four Options Quiz
                    </Text>
                    <Text className='text-white text-lg'>
                        Progress will be shown at the top
                    </Text>
                    <Text className='text-white text-lg'>
                        Score will be shown at the end.
                    </Text>
                </View>

            </View>

            <View className='w-full flex items-center justify-center'>
                <Pressable
                    style={{backgroundColor: '#5470FD'}}
                    className='px-6 py-3 rounded-full w-1/2'
                    onPress={() => router.push({
                        pathname: `/subject/${id}/Questions` as RelativePathString,
                        params: {topic: topic}
                    })}
                >
                    <Text className='text-white text-center text-lg'>Start Quiz</Text>
                </Pressable>

            </View>

        </View>
    )
}

export default StartQuiz