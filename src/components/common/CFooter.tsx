import Link from 'next/link'
import Image from 'next/image'
import {
  AppleFilled,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
} from '@ant-design/icons'

const CFooter = () => {
  return (
    <footer className="mt-auto flex flex-col bg-white border-t border-[#F0F0F0]">
      <div className="container">
        <div className="flex flex-col dmd:flex-col dmd:gap-8 justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col">
            <Link href="/" className="mb-[24px]">
              <Image
                src="/logo-new.png"
                width={138}
                height={42}
                alt="Yemak Logo"
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </Link>
            
            <div className="flex flex-wrap gap-[24px] mb-[16px]">
              <Link href="/about" className="text-[15px] font-semibold text-[#111827] hover:text-[#0C0C0C] transition">
                Biz haqimizda
              </Link>
              <Link href="/offer" className="text-[15px] font-semibold text-[#111827] hover:text-[#0C0C0C] transition">
                Ommaviy oferta
              </Link>
              <Link href="/contact" className="text-[15px] font-semibold text-[#111827] hover:text-[#0C0C0C] transition">
                Bog'lanish
              </Link>
            </div>
            
            <p className="max-w-[550px] text-[13px] text-[#6B7280] leading-[1.6]">
              10 dan oshiq restoran, choyxona va kafelarni tanlab oson buyurtma berishingiz mumkin. Bularning barchasini telefoningizda turib bajarish mumkin
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-[16px] mt-8 lg:mt-0">
            <a href="#" className="flex items-center gap-[12px] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition duration-300 rounded-[12px] px-[20px] py-[12px]">
              <AppleFilled className="text-[32px] text-[#111827]" />
              <div className="flex flex-col">
                <span className="text-[11px] text-[#6B7280] leading-none mb-[4px]">Yuklab oling</span>
                <span className="text-[15px] font-bold text-[#111827] leading-none">App Store</span>
              </div>
            </a>
            
            <a href="#" className="flex items-center gap-[12px] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition duration-300 rounded-[12px] px-[20px] py-[12px]">
              <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.61385 1.22554C1.13799 1.72844 0.874962 2.51809 0.874962 3.52132V27.2114C0.874962 28.2146 1.13799 29.0042 1.61385 29.5071L1.77018 29.655L15.3976 15.9493V15.675L1.77018 1.07755L1.61385 1.22554Z" fill="#3BCCFF"/>
                <path d="M19.9961 20.596L15.3979 15.95V15.6755L19.9961 11.0294L20.216 11.1563L25.5458 14.2048C27.0687 15.0716 27.0687 16.4932 25.5458 17.36L20.216 20.4691L19.9961 20.596Z" fill="#FFC100"/>
                <path d="M20.216 20.469L15.3978 15.6757L1.61383 29.5073C2.15783 30.0824 3.0769 30.1586 4.0883 29.5878L20.216 20.469Z" fill="#F90C28"/>
                <path d="M20.216 11.0294L4.0883 1.9103C3.0769 1.33958 2.15783 1.4158 1.61383 1.99088L15.3978 15.6757L20.216 11.0294Z" fill="#00D75D"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#6B7280] leading-none mb-[4px]">Yuklab oling</span>
                <span className="text-[15px] font-bold text-[#111827] leading-none">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t my-3 border-[#F0F0F0]">
        <div className="container">
          <div className="flex flex-col dmd:flex-col dmd:gap-6 justify-between lg:flex-row lg:items-center">
            <div className="text-[13px] text-[#6B7280] font-medium order-3 lg:order-1 mt-4 lg:mt-0">
              © Milliy Superapp 2026. Barcha huquqlar himoyalangan.
            </div>
            
            <div className="flex items-center gap-[24px] order-1 lg:order-2">
              <a href="#" className="text-[#6B7280] hover:text-[#111827] transition duration-300">
                <SendOutlined className="text-[18px]" />
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#111827] transition duration-300">
                <FacebookOutlined className="text-[18px]" />
              </a>
              <a href="#" className="text-[#6B7280] hover:text-[#111827] transition duration-300">
                <InstagramOutlined className="text-[18px]" />
              </a>
            </div>
            
            <div className="flex flex-wrap items-center gap-[32px] order-2 lg:order-3">
              <a href="tel:+998904969007" className="flex items-center gap-[8px] text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition duration-300">
                <PhoneOutlined className="text-[16px]" /> +998 90 496 90 07
              </a>
              <a href="mailto:info@milliyapp.uz" className="flex items-center gap-[8px] text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition duration-300">
                <MailOutlined className="text-[16px]" /> info@milliyapp.uz
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default CFooter

