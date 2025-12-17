import request from '/@/service'

//ai问答接口带header
export const getAiAnswer = (data: any) => {
  return request<any, any>({
    baseURL: 'https://api.dify.ai/v1',
    url: 'workflows/run',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Bearer app-jynwANlFJ7x4aZodzN31hk8K',
      'Content-Type': 'application/json',
    },
  })
}
