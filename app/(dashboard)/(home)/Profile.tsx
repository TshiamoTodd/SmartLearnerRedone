import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'

const Profile = () => {
  return (
    <View className='bg-slate-200 p-10 h-full w-full'>
      <TouchableOpacity
          onPress={() => {
              supabase.auth.signOut()
          }}
      >
          <Text className='text-sky-600'>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile