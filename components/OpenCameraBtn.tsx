import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import * as ExpoMediaLibrary from 'expo-media-library'
import React, { useCallback, useState } from 'react'
import { Href, router } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'


const OpenCameraBtn = () => {
    const {activeSubject} = useOnboarding();
    const [cameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined")

    const [mediaLibraryPermission, requestMediaLibraryPermission] = 
    ExpoMediaLibrary.usePermissions()

    const handlePermissions = useCallback(async () => {
        console.log("Run handlePermissions")
        try {
            if(cameraPermissionStatus === "not-determined" || !mediaLibraryPermission?.granted) {
                const permissions = await Camera.requestCameraPermission()
                setCameraPermissionStatus(permissions)

                await requestMediaLibraryPermission();
            } else {
                router.push(`/(dashboard)/subject/${activeSubject?.subjectId}/Camera` as Href)
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to request camera permissions')
        }
    }, [])

    return (
        <TouchableOpacity
            onPress={handlePermissions} 
            className='flex flex-row items-center pl-2'
        >
            <Feather name="camera" size={20} color="gray" />
            <Text className='text-xs ml-1 text-gray-600'>Take Photo</Text>
        </TouchableOpacity>
    )
}

export default OpenCameraBtn