import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import YouTubePlayer from 'react-native-youtube-iframe'
import CustomHeader from '@/components/CustomeHeader'
import { useOnboarding } from '@/context/OnboardingProvider'

const VideoPlayer = () => {
    const {activeSubject} = useOnboarding()
    const {videoId, videoTitle, videoDescription} = useLocalSearchParams<{videoId:string, videoTitle:string, videoDescription:string}>()
    console.log(videoId, videoTitle, videoDescription)
    return (
        <View className='flex items-center'>
            <CustomHeader  
                    title={activeSubject?.subjectName as string}
                    subtitle={videoTitle}
                    showBackButton={true}
                    headerStyles='pr-3'
            />
            <View className='flex items-center'>
                <View className='w-full'>
                    <YouTubePlayer
                        height={230}
                        width={400}
                        videoId={videoId}
                        play={false}
                    />
                </View>
                <View style={{width: '100%'}}>
                    <View className='bg-white w-full shadow-md rounded-lg p-4'>
                        <Text className='font-bold text-lg text-gray-900 dark:text-white'>{videoTitle}</Text>
                        <Text className='text-gray-700 dark:text-gray-300 mt-2'>{videoDescription}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VideoPlayer