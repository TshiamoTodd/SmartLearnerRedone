import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const RecoverPassword = async () => {
    setLoading(true);
  
    try {

      const { data, error: userError } = await supabase
      .from("User")
      .select("email")
      .eq("email", email)
      .single();

    if ( userError ) Alert.alert("Error", (userError as Error).message || "Something went wrong.");

    if (!data) {
      Alert.alert("Error", "Email not found.");
      setLoading(false);
      return;
    }
      // Define the redirect URL 
      const redirectUrl = "com.machabakaizer.smart_learner://updatepassword";

      // Send password reset link to the user's email with redirect URL
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (resetError) {
        throw resetError;
      }

      Alert.alert("Success", "A password reset link has been sent to your email. Please check your inbox.");
  
    } catch (error) {
      Alert.alert("Error", (error as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between py-3 pb-10">
      <View className="w-[300px] items-center mt-5">
        <Text className="text-black font-semibold text-lg">Recover your password</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          textContentType="emailAddress"
          className="border border-gray-300 w-full h-12 px-3 rounded-lg mt-3"
        />
      </View>

      <View className="flex w-full items-center justify-center mt-4 pb-10">
        <TouchableOpacity
          className="w-[85%] h-12 bg-black items-center justify-center rounded-lg"
          onPress={RecoverPassword}
          disabled={loading}
        >
          <Text className="text-white font-semibold">{loading ? "Loading..." : "Submit"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;