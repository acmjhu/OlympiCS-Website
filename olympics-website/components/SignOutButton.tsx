'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'

interface SignOutButtonProps {
  className?: string
  variant?: 'default' | 'compact'
}

export default function SignOutButton({ className, variant = 'default' }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: '/login' })
    } finally {
      setIsLoading(false)
    }
  }

  const defaultClass = variant === 'compact' 
    ? "px-4 py-2 text-xl font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    : "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={className || defaultClass}
    >
      {isLoading ? 'Signing out...' : 'Logout'}
    </button>
  )
}
