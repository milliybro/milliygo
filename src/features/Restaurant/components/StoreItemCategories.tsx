import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { getStoreItemCategories } from '../api'
import { useCategoryScrollStore } from '../store/categoryScrollStore'

import { ICategory } from '../../Main/types'

const StoreItemCategories = () => {
    const router = useRouter()
    const { slug } = router.query

    // local state yo'q — store dan o'qiymiz
    const { activeCategoryId, triggerScroll } = useCategoryScrollStore()

    const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: ['item-base-categories', slug],
        queryFn: () => getStoreItemCategories({ id: slug as string }),
        enabled: !!slug,
    })

    const categoryList: ICategory[] = (categoriesData?.data?.categories || []).filter(
        (cat: ICategory) => cat.is_active !== false
    )

    const handleCategoryClick = (id: number | null) => {
        // triggerScroll: activeCategoryId ni set qiladi + scrollTrigger ni oshiradi
        // StoreItemDetails useEffect scrollTrigger ni ko'rib scroll qiladi
        triggerScroll(id)
    }

    return (
        <div className="lg:sticky lg:top-24 z-30">
            <div className="hidden lg:block">
                <Button
                    onClick={() => router.back()}
                    className="mb-4 w-full h-11 rounded-xl border-gray-200 text-gray-600 hover:text-gray-900"
                    icon={<ArrowLeftOutlined />}
                >
                    Orqaga qaytish
                </Button>
            </div>

            {!categoriesLoading && categoryList.length > 0 && (
                <div className="lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:p-3 lg:shadow-sm">
                    <p className="hidden lg:block text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
                        Kategoriyalar
                    </p>

                    <style>{`
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    
                    <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                        {/* Hammasi */}
                        <button
                            onClick={() => handleCategoryClick(null)}
                            className={`whitespace-nowrap px-4 py-2 lg:w-full lg:rounded-xl lg:px-3 lg:py-2.5 text-left text-[13px] lg:text-[14px] font-semibold transition-all duration-200 border rounded-full lg:border-none ${
                                activeCategoryId === null
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            Hammasi
                        </button>

                        {categoryList.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                className={`whitespace-nowrap px-4 py-2 lg:w-full lg:rounded-xl lg:px-3 lg:py-2.5 text-left text-[13px] lg:text-[14px] font-semibold transition-all duration-200 border rounded-full lg:border-none ${
                                    activeCategoryId === cat.id
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {cat.category_details?.name || cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default StoreItemCategories