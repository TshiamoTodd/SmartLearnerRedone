import { View, Text, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useAuthContext } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';

const GradeCheck = () => {
    const {user} = useAuthContext()
    const {id} = useLocalSearchParams<{id:string}>();
    const [isLoading, setIsLoading] = useState(true)

    const userId = user?.id

    useEffect(() => {
        const checkGrade = async () => {
            try {
                setIsLoading(true)
                const {data, error} = await supabase.from('onboarding').select('grade').eq('user_id', userId)
                if(error) {
                    setIsLoading(false)
                    Alert.alert('Error', 'No grade found')
                }

                if(data) {
                    setIsLoading(false)
                    const grade = data[0].grade
                    Alert.alert('Grade', `Your grade is ${grade}`)
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to check grade')
            }
        }
        checkGrade()
    }, []);

    if(isLoading) {
        return (
            <View className='flex-1 items-center justify-center h-full'>
                <ActivityIndicator size='large' color='purple' />
            </View>
        )
    }

    return (
        <View className='flex-1 p-3'>
            <View className='flex w-full justify-between items-center'>
                <TextInput
                    placeholder='Enter your grade'
                    keyboardType='numeric'
                    className='border-2 border-gray-300 rounded-md p-2 w-full'
                />

                <TouchableOpacity>
                    <View className='bg-purple-600 p-2 rounded-md items-center justify-center'>
                        <Text className='text-white'>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GradeCheck