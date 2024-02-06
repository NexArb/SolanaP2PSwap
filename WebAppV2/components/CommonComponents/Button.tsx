'use client'

import React, { ReactNode } from 'react'

import { useFormStatus } from 'react-dom'

type ButtonProps = Readonly<{
  className: string
  children: ReactNode
  onClick?: () => void
}>

function Button({ className, children, onClick }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`rounded-full outline-none ${className}`}
      disabled={pending}
      onClick={() => onClick?.()}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
