import { useEffect, useState } from 'react'

function useBreakpointSlides() {
  const [slides, setSlides] = useState(3)

  useEffect(() => {
    function update() {
      const width = window.innerWidth
      if (width < 400) setSlides(1.1)
      else if (width < 500) setSlides(1.4)
      else if (width < 700) setSlides(2.4)
      else setSlides(3)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return slides
}
export default useBreakpointSlides
