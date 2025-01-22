import { View, Text, TextInput, Image, StatusBar, TouchableOpacity, Alert, ActivityIndicator, AppState } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { Href, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/context/AuthProvider';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })

const SignIn = () => {
    const {setUsername} = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const signInWithSupabase = async () => {
        try {
            setIsLoading(true)
            const {data, error} = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password
            })

            if(data.session){
                const formattedEmail:string = form.email.toLowerCase().trim().toString()
                console.log(formattedEmail)
                const {data: userData, error: userError} = await supabase
                .from('User')
                .select('username')
                .eq('email', formattedEmail)
                .single()

                console.log(userData)
                if(userError) {
                    console.log(userError)
                }
                setUsername!(userData?.username)
            }

            if (error) {
                Alert.alert('Error', error.message)
                return
            } else {
                setIsLoading(false)
                router.push('/(dashboard)/(home)/Home' as Href)
            }

        } catch (error) {
            Alert.alert('Error', error as string)
            console.log(error)
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
        <View className='h-full w-full flex justify-around pt-40 pb-10'>
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
                    Login to your account
                </Animated.Text>
            </View>
            {/* Form */}
            <View className='flex items-center mx-4 space-y-4'>
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()}
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="mail" size={20} color="gray" />
                    <TextInput
                        value={form.email}
                        onChangeText={newEmail => setForm({...form, email: newEmail})}
                        placeholder='Email'
                        placeholderTextColor='gray'
                        className='text-md'
                    />
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-5 rounded-full w-full'
                >
                    <AntDesign name="unlock" size={20} color="gray" />
                    <TextInput
                        onChangeText={newPassword => setForm({...form, password: newPassword})}
                        value={form.password}
                        placeholder='Password'
                        placeholderTextColor='gray'
                        secureTextEntry={true}

                    />
                </Animated.View>

                <Animated.View 
                    className='w-full'
                    entering={FadeInDown.delay(400).duration(1000).springify()}
                >
                    <TouchableOpacity
                        className='w-full items-center justify-center bg-sky-400 p-3 rounded-full mb-3'
                        onPress={signInWithSupabase}
                    >
                        {isLoading ? (
                            <ActivityIndicator size='large' color='white' />
                        ): (
                            <Text className='text-xl font-bold text-white text-center'>Login</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    className='flex-row justify-center'
                    entering={FadeInDown.delay(600).duration(1000).springify()}
                >
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/(auth)/SignUp' as Href)
                        }}
                    >
                        <Text className='text-sky-600'>Sign Up</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
        </View>
    )
}

export default SignIn

function lowercase(email: string) {
    throw new Error('Function not implemented.');
}
