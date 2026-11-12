import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { loginUser, logoutUser } from '@/services/authService'
import { showToast } from '@/utils/notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppUser } from '@/types/user'
import { useLoader } from '@/hooks/useLoader'


export const AuthContext = createContext<AuthContextType>()

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showLoader, hideLoader, isLoading } = useLoader()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    showLoader()
   
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}