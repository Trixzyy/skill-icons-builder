'use client'

import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"

export default function StarRepository() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [isStarHovered, setIsStarHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const checkVisibility = () => {
      if (isMobile) {
        const shouldShow = localStorage.getItem('starRepositoryDismissed') !== 'true'
        setIsVisible(shouldShow)
      } else {
        setIsVisible(true)
      }
    }

    checkMobile()
    checkVisibility()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

  const handleDismiss = () => {
    if (isMobile) {
      setIsVisible(false)
      if (dontShowAgain) {
        localStorage.setItem('starRepositoryDismissed', 'true')
      }
    }
  }

  const handleStarClick = () => {
    window.open('https://github.com/trixzyy/skill-icons-builder', '_blank')
  }

  const content = (
    <div className="flex items-center justify-between space-x-4">
      <p className="text-sm flex-grow">
        Enjoying Skill Icons Builder?
      </p>
      <Button
        variant="default"
        onClick={handleStarClick}
        className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 text-sm font-medium flex items-center space-x-2"
      >
        <Star className="w-4 h-4" />
        <span>Star on GitHub</span>
      </Button>
    </div>
  )

  const mobileVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  }

  const desktopVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  if (isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileVariants}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 z-50"
          >
            <Card className="rounded-t-lg shadow-lg">
              <div className="p-4">
                {content}
                <div className="mt-3 flex items-center justify-between text-sm">
                  <button
                    onClick={() => setDontShowAgain(!dontShowAgain)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {dontShowAgain ? "Show again" : "Don't show again"}
                  </button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleDismiss}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={desktopVariants}
        transition={{ duration: 0.3 }}
      >
        <Card className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          {content}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}