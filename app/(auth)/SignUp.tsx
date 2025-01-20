import { View, Text, TextInput, Image, StatusBar, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { Href, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '@/lib/supabase';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onSignUpWithSupabase = async () => {
        try {
            setIsLoading(true)
            const {data, error} = await supabase.auth.signUp({
                email: form.email,
                password: form.password
            })

            if (error) {
                Alert.alert('Error', error.message)
                return
            }

            if (data) {
                const userId = data.user?.id
                const userEmail = data.user?.email

                const {data: userData, error: userError} = await supabase.from('User').insert([{
                    id: userId,
                    email: userEmail,
                    username: form.name
                }])

                if (userError) {
                    Alert.alert('Error', userError.message)
                    return
                }

                //Alert.alert('Success', 'Account created successfully')
                router.push('/(onboarding)/School' as Href)

            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error', error as string)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className='bg-white h-full w-full'>
            <StatusBar barStyle={'light-content'} />
        <Image
            className='h-full w-full absolute'
            source={require('@/assets/images/background.png')}
        />
        {/* Lights */}
        <View className='flex-row justify-around w-full absolute'>
            <Animated.Image
                entering={FadeInUp.delay(200).duration(1000).springify()}
                className='h-[225] w-[90]'
                source={require('@/assets/images/light.png')}
            />
            <Animated.Image
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className='h-[160] w-[65]'
                source={require('@/assets/images/light.png')}
            />
        </View>

        {/* Titile and form */}
        <View className='h-full w-full flex justify-around pt-48'>
            {/* Title */}
            <View className='flex items-center'>
                <Animated.Text
                    entering={FadeInUp.delay(100).duration(1000).springify()} 
                    className='text-white font-bold tracking-wider text-4xl'
                >
                    Smart Learning
                </Animated.Text>
                <Animated.Text 
                    entering={FadeInUp.delay(100).duration(1000).springify()} 
                    className='text-white text-lg font-light px-7'
                >
                    SignUp to learn Anything, Anywhere
                </Animated.Text>
            </View>
            {/* Form */}
            <View className='flex items-center mx-4 space-y-4 mt-6'>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()}
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="user" size={20} color="gray" />
                    <TextInput
                        value={form.name}
                        onChangeText={newName => setForm({...form, name: newName})}
                        placeholder='Username'
                        placeholderTextColor='gray'
                    />
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(400).duration(1000).springify()}
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="mail" size={20} color="gray" />
                    <TextInput
                        value={form.email}
                        onChangeText={newEmail => setForm({...form, email: newEmail})}
                        placeholder='Email'
                        placeholderTextColor='gray'
                    />
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="unlock" size={20} color="gray" />
                    <TextInput
                        value={form.password}
                        onChangeText={newPassword => setForm({...form, password: newPassword})}
                        placeholder='Password'
                        placeholderTextColor='gray'
                        secureTextEntry={true}

                    />
                </Animated.View>

                <Animated.View 
                    className='w-full'
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                >
                    <TouchableOpacity
                        className='w-full items-center justify-center bg-sky-400 p-3 rounded-full mb-3'
                        onPress={onSignUpWithSupabase}
                    >
                        {isLoading 
                        ? (
                            <ActivityIndicator size='small' color='white' />
                        ) : (
                            <Text className='text-xl font-bold text-white text-center'>SignUp</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    className='flex-row justify-center'
                    entering={FadeInDown.delay(1000).duration(1000).springify()}
                >
                    <Text>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/(auth)/SignIn' as Href)
                        }}
                    >
                        <Text className='text-sky-600'> Login</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
        </View>
    )
}

export default SignUp