import { View, Text, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Href, Redirect, router } from 'expo-router'
import { useAuthContext } from '@/context/AuthProvider';

const Index = () => {
    const { width, height } = Dimensions.get('window');
    const { isAuthenticated } = useAuthContext()

    if (isAuthenticated) {
      return <Redirect 
          href={'/(dashboard)/(home)/Home' as Href} 
      />
    }
    return (
      <View className="flex h-full items-center justify-between py-3 pb-10 bg-slate-100">
        {/* Header Section */}
        <View className="w-full px-5">
          <Text className="font-semibold text-[#5470FD] text-2xl">
            Smart Learning
          </Text>
        </View>

        {/* Image Section */}
        <View className="items-center mt-[-20]">
          <Image
            source={require('../assets/images/splash_image.png')}
            style={{
              width: width * 0.9, // 90% of screen width
              height: height * 0.4, // 40% of screen height
            }}
            resizeMode="contain"
          />
        </View>

        {/* Text Section */}
        <View className='flex items-center'>
              <Text className='text-center text-[#5470FD] text-4xl px-7 font-bold'>
              Learn Anything Anytime Anywhere
              </Text>
          
              <Text className='text-center text-lg mt-2 px-7'>
                  Learning just a click away, Online learning is education that takes place over the internet.
              </Text>
          </View>

        {/* Button Section */}
        <TouchableOpacity
          className="bg-slate-500 items-center justify-center rounded-full"
          style={{
            width: width * 0.7, // 70% of screen width
            paddingVertical: height * 0.02, // Adjust padding based on height
          }}
          onPress={() => {
            router.push('/(auth)/SignIn')
          }}
        >
          <Text className="font-bold text-white text-lg">Get Started</Text>
        </TouchableOpacity>
      </View>
    )
}

export default Index