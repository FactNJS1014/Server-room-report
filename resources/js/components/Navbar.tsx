import { Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react';
import { UserInfo } from '@/types';

export default function Navbar() {
    // สร้างตัวแปรสำหรับกำหนด dark mode
  const [darkMode, setDarkMode] = useState(false)
  const { userInfo } = usePage().props as { userInfo: UserInfo };

  // เพิ่ม dark mode
  useEffect(() => {
    // ตรวจสอบ system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedDarkMode = localStorage.getItem('darkMode')

    // ถ้ามีค่าใน localStorage ให้ใช้ค่านั้น ไม่งั้นใช้ค่า system preference
    const isDarkMode = savedDarkMode !== null ? savedDarkMode === 'true' : prefersDarkMode
    setDarkMode(isDarkMode)
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  // ฟังก์ชันสำหรับเปลี่ยน mode เป็น dark/light
  const toggleDarkMode = () => {

    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)

    // บันทึกลง localStorage
    localStorage.setItem('darkMode', String(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }

  return (
    <nav className="bg-white shadow-md py-4 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            <div className="flex items-center gap-2">
             <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-400 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 text-white">
                <path d="M5.354 2a2 2 0 0 0-1.857 1.257l-.338.845C3.43 4.035 3.71 4 4 4h8c.29 0 .571.035.84.102l-.337-.845A2 2 0 0 0 10.646 2H5.354Z" />
                <path fillRule="evenodd" d="M2 13a2 2 0 0 1 2-2h8a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Zm10.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9 13.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4 5.5a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4H4Zm8 2.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.75 7.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
              </svg>
             </div>
              <Link href="/">ServerRoom History</Link>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className='dark:text-gray-200 text-gray-900 text-lg'>{userInfo.username}</p>
            {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                aria-label={darkMode ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

          </div>
          
          
          
          
        </div>
        
      </div>
    </nav>
  )
}
