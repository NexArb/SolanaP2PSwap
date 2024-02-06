'use client'

import React, { useEffect } from 'react'

import { useModalStore } from '@/hooks/userStore'
import { useRouter } from 'next/navigation'

type ModalProp = Readonly<{
  children: React.ReactNode
  routerBack: string
}>

const Modal = ({ children, routerBack }: ModalProp) => {
  const router = useRouter()
  const { showModal, toggleModal } = useModalStore()

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleModal()
        router.push(routerBack)
      }
    }

    window.addEventListener('keydown', handleEsc)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [router, routerBack, toggleModal]) // Empty dependency array ensures this runs once on mount and cleanup on unmount

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement
    if (target.id === 'wrapper') {
      // If it's a keyboard event, only handle if 'Enter' or 'Space' was pressed
      if (
        event instanceof KeyboardEvent &&
        !['Enter', ' '].includes(event.key)
      ) {
        return
      }
      toggleModal()
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement
    if (target.id === 'wrapper') {
      try {
        toggleModal()
        router.push(routerBack)
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (!showModal) return null
  return (
    <section
      role="dialog"
      id="wrapper"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      {children}
    </section>
  )
}

export default Modal
