import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './Intro'
import BreakfastMenu from './BreakfastMenu'

export default function App() {
 const [introFinished, setIntroFinished] = useState(false)
 const handleIntroDone = useCallback(() => setIntroFinished(true), [])

 return (
  <>
   <AnimatePresence>
    {!introFinished && <Intro key="intro" onDone={handleIntroDone} />}
   </AnimatePresence>

   <AnimatePresence>
    {introFinished && <BreakfastMenu key="menu" />}
   </AnimatePresence>
  </>
 )
}
