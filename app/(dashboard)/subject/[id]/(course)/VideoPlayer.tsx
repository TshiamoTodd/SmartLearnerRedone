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
            <YouTubePlayer
                height={300}
                width={400}
                videoId={videoId}
                play={true}
            />
            <View className=''>
                <Text className='font-bold text-lg'>{videoTitle}</Text>
                <Text>{videoDescription}</Text>
            </View>
        </View>
    )
}

export default VideoPlayer