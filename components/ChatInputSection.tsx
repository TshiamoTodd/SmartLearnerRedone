import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

import UploadFileBtn from './UploadFileBtn';
import { useFileContext } from '@/context/FileProvider';
import OpenCameraBtn from './OpenCameraBtn';

const ChatInputSection = ({setIsChatActive} : {setIsChatActive: React.Dispatch<boolean>}) => {
    const {ocrFileContents} = useFileContext()

    const [height, setHeight] = useState(35);
    const [margin, setMargin] = useState(0);
    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [inputTextValue, setInputTextValue] = useState(ocrFileContents || "")

    const displayChat = () => {
        console.log("Chat Displayed")
        setIsChatActive(false)
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust based on header height
                className='flex'
            >
                <View className='flex w-full p-3 m-0 items-center justify-between min-h-[120px]'>
                    <View className={`bg-[#afbcff] flex w-full flex-1 p-1 rounded-lg overflow-hidden`}>
                        <View className='bg-[#afbcff] flex-[0.6]'>
                            <TextInput
                                value={inputTextValue!}
                                onChangeText={(text) => setInputTextValue(text)}
                                multiline
                                className='w-full flex-1 p-2 bg-[#bbc6ff]'
                                onContentSizeChange={(event) => {
                                    const newHeight = Math.max(35, event.nativeEvent.contentSize.height);
                                    setHeight(newHeight);
                                    setMargin(Math.max(0, 120 - margin));
                                
                                }}
                                style={{ height: height, backgroundColor: '#bbc6ff' }}
                                placeholder='Type a message...'
                            />
                        </View>
                        <View className='bg-[#afbcff] flex-[0.4] flex-row items-center justify-between'>
                            {isKeyboardActive ? (
                                <TouchableOpacity 
                                    onPress={() => setIsKeyboardActive(false)} 
                                    className='pl-2'
                                >
                                    <AntDesign name="plus" size={20} color="grey" />
                                </TouchableOpacity>
                            ) : (
                                <View className='flex flex-row items-center'>
                                    <UploadFileBtn />

                                    <OpenCameraBtn />
                                </View>
                            )}

                        <TouchableOpacity
                            className='pr-1'
                            onPress={() => displayChat()}
                        >
                            <AntDesign name="arrowright" size={20} color="gray" />
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

        </KeyboardAvoidingView>
    )
}

export default ChatInputSection