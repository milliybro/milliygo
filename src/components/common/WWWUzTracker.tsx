/* eslint-disable @next/next/no-img-element */
import { useHasHydrated } from '@/hooks/useHasHydrated'
import Script from 'next/script'

export default function WWWUzTracker() {
  const hasHydrated = useHasHydrated()

  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isProduction = hostname === 'sayohat.uz' || hostname === 'www.sayohat.uz'

  if (!hasHydrated || !isProduction) {
    return null
  }

  return (
    <div id="www-uz-tracker-container" className="overflow-hidden rounded-md">
      <Script
        id="www-uz-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            top_js="1.0";top_r="id=48034&r="+escape(document.referrer)+"&pg="+escape(window.location.href);document.cookie="smart_top=1; path=/"; top_r+="&c="+(document.cookie?"Y":"N")
          `,
        }}
      />

      <Script
        id="www-uz-tracker-1-1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            top_js="1.1";top_r+="&j="+(navigator.javaEnabled()?"Y":"N")
          `,
        }}
      />

      <Script
        id="www-uz-tracker-1-2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            top_js="1.2";top_r+="&wh="+screen.width+'x'+screen.height+"&px="+(((navigator.appName.substring(0,3)=="Mic"))?screen.colorDepth:screen.pixelDepth)
          `,
        }}
      />

      <Script
        id="www-uz-tracker-final"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            top_rat="&col=0063AF&t=ffffff&p=E6850F";top_r+="&js="+top_js+"";
            var trackerHTML = '<a href="http://www.uz/ru/res/visitor/index?id=48034" target=_top><img src="http://cnt0.www.uz/counter/collect?'+top_r+top_rat+'" width=88 height=31 alt="Топ рейтинг www.uz"></a>';
            var container = document.createElement('div');
            container.innerHTML = trackerHTML;
            document.getElementById('www-uz-tracker-container')?.appendChild(container);
          `,
        }}
      />

      <noscript>
        <a href="http://www.uz/ru/res/visitor/index?id=48034" target="_top">
          <img
            height="31"
            src="http://cnt0.www.uz/counter/collect?id=48034&pg=http%3A//uzinfocom.uz&&col=0063AF&t=ffffff&p=E6850F"
            width="88"
            alt="Топ рейтинг www.uz"
          />
        </a>
      </noscript>
    </div>
  )
}
