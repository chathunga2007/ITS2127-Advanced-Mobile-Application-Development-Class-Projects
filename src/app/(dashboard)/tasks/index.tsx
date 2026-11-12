import { getMyTask } from "@/services/task.service"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { useFocusEffect, useRouter } from "expo-router"
import { useCallback, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface TaskItem {
  id: string
  title: string
  description: string
  isComplete: boolean
  createdAt: string
  userId?: string
}

const TasksScreen = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = useCallback(async (isPull = false) => {
    try {
      setError(null)
      const data = await getMyTask()
      setTasks(data as TaskItem[])
    } catch (err: any) {
      console.error(err)
      if (!isPull) setTasks([])
      const msg = err?.message || ""
      if (msg.includes("permissions") || msg.includes("permission-denied")) {
        setError(
          "Firestore permissions locked. Please update Rules in Firebase Console."
        )
      } else {
        setError(msg || "Could not load tasks")
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTasks()
    }, [loadTasks])
  )

  const onRefresh = () => {
    setRefreshing(true)
    loadTasks(true)
  }

  const completedCount = tasks.filter((t) => t.isComplete).length
  const progressPct =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header matching Home & Profile */}
      <View className="px-5 pt-3 pb-4 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-black text-slate-900 tracking-tight">
            My Tasks
          </Text>
          <Text className="text-xs text-slate-400 font-medium">
            Stay organized & track progress
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/tasks/form")}
          className="flex-row items-center gap-x-1 bg-indigo-600 px-3.5 py-2.5 rounded-2xl shadow-sm shadow-indigo-200"
        >
          <MaterialIcons name="add" size={18} color="#ffffff" />
          <Text className="text-white text-xs font-bold">New Task</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Strip */}
      <View className="px-5 py-3 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-2">
          <View className="w-2 h-2 rounded-full bg-indigo-600" />
          <Text className="text-xs font-semibold text-slate-500">
            Completed {completedCount} of {tasks.length}
          </Text>
        </View>
        <View className="bg-indigo-50 px-2.5 py-1 rounded-full">
          <Text className="text-[11px] font-bold text-indigo-600">
            {progressPct}%
          </Text>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="text-xs text-slate-500 font-semibold mt-3">
            Loading your tasks...
          </Text>
        </View>
      ) : error && tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white border border-slate-200/80 p-6 rounded-3xl items-center w-full max-w-sm shadow-sm shadow-slate-100">
            <View className="w-12 h-12 rounded-2xl bg-rose-50 items-center justify-center mb-3">
              <MaterialIcons name="cloud-off" size={24} color="#e11d48" />
            </View>
            <Text className="text-slate-900 font-bold text-base">
              Unable to reach tasks
            </Text>
            <Text className="text-slate-500 text-xs mt-1 text-center">
              {error}
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setLoading(true)
                loadTasks()
              }}
              className="mt-4 bg-indigo-600 px-5 py-2.5 rounded-2xl"
            >
              <Text className="text-white text-xs font-bold">Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4f46e5"
              colors={["#4f46e5"]}
            />
          }
          renderItem={({ item }) => (
            <View className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-3 shadow-sm shadow-slate-100">
              <View className="flex-row items-start justify-between">
                <View className="flex-row items-center gap-x-2.5 flex-1 pr-2">
                  <View
                    className={`w-5 h-5 rounded-md items-center justify-center border ${
                      item.isComplete
                        ? "bg-emerald-50 border-emerald-500"
                        : "bg-slate-50 border-slate-300"
                    }`}
                  >
                    {item.isComplete ? (
                      <MaterialIcons name="check" size={14} color="#059669" />
                    ) : null}
                  </View>

                  <Text
                    className={`text-base font-bold flex-1 ${
                      item.isComplete
                        ? "line-through text-slate-400"
                        : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </Text>
                </View>

                <View
                  className={`px-2.5 py-0.5 rounded-full ${
                    item.isComplete ? "bg-emerald-50" : "bg-amber-50"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      item.isComplete ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {item.isComplete ? "Done" : "Pending"}
                  </Text>
                </View>
              </View>

              {item.description ? (
                <Text className="text-xs text-slate-500 mt-2 ml-7 leading-relaxed">
                  {item.description}
                </Text>
              ) : null}
            </View>
          )}
          ListEmptyComponent={
            <View className="py-24 items-center justify-center">
              <View className="w-16 h-16 rounded-3xl bg-white border border-slate-200/80 items-center justify-center mb-3 shadow-xs">
                <MaterialIcons name="assignment" size={30} color="#64748b" />
              </View>
              <Text className="text-slate-800 font-bold text-base">
                No tasks yet
              </Text>
              <Text className="text-slate-400 text-xs mt-1 text-center max-w-[220px]">
                Tap &apos;New Task&apos; above to organize your goals and daily
                to-dos.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

export default TasksScreen