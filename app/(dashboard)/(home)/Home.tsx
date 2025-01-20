import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomeHeader'
import CustomCard from '@/components/CustomCard'

const data = [
  {
    id: 1,
    title: 'Title 1',
    subTitle: 'Subtitle 1',
    image: require('@/assets/images/bg-1.webp')
  },
  {
    id: 2,
    title: 'Title 2',
    subTitle: 'Subtitle 2',
    image: require('@/assets/images/bg-1.webp')
  },
  {
    id: 3,
    title: 'Title 3',
    subTitle: 'Subtitle 3',
    image: require('@/assets/images/bg-1.webp')
  },
  {
    id: 4,
    title: 'Title 4',
    subTitle: 'Subtitle 4',
    image: require('@/assets/images/bg-1.webp')
  },
  {
    id: 5,
    title: 'Title 4',
    subTitle: 'Subtitle 4',
    image: require('@/assets/images/bg-1.webp')
  }
]

const Home = () => {
  const name = 'John Doe'
  return (
    <View className='p-0 bg-slate-200 w-full h-full'>
      <CustomHeader 
        title='Dashboard' 
        subtitle={`Welcome back, ${name}`}
        showBackButton={false} 
      />
      <View className='flex flex-col p-4 mb-5 h-full'>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CustomCard 
              label={item.title}
              subTitle={item.subTitle}
              headerImage={item.image}
              onPressAction={() => {}}
            />
          )}
        />
      </View>
      <View className='h-[12%]'>

      </View>

    </View>
  )
}

export default Home