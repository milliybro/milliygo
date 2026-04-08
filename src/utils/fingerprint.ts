interface ComponentResult<T = any> {
  value?: T
  duration: number
}

interface CanvasValue {
  winding: boolean
  geometry: string
  text: string
}

interface WebGLBasicsValue {
  version: string
  vendor: string
  vendorUnmasked: string
  renderer: string
  rendererUnmasked: string
  shadingLanguageVersion: string
}

interface WebGLExtensionsValue {
  extensions: string[]
}

interface TouchSupportValue {
  maxTouchPoints: number
  touchEvent: boolean
  touchStart: boolean
}

interface MathValue {
  acos: number
  acosh: number
  asin: number
  asinh: number
  atanh: number
  atan: number
  sin: number
  sinh: number
  cos: number
  cosh: number
  tan: number
  tanh: number
  exp: number
  expm1: number
  log1p: number
  powPI: number
}

interface PluginMimeType {
  type: string
  suffixes: string
}

interface PluginInfo {
  name: string
  description: string
  mimeTypes: PluginMimeType[]
}

interface FingerprintComponents {
  fonts?: ComponentResult<string[]>
  canvas?: ComponentResult<CanvasValue>
  webGlBasics?: ComponentResult<WebGLBasicsValue>
  webGlExtensions?: ComponentResult<WebGLExtensionsValue>
  audio?: ComponentResult<number>
  screenResolution?: ComponentResult<number[]>
  colorDepth?: ComponentResult<number>
  screenFrame?: ComponentResult<number[]>
  plugins?: ComponentResult<PluginInfo[]>
  languages?: ComponentResult<string[][]>
  timezone?: ComponentResult<string>
  localStorage?: ComponentResult<boolean>
  sessionStorage?: ComponentResult<boolean>
  indexedDB?: ComponentResult<boolean>
  touchSupport?: ComponentResult<TouchSupportValue>
  colorGamut?: ComponentResult<string>
  reducedMotion?: ComponentResult<boolean>
  forcedColors?: ComponentResult<boolean>
  monochrome?: ComponentResult<number>
  contrast?: ComponentResult<number>
  math?: ComponentResult<MathValue>
  platform?: ComponentResult<string>
  vendor?: ComponentResult<string>
  hardwareConcurrency?: ComponentResult<number>
  deviceMemory?: ComponentResult<number>
  cookiesEnabled?: ComponentResult<boolean>
}

interface FingerprintResult {
  visitorId: string
  confidence: { score: number }
  duration: number
  userAgent: string
  components: FingerprintComponents
}

class BrowserFingerprint {
  private components: FingerprintComponents = {}
  private startTime: number

  constructor() {
    this.startTime = performance.now()
  }

  async generate(): Promise<FingerprintResult> {
    const tasks: Promise<void>[] = [
      this.getScreenInfo(),
      this.getPlugins(),
      this.getLanguages(),
      this.getTimezone(),
      this.getStorage(),
      this.getTouchSupport(),
      this.getMediaQueries(),
      this.getMathFingerprint(),
      this.getBrowserInfo(),
    ]

    await Promise.allSettled(tasks)

    const fingerprint = this.computeFingerprint()
    const duration = Math.round(performance.now() - this.startTime)

    return {
      visitorId: fingerprint,
      confidence: { score: this.calculateConfidence() },
      duration: duration,
      userAgent: navigator.userAgent,
      components: this.components,
    }
  }

  private async getFonts(): Promise<void> {
    const start = performance.now()
    const baseFonts = ['monospace', 'sans-serif', 'serif']
    const testFonts = [
      'Arial',
      'Verdana',
      'Times New Roman',
      'Courier New',
      'Georgia',
      'Palatino',
      'Garamond',
      'Bookman',
      'Comic Sans MS',
      'Trebuchet MS',
      'Impact',
      'Lucida Console',
      'Tahoma',
      'Courier',
      'Helvetica',
      'PMingLiU',
      'SimSun',
      'Microsoft YaHei',
    ]

    const testString = 'mmmmmmmmmmlli'
    const testSize = '72px'
    const h = document.getElementsByTagName('body')[0]
    const s = document.createElement('span')
    s.style.position = 'absolute'
    s.style.left = '-9999px'
    s.style.fontSize = testSize
    s.innerHTML = testString

    const defaultWidths: Record<string, number> = {}
    const defaultHeights: Record<string, number> = {}

    for (const baseFont of baseFonts) {
      s.style.fontFamily = baseFont
      h.appendChild(s)
      defaultWidths[baseFont] = s.offsetWidth
      defaultHeights[baseFont] = s.offsetHeight
      h.removeChild(s)
    }

    const detectedFonts: string[] = []
    for (const font of testFonts) {
      let detected = false
      for (const baseFont of baseFonts) {
        s.style.fontFamily = `'${font}',${baseFont}`
        h.appendChild(s)
        const matched =
          s.offsetWidth !== defaultWidths[baseFont] || s.offsetHeight !== defaultHeights[baseFont]
        h.removeChild(s)
        if (matched) {
          detected = true
          break
        }
      }
      if (detected) detectedFonts.push(font)
    }

    this.components.fonts = {
      value: detectedFonts,
      duration: Math.round(performance.now() - start),
    }
  }

  private async getCanvas(): Promise<void> {
    const start = performance.now()
    const canvas = document.createElement('canvas')
    canvas.width = 240
    canvas.height = 60
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      this.components.canvas = { duration: Math.round(performance.now() - start) }
      return
    }

    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(100, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.font = '11pt "Times New Roman"'
    const txt = 'Cwm fjordbank glyphs vext quiz, 😃'
    ctx.fillText(txt, 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.font = '18pt Arial'
    ctx.fillText(txt, 4, 45)

    const canvas2 = document.createElement('canvas')
    canvas2.width = 122
    canvas2.height = 110
    const ctx2 = canvas2.getContext('2d')

    if (!ctx2) {
      this.components.canvas = { duration: Math.round(performance.now() - start) }
      return
    }

    ctx2.globalCompositeOperation = 'multiply'
    for (let i = 0; i < 6; i++) {
      ctx2.fillStyle = `hsl(${i * 60}, 100%, 50%)`
      ctx2.beginPath()
      ctx2.arc(60, 60, 50, 0, Math.PI * 2, true)
      ctx2.closePath()
      ctx2.fill()
    }
    ctx2.fillStyle = '#f00'
    ctx2.arc(60, 60, 20, 0, Math.PI * 2, true)
    ctx2.fill()

    this.components.canvas = {
      value: {
        winding: ctx2.isPointInPath(60, 60, 'evenodd') === false,
        geometry: canvas2.toDataURL().substring(0, 100),
        text: canvas.toDataURL().substring(0, 100),
      },
      duration: Math.round(performance.now() - start),
    }
  }

  private async getWebGL(): Promise<void> {
    const start = performance.now()
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext

    if (!gl) {
      this.components.webGlBasics = { duration: Math.round(performance.now() - start) }
      return
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR)
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER)

    this.components.webGlBasics = {
      value: {
        version: gl.getParameter(gl.VERSION) as string,
        vendor: gl.getParameter(gl.VENDOR) as string,
        vendorUnmasked: vendor as string,
        renderer: gl.getParameter(gl.RENDERER) as string,
        rendererUnmasked: renderer as string,
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION) as string,
      },
      duration: Math.round(performance.now() - start),
    }

    const extensions = gl.getSupportedExtensions() || []
    this.components.webGlExtensions = {
      value: { extensions: extensions },
      duration: 1,
    }
  }

  private async getAudio(): Promise<void> {
    const start = performance.now()
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) throw new Error('No AudioContext')

      const context = new AudioContext()
      if (context.state === 'suspended') {
        await context.resume().catch(() => {})
      }

      const oscillator = context.createOscillator()
      const analyser = context.createAnalyser()
      const gainNode = context.createGain()
      const scriptProcessor = context.createScriptProcessor(4096, 1, 1)

      gainNode.gain.value = 0
      oscillator.type = 'triangle'
      oscillator.connect(analyser)
      analyser.connect(scriptProcessor)
      scriptProcessor.connect(gainNode)
      gainNode.connect(context.destination)

      oscillator.start(0)

      const audioSum = await Promise.race([
        new Promise<number>((resolve) => {
          scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
            const output = e.inputBuffer.getChannelData(0)
            let sum = 0
            for (let i = 0; i < output.length; i++) sum += Math.abs(output[i])
            oscillator.stop()
            scriptProcessor.disconnect()
            analyser.disconnect()
            gainNode.disconnect()
            resolve(sum)
          }
        }),
        new Promise<number>((resolve) => setTimeout(() => resolve(Math.random()), 500)), // fallback entropy
      ])

      await context.close()

      this.components.audio = { value: audioSum, duration: Math.round(performance.now() - start) }
    } catch {
      this.components.audio = {
        value: Math.random(),
        duration: Math.round(performance.now() - start),
      } // fallback entropy
    }
  }

  private async getScreenInfo(): Promise<void> {
    this.components.screenResolution = {
      value: [screen.width, screen.height],
      duration: 0,
    }
    this.components.colorDepth = {
      value: screen.colorDepth,
      duration: 0,
    }
    this.components.screenFrame = {
      value: [
        window.screenTop || window.screenY,
        window.screenLeft || window.screenX,
        (screen as any).availTop || 0,
        (screen as any).availLeft || 0,
      ],
      duration: 0,
    }
  }

  private async getPlugins(): Promise<void> {
    const start = performance.now()
    const plugins: PluginInfo[] = []
    for (let i = 0; i < navigator.plugins.length; i++) {
      const plugin = navigator.plugins[i]
      const mimeTypes: PluginMimeType[] = []
      for (let j = 0; j < plugin.length; j++) {
        mimeTypes.push({
          type: plugin[j].type,
          suffixes: plugin[j].suffixes,
        })
      }
      plugins.push({
        name: plugin.name,
        description: plugin.description,
        mimeTypes: mimeTypes,
      })
    }
    this.components.plugins = {
      value: plugins,
      duration: Math.round(performance.now() - start),
    }
  }

  private async getLanguages(): Promise<void> {
    this.components.languages = {
      value: [[navigator.language]],
      duration: 0,
    }
  }

  private async getTimezone(): Promise<void> {
    const start = performance.now()
    this.components.timezone = {
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
      duration: Math.round(performance.now() - start),
    }
  }

  private async getStorage(): Promise<void> {
    try {
      this.components.localStorage = {
        value: !!window.localStorage,
        duration: 0,
      }
      this.components.sessionStorage = {
        value: !!window.sessionStorage,
        duration: 0,
      }
      this.components.indexedDB = {
        value: !!window.indexedDB,
        duration: 0,
      }
    } catch (e) {
      this.components.localStorage = { value: false, duration: 0 }
    }
  }

  private async getTouchSupport(): Promise<void> {
    this.components.touchSupport = {
      value: {
        maxTouchPoints: navigator.maxTouchPoints || 0,
        touchEvent: 'ontouchstart' in window,
        touchStart: 'ontouchstart' in window,
      },
      duration: 0,
    }
  }

  private async getMediaQueries(): Promise<void> {
    this.components.colorGamut = {
      value: matchMedia('(color-gamut: srgb)').matches
        ? 'srgb'
        : matchMedia('(color-gamut: p3)').matches
          ? 'p3'
          : matchMedia('(color-gamut: rec2020)').matches
            ? 'rec2020'
            : 'unknown',
      duration: 0,
    }
    this.components.reducedMotion = {
      value: matchMedia('(prefers-reduced-motion: reduce)').matches,
      duration: 0,
    }
    this.components.forcedColors = {
      value: matchMedia('(forced-colors: active)').matches,
      duration: 0,
    }
    this.components.monochrome = {
      value: matchMedia('(monochrome)').matches ? 1 : 0,
      duration: 0,
    }
    this.components.contrast = {
      value: matchMedia('(prefers-contrast: more)').matches ? 1 : 0,
      duration: 0,
    }
  }

  private async getMathFingerprint(): Promise<void> {
    const start = performance.now()
    this.components.math = {
      value: {
        acos: Math.acos(0.123),
        acosh: Math.acosh(1234),
        asin: Math.asin(0.123),
        asinh: Math.asinh(1),
        atanh: Math.atanh(0.5),
        atan: Math.atan(0.5),
        sin: Math.sin(-1),
        sinh: Math.sinh(1),
        cos: Math.cos(10),
        cosh: Math.cosh(1),
        tan: Math.tan(-1),
        tanh: Math.tanh(1),
        exp: Math.exp(1),
        expm1: Math.expm1(1),
        log1p: Math.log1p(10),
        powPI: Math.pow(Math.PI, -100),
      },
      duration: Math.round(performance.now() - start),
    }
  }

  private async getBrowserInfo(): Promise<void> {
    this.components.platform = { value: navigator.platform, duration: 0 }
    this.components.vendor = { value: navigator.vendor, duration: 0 }
    this.components.hardwareConcurrency = { value: navigator.hardwareConcurrency, duration: 0 }
    this.components.deviceMemory = { value: (navigator as any).deviceMemory, duration: 0 }
    this.components.cookiesEnabled = { value: navigator.cookieEnabled, duration: 0 }
  }

  private murmurhash3(str: string): string {
    let h = 0x9e3779b9
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 0x5bd1e995)
      h ^= h >>> 15
    }
    return (h >>> 0).toString(16).padStart(8, '0')
  }

  private computeFingerprint(): string {
    const data = JSON.stringify(this.components)
    const hash1 = this.murmurhash3(data)
    const hash2 = this.murmurhash3(data + hash1)
    const hash3 = this.murmurhash3(data + hash2)
    const hash4 = this.murmurhash3(data + hash3)
    return hash1 + hash2 + hash3 + hash4
  }

  private calculateConfidence(): number {
    const componentCount = Object.keys(this.components).length
    const hasCanvas = !!this.components.canvas?.value
    const hasWebGL = !!this.components.webGlBasics?.value
    const hasAudio = !!this.components.audio?.value

    let score = 0.5
    if (componentCount > 15) score += 0.1
    if (hasCanvas) score += 0.1
    if (hasWebGL) score += 0.05
    if (hasAudio) score += 0.05

    return Math.min(score, 1)
  }
}

const fingerprint = new BrowserFingerprint()

export { fingerprint, type FingerprintResult }
