import {create} from "zustand"
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set,get)=>({
    authUser:null,
    loading: true,

    setAuthUser: (user) => set({ authUser: user }),
    
    clearAuthUser: () => set({ authUser: null }),

    checkAuth:async()=>{
        try {
          const res = await axiosInstance.get("/auth/check")
          set({authUser:res.data,loading: false})
          console.log(get().authUser);
          

        } catch (error) {
          console.log("Error in checkAuth",error)
          set({authUser:null,loading: false})
        }
    },
}))