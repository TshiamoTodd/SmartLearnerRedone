import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import React, { useState } from 'react'
import { Href, router } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'

const schoolLevels = [
    {label: 'Primary', value: '1'},
    {label: 'Secondary', value: '2'},
]


const School = () => {
    const {setSchoolLevel} = useOnboarding()
    const [selctedSchoolLevel, setSelectedSchoolLevel] = useState('');

    const MoveToNextSection = () => {
        if (!selctedSchoolLevel) {
            Alert.alert('Error', 'Please select a school level')
            return
        }
        // TODO: Add school level to user profile
        router.push('/(onboarding)/Grade' as Href)
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
                        What is your schooling level?
                    </Text>
                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={schoolLevels}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={selctedSchoolLevel}
                            onChange={item => {
                                setSelectedSchoolLevel(item.value);
                            }}
                    />
                </View>
            </View>

            <View className='w-full gap-y-5 flex flex-col items-center'>
                <TouchableOpacity
                    className='flex items-center justify-center bg-slate-500 px-4 p-4 rounded-full mt-[-25%] w-[70%]' 
                    onPress={() => MoveToNextSection()}
                    onPressIn={() => setSchoolLevel(selctedSchoolLevel)}
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

export default School

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