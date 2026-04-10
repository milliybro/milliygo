import React, { useContext } from 'react'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { getAccountMe } from '@/features/Account/api'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { 
    UserOutlined, 
    PhoneOutlined, 
    MailOutlined, 
    HistoryOutlined, 
    EnvironmentOutlined, 
    GiftOutlined, 
    QuestionCircleOutlined,
    LogoutOutlined,
    RightOutlined,
    VerifiedOutlined,
    CalendarOutlined
} from '@ant-design/icons'
import { Skeleton, Avatar, Button, Modal } from 'antd'
import { useRouter } from 'next/router'

interface IProps {
    locales: string[]
    locale: string
    defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
    return {
        props: {
            messages: (await import(`../../locales/${context.locale}.json`)).default,
        },
    }
}

const ProfilePage = () => {
    const t = useTranslations()
    const router = useRouter()
    const authContext = useContext(AuthContext)
    const logOut = authContext?.logOut

    const { data: userData, isLoading } = useQuery({
        queryKey: ['account-me'],
        queryFn: getAccountMe
    })

    const user = userData as any

    const menuItems = [
        { icon: <HistoryOutlined />, label: 'Mening buyurtmalarim', link: '/orders' },
        { icon: <EnvironmentOutlined />, label: 'Manzillarim', link: '#' },
        { icon: <GiftOutlined />, label: 'Promokodlar', link: '#' },
        { icon: <QuestionCircleOutlined />, label: 'Yordam markazi', link: '#' },
    ]

    const handleLogout = () => {
        Modal.confirm({
            title: 'Chiqish',
            content: 'Haqiqatan ham hisobingizdan chiqmoqchimisiz?',
            okText: 'Ha, chiqaman',
            cancelText: 'Bekor qilish',
            okButtonProps: { danger: true },
            onOk: () => {
                logOut?.()
                router.push('/')
            }
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] px-4 py-8">
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="bg-white rounded-[32px] p-6 flex flex-col items-center gap-4 shadow-sm border border-gray-50">
                        <Skeleton.Avatar active size={100} shape="circle" />
                        <Skeleton.Input active size="large" />
                    </div>
                    <div className="bg-white rounded-[24px] p-4 space-y-4 shadow-sm">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} active paragraph={{ rows: 1 }} avatar />)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#F8F9FA] pb-24">
            <div className="max-w-xl mx-auto pt-6 px-4 animate-fade-up">
                {/* Header Information Card */}
                <div className="bg-white rounded-[32px] p-6 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white flex flex-col items-center relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD600]/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00D166]/5 rounded-full blur-2xl" />

                    <div className="relative mb-4">
                        <Avatar 
                            src={user?.avatar} 
                            size={100} 
                            icon={<UserOutlined />} 
                            className="border-4 border-white shadow-xl bg-gray-100"
                        />
                        {user?.is_verified && (
                            <div className="absolute bottom-1 right-1 bg-[#00D166] text-white rounded-full p-1 border-2 border-white flex items-center justify-center">
                                <VerifiedOutlined className="text-[12px]" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-[22px] font-black text-[#111] mb-1">
                        {user?.full_name || 'Foydalanuvchi'}
                    </h1>
                    <p className="text-[14px] text-gray-400 font-medium">
                        {user?.phone_number}
                    </p>

                    <div className="mt-4 flex gap-4">
                        <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-2xl">
                            <span className="text-[12px] text-gray-400">Status</span>
                            <span className="text-[14px] font-bold text-[#00D166] capitalize">{user?.status === "active" ? "Faol" : "Nofaol"}</span>
                        </div>
                        <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-2xl">
                            <span className="text-[12px] text-gray-400">Rol</span>
                            <span className="text-[14px] font-bold text-gray-900 capitalize">{user?.role === "admin" ? "Admin" : "Foydalanuvchi"}</span>
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div className="bg-white rounded-[28px] p-2 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <span className="text-[13px] font-extrabold text-gray-400 uppercase tracking-widest">Ma'lumotlar</span>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-4 px-4 py-3 active:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <MailOutlined className="text-lg" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-[12px] text-gray-400">Elektron pochta</span>
                                <span className="text-[14px] font-bold text-gray-900">{user?.email || 'Biriktirilmagan'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-4 py-3 active:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                                <CalendarOutlined className="text-lg" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-[12px] text-gray-400">Ro'yxatdan o'tilgan sana</span>
                                <span className="text-[14px] font-bold text-gray-900">{user?.date_joined}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="bg-white rounded-[28px] p-2 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <span className="text-[13px] font-extrabold text-gray-400 uppercase tracking-widest">Sozlamalar</span>
                    </div>
                    <div className="space-y-1">
                        {menuItems.map((item, idx) => (
                            <div 
                                key={idx}
                                onClick={() => router.push(item.link)}
                                className="flex items-center gap-4 px-4 py-3 cursor-pointer group hover:bg-[#F8F9FA] active:scale-[0.99] transition-all rounded-[20px]"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#FFD600] group-hover:text-black transition-colors">
                                    {item.icon}
                                </div>
                                <span className="flex-1 text-[15px] font-bold text-gray-800">{item.label}</span>
                                <RightOutlined className="text-gray-300 group-hover:text-gray-500" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <button 
                    onClick={handleLogout}
                    className="w-full bg-white text-red-500 font-extrabold h-14 rounded-2xl border border-red-50 shadow-sm flex items-center justify-center gap-3 active:bg-red-50 active:scale-[0.98] transition-all"
                >
                    <LogoutOutlined />
                    HISOBDAN CHIQISH
                </button>
            </div>
        </main>
    )
}

export default ProfilePage

