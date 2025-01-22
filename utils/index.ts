import { supabase } from "@/lib/supabase";
import * as FileSystem from 'expo-file-system';

export const getSubjectsByGradeAndSchool = async (grade: string, school: string) => {
    try {
        const {data, error} = await supabase.from('Subject')
        .select('subject_name, subject_id')
        .eq('grade_range', grade)
        .eq('school_level', school);

        if (error) {
            console.error(error)
            throw error;
        }

        return data;
    } catch (error) {
        console.log("Error fetching subjects:", error);
        throw new Error("Failed to fetch subjects. Please try again later.");
    }
};

export const analyzeImage = async (imageUri: string) => {
    try {
        if(!imageUri) {
            return JSON.stringify({error: "No image provided"});
        }

        const fileContent = await FileSystem.readAsStringAsync(imageUri, { 
            encoding: FileSystem.EncodingType.Base64 
        });

        const apiKey = process.env.EXPO_PUBLIC_CLOUD_VISION_API_KEY;
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestData = {
            requests: [
                {
                    image: {
                        content: fileContent
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION',
                            maxResults: 5
                        }
                    ]
                }
            ]
        }

        const apiResponse = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(requestData)
        })

        const data = await apiResponse.json();
        return data;

    } catch (error) {
        console.error('Error analyzing image: ',error);
        return JSON.stringify({error: "Error analyzing image"});
    }
}