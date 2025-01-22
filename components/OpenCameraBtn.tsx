import { View, Text, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import React from 'react'

const OpenCameraBtn = () => {

    return (
        <TouchableOpacity className='flex flex-row items-center pl-2'>
            <Feather name="camera" size={20} color="gray" />
            <Text className='text-xs ml-1 text-gray-600'>Take Photo</Text>
        </TouchableOpacity>
    )
}

export default OpenCameraBtn