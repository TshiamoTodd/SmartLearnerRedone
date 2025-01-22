import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import ChatInputSection from '@/components/ChatInputSection'
import { useMessageContext } from '@/context/MessageProvider'

const Homework = () => {
    const {messages} = useMessageContext()
    const [isChatActive, setIsChatActive] = useState(false)

    useEffect(() => {

    }, [messages, isChatActive])
    console.log(isChatActive)

  return (
        <View className='flex h-full w-full justify-between bg-slate-300'>
            <View className='flex w-full'>
                <CustomHeader  
                    title='Homework'
                    subtitle="Start a covresation with your AI teacher"
                    showBackButton={true}
                    headerStyles='pr-3'
                />
            </View>

            <View className='flex-1 items-center justify-center'>
                {isChatActive ? (
                    <View>
                        <Text className='text-lg'>Start a conversation with your AI teacher</Text>
                    </View>
                ): (
                        <Image
                            source={require('@/assets/images/splash_image.png')}
                            className='w-3/4 h-3/4'
                            resizeMode="contain"
                        />
                )}
            </View>

            <ChatInputSection 
                setIsChatActive={setIsChatActive}
            />
        </View>
  )
}

export default Homework