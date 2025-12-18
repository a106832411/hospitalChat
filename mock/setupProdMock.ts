import { createProdMockServer } from 'vite-plugin-mock/es/mockServer'
import { mockList } from './index'

export function setupProdMockServer() {
  createProdMockServer(mockList)
}
