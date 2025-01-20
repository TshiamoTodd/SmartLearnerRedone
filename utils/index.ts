import { supabase } from "@/lib/supabase";

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