import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useState, useRef } from 'react'

const usePdfGenerator = (fileName: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const generatePdf = async () => {
    setIsLoading(true)
    const input = contentRef.current

    if (!input) {
      setIsLoading(false)
      console.error('Content reference is null')
      return
    }

    try {
      const canvas = await html2canvas(input, { scale: 2, useCORS: true, allowTaint: true })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      let yOffset = 0

      if (imgHeight > pdfHeight) {
        while (yOffset < imgHeight) {
          pdf.addImage(imgData, 'PNG', 0, -yOffset, imgWidth, imgHeight)
          yOffset += pdfHeight
          if (yOffset < imgHeight) pdf.addPage()
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      }

      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { contentRef, isLoading, generatePdf }
}

export default usePdfGenerator
