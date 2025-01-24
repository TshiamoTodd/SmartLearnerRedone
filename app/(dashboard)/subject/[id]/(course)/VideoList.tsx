import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import { useOnboarding } from '@/context/OnboardingProvider'
import { getSubjectVideosBySubjectId } from '@/utils'
import CustomCard from '@/components/CustomCard'
import { router } from 'expo-router'

const VideoList = () => {
    const {activeSubject} = useOnboarding()
    const [subjectVideos, setSubjectVideos] = React.useState<{title:string, description:string, video_url:string}[]>()
    const [isEmpty, setIsEmpty] = React.useState(false)

    useEffect(() => {
        const fetchSubjectVideos = async () => {
            try {
                const response = await getSubjectVideosBySubjectId(activeSubject?.subjectId as string)
                
                if(response.length > 0) {
                    setSubjectVideos(response)
                } else {
                    setIsEmpty(true)
                    
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Error', 'Failed to fetch subject videos')
            }
        }
        fetchSubjectVideos()
    }, [])



    return (
        <View className='flex-1 h-full w-full bg-slate-300'>
            <CustomHeader  
                    title={activeSubject?.subjectName as string}
                    subtitle='Select a video to watch'
                    showBackButton={true}
                    headerStyles='pr-3'
            />
            <View className=' flex flex-row items-center justify-between w-full h-[100px] p-5'>
                <TextInput
                    placeholder='Search for a video'
                    className='w-full p-3 rounded-full border border-[#ffffff] bg-white/5'
                />
            </View>
            <View className='flex-1 items-center w-full'>
                {!isEmpty ? (
                    <FlatList
                    className='w-full p-3 h-full'
                    data={subjectVideos}
                    renderItem={({item}) => (
                        <CustomCard
                            label={item.title}
                            subTitle={item.description}
                            customStyles='w-full'
                        />
                    )}
                />) : (
                    <View className='flex-1 justify-center items-center p-5'>
                        <Image
                            source={require('@/assets/images/fail_image.png')}
                            style={{height: "50%",aspectRatio: 1, resizeMode: "contain"}}
                        />
                        <Text className='text-lg mt-2 text-gray-700 text-center px-5 font-light mb-3'>
                            Ohh No!, There are no videos available for this subject, Try again later.
                        </Text>
                        <TouchableOpacity 
                            style={{backgroundColor: '#5470FD'}}
                            className='p-4 mt-4 rounded-full w-full'
                            onPress={() => router.back()}
                        >
                            <Text className='text-white text-center text-md font-medium'>
                                Try Again
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default VideoList