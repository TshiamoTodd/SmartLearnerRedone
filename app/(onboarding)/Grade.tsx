import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useOnboarding } from '@/context/OnboardingProvider'
import { useAuthContext } from '@/context/AuthProvider'
import { Dropdown } from 'react-native-element-dropdown'
import { supabase } from '@/lib/supabase'
import { Href, router } from 'expo-router'

const primaryGradeLevels = [
  {label: 'Grade 1 - 3', value: '1'},
  {label: 'Grade 4 - 6', value: '2'},
  {label: 'Grade 7', value: '3'},
]
const secondaryGradeLevels = [
  {label: 'Grade 8 - 9', value: '4'},
  {label: 'Grade 10 - 12', value: '5'},
]


const Grade = () => {
  const {user} = useAuthContext()
  const {schoolLevel, gradeRange, setGradeRange} = useOnboarding()

  const [gradeRangeValue, setGradeRangeValue] = useState('');

  const MoveToNextSection = async () => {
    if (!gradeRangeValue) {
        Alert.alert('Error', 'Please select a grade level')
        return
    }

    const {data, error} = await supabase.from('Onboarding').insert([{
      user_id: user?.id,
      school_level: schoolLevel,
      grade_range: gradeRange
    }])

    if (error) {
      console.log(error)
      Alert.alert('Error', error.message)
    }

    router.push('/(dashboard)/Home' as Href)
  }

  return (
    <View className='flex h-full items-center justify-between py-3 pb-10 bg-slate-300'>
      <View className='flex pl-3 items-start gap-y-3 w-full'>
          <Text 
              className='text-start p-3 pl-5 text-gray-500 font-thin text-3xl'
          >
              Smart Learning
          </Text>
          <View className='w-full pl-3 flex gap-3'>
              <Text className='pl-1 text-gray-700 font-semibold text-sm'>
                What is your Grade range?
              </Text>
              <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={schoolLevel === '1' ? primaryGradeLevels : secondaryGradeLevels}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      searchPlaceholder="Search..."
                      value={gradeRangeValue}
                      onChange={item => {
                          setGradeRangeValue(item.value);
                      }}
              />
          </View>
      </View>

      <View className='w-full gap-y-5 flex flex-col items-center'>
          <TouchableOpacity
              className='flex items-center justify-center bg-slate-500 px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
              onPress={() => MoveToNextSection()}
              onPressIn={() => setGradeRange(gradeRangeValue)}
          >
              <Text
                  className='font-bold text-lg text-white'
              >
                  Next
              </Text>
              
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default Grade

const styles = StyleSheet.create({
  dropdown: {
    paddingLeft: 5,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'gray',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});