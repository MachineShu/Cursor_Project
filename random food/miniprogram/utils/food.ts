export class FoodUtils {
  // 存储已选择的食物ID,用于防重复
  private static selectedIds: Set<string> = new Set()
  
  // 根据筛选条件过滤食物
  static filterFoods(foods: Food.IFood[], filters: Food.IFoodFilters): Food.IFood[] {
    return foods.filter(food => {
      // 如果设置了预算,检查价格是否在范围内
      if (filters.budget && !this.checkBudget(food.price, filters.budget)) {
        return false
      }
      
      // 如果设置了口味,检查是否匹配
      if (filters.taste && !food.taste?.includes(filters.taste)) {
        return false
      }
      
      // 如果设置了距离,检查是否在范围内
      if (filters.distance && !this.checkDistance(food.distance, filters.distance)) {
        return false
      }
      
      return true
    })
  }
  
  // 检查价格是否在预算范围内
  private static checkBudget(price: string, budget: string): boolean {
    const priceNum = parseInt(price)
    switch (budget) {
      case '20以下':
        return priceNum <= 20
      case '20-50':
        return priceNum > 20 && priceNum <= 50
      case '50-100':
        return priceNum > 50 && priceNum <= 100
      case '100以上':
        return priceNum > 100
      default:
        return true
    }
  }
  
  // 检查距离是否在范围内
  private static checkDistance(distance: string, filter: string): boolean {
    const distanceNum = parseFloat(distance)
    switch (filter) {
      case '500m内':
        return distanceNum <= 0.5
      case '1km内':
        return distanceNum <= 1
      case '3km内':
        return distanceNum <= 3
      case '5km内':
        return distanceNum <= 5
      default:
        return true
    }
  }
  
  // 随机选择一个食物
  static randomSelect(foods: Food.IFood[], filters: Food.IFoodFilters): Food.IFood | null {
    // 先根据筛选条件过滤
    const filtered = this.filterFoods(foods, filters)
    if (filtered.length === 0) return null
    
    // 如果所有食物都被选过了,清空已选列表
    if (this.selectedIds.size === filtered.length) {
      this.selectedIds.clear()
    }
    
    // 从未选择的食物中随机选择
    const available = filtered.filter(food => !this.selectedIds.has(food.id))
    if (available.length === 0) return null
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const selected = available[randomIndex]
    
    // 记录已选择的ID
    this.selectedIds.add(selected.id)
    
    return selected
  }
} 