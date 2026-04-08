import type { IFaq, IFaqCategories, ISendQuestion, ListResponse } from '@/types'
import request from '@/utils/axios'

export async function getFaqs(params: { service?: string }): Promise<ListResponse<IFaq[]>> {
  const res: ListResponse<IFaq[]> = await request({
    url: '/base/faqs/',
    method: 'get',
    params,
  })

  return res
}

export async function getFaqCategories(): Promise<ListResponse<IFaqCategories[]>> {
  const res: ListResponse<IFaqCategories[]> = await request({
    url: '/base/faq-services/',
    method: 'get',
  })

  return res
}

export async function sendQuestion(data: {
  email: string
  question_text: string
}): Promise<ISendQuestion> {
  const res: ISendQuestion = await request({
    url: '/base/questions/',
    method: 'post',
    data,
  })

  return res
}
