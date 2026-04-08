import { useEffect, useState } from 'react'

function useWindowSize() {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return width
}
export default useWindowSize
