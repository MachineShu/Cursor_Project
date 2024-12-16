// 美食数据类型
export interface IFood {
  // 基础信息
  id: string
  name: string
  imageUrl: string
  price: string
  distance: string
  
  // 扩展信息
  description?: string
  taste?: string[]
  category?: string
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  
  // 用户交互信息
  isFavorite?: boolean
  isBlacklist?: boolean
  lastVisitTime?: number
}

// 筛选条件类型
export interface IFoodFilters {
  budget: string
  taste: string
  distance: string
} 