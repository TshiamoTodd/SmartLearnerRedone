import React from 'react'
import { Stack } from 'expo-router'
import { MessageProvider } from '@/context/MessageProvider'
import { FileProvider } from '@/context/FileProvider'

const HomeworkRootLayout = () => {
  return (
    <FileProvider>
      <MessageProvider>
        <Stack>
            <Stack.Screen name="Homework" options={{ headerShown: false }} />
            <Stack.Screen name="OCRConfirm" options={{ headerShown: false }} />
            {/* <Stack.Screen name="Camera" options={{ headerShown: false }} /> */}
        </Stack>
      </MessageProvider>
    </FileProvider>
  )
}

export default HomeworkRootLayout