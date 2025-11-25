import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { Href, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { firebaseAuth } from '@/lib/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '@/context/AuthProvider';
import sql from '@/lib/neon';

const SignUp = () => {
    const { setUsername } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onGoogleButtonPress = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.data?.idToken;
            if (!idToken) throw new Error('No ID token found');
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await firebaseAuth.signInWithCredential(googleCredential);

            if (userCredential.user) {
                await checkAndCreateUser(userCredential.user);
                router.replace('/Home');
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert('Google Sign-In Error', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const checkAndCreateUser = async (user: any) => {
        try {
            const users = await sql`SELECT username FROM "User" WHERE id = ${user.uid}`;
            if (users.length === 0) {
                await sql`INSERT INTO "User" (id, email, username, role) VALUES (${user.uid}, ${user.email}, ${user.displayName || form.name || 'User'}, 'Student')`;
                setUsername && setUsername(user.displayName || form.name || 'User');
                router.push('/(onboarding)/School' as Href);
            } else {
                setUsername && setUsername(users[0].username);
                router.replace('/Home');
            }
        } catch (error) {
            console.error("Error syncing user to DB:", error);
        }
    }

    const onSignUpWithFirebase = async () => {
        if (form.password !== form.confirmPassword && form.confirmPassword !== undefined) {
            // Note: confirmPassword field might not be in the UI but good to have check if added
        }

        try {
            setIsLoading(true)
            const userCredential = await firebaseAuth.createUserWithEmailAndPassword(form.email, form.password);

            if (userCredential.user) {
                // Update profile with name
                await userCredential.user.updateProfile({
                    displayName: form.name
                });

                await checkAndCreateUser(userCredential.user);
            }
        } catch (error: any) {
            console.log(error)
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className='bg-white h-full w-full'>
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
                <View className='flex items-center mx-4 space-y-4 mt-0'>
                    <Animated.View
                        className='flex items-center w-full'
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                    >
                        <TouchableOpacity
                            className='bg-white shadow-md w-full shadow-zinc-300 rounded-full py-2 mt-5'
                            onPress={onGoogleButtonPress}
                        >
                            <View className='flex flex-row items-center justify-center'>
                                <Image
                                    source={require('@/assets/images/google.png')}
                                    className='w-8 h-8'
                                    resizeMode='contain'
                                />
                                {isLoading ? (
                                    <ActivityIndicator size='large' color='white' />
                                ) : (
                                    <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue With Google</Text>
                                )}
                            </View>

                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-2 rounded-full w-full'
                    >
                        <AntDesign name="user" size={20} color="gray" />
                        <TextInput
                            value={form.name}
                            onChangeText={newName => setForm({ ...form, name: newName })}
                            placeholder='Username'
                            placeholderTextColor='gray'
                        />
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-2 rounded-full w-full'
                    >
                        <AntDesign name="mail" size={20} color="gray" />
                        <TextInput
                            value={form.email}
                            onChangeText={newEmail => setForm({ ...form, email: newEmail })}
                            placeholder='Email'
                            placeholderTextColor='gray'
                        />
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(600).duration(1000).springify()}
                        className='flex-row items-center border border-slate-300 gap-x-2 bg-black/5 p-2 rounded-full w-full'
                    >
                        <AntDesign name="unlock" size={20} color="gray" />
                        <TextInput
                            value={form.password}
                            onChangeText={newPassword => setForm({ ...form, password: newPassword })}
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
                            className='w-full bg-sky-400 p-3 rounded-full mb-3'
                            onPress={onSignUpWithFirebase}
                        >
                            {isLoading ? (
                                <ActivityIndicator size='large' color='white' />
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