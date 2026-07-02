import React from 'react'
import Navbar from '../components/Navbar'
import { Head } from '@inertiajs/react'

export default function MainLayout({ children, title = "Laravel React" }: { children: React.ReactNode, title?: string }) {
  return (
    <div>
      <Navbar />
      <Head title={title} />
      <div className="container mx-auto min-h-screen dark:bg-gray-500">
        {children}
      </div>
    </div>
  )
}
