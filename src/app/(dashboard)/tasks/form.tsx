import { useLoader } from "@/hooks/useLoader"
import { addTask } from "@/services/task.service"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const AddTaskScreen = () => {
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a task title")
      return
    }

    try {
      setErrorMessage("")
      showLoader()
      await addTask(title.trim(), description.trim())
      router.back()
    } catch (err: any) {
      console.error(err)
      const msg = err?.message || ""
      if (msg.includes("permissions") || msg.includes("permission-denied")) {
        setErrorMessage(
          "Firestore Permission Denied: Update Firestore Rules in Firebase Console."
        )
      } else {
        setErrorMessage(msg || "Failed to create task")
      }
    } finally {
      hideLoader()
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* Top Header */}
        <View className="px-5 pt-3 pb-4 bg-white border-b border-slate-100 flex-row items-center justify-between">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center"
          >
            <MaterialIcons name="arrow-back" size={20} color="#334155" />
          </TouchableOpacity>

          <Text className="text-lg font-black text-slate-900 tracking-tight">
            Create Task
          </Text>

          <View className="w-10" />
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm shadow-slate-100">
            {errorMessage ? (
              <View className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-4 flex-row items-center gap-x-2">
                <MaterialIcons name="error-outline" size={18} color="#e11d48" />
                <Text className="text-rose-600 text-xs font-semibold flex-1">
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* Title Input */}
            <View className="mb-4">
              <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Task Title
              </Text>
              <View className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <TextInput
                  value={title}
                  onChangeText={(val) => {
                    setTitle(val)
                    if (errorMessage) setErrorMessage("")
                  }}
                  placeholder="e.g., Complete project review"
                  placeholderTextColor="#94a3b8"
                  className="text-slate-800 text-sm font-medium"
                />
              </View>
            </View>

            {/* Description Input */}
            <View className="mb-6">
              <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Description (Optional)
              </Text>
              <View className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Add subtasks, links, or notes..."
                  placeholderTextColor="#94a3b8"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="text-slate-800 text-sm font-medium min-h-[96px]"
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSave}
              className="bg-indigo-600 rounded-2xl py-3.5 items-center justify-center shadow-md shadow-indigo-200 flex-row gap-x-2"
            >
              <MaterialIcons name="save" size={20} color="#ffffff" />
              <Text className="text-white text-base font-bold tracking-wide">
                Save Task
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddTaskScreen