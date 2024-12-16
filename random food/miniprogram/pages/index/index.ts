// index.ts
import { mockFoods } from '../../data/foods'
import { FoodUtils } from '../../utils/food'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),

    // 筛选条件
    filters: {
      budget: '',
      taste: '',
      distance: ''
    } as Food.IFoodFilters,

    // 当前展示的美食
    currentFood: null as Food.IFood | null,

    // 添加历史记录
    history: [] as Food.IFood[],

    // 筛选弹窗数据
    filterPopup: {
      show: false,
      type: '',
      value: ''
    }
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },

    // 下拉刷新
    async onRefresh() {
      await this.randomFood()
      wx.stopPullDownRefresh()
    },

    // 筛选条件点击
    onFilterTap(e: any) {
      const type = e.currentTarget.dataset.type
      this.setData({
        'filterPopup.show': true,
        'filterPopup.type': type,
        'filterPopup.value': this.data.filters[type]
      })
    },

    // 筛选弹窗关闭
    onFilterClose() {
      this.setData({
        'filterPopup.show': false
      })
    },

    // 筛选选项选择
    onFilterSelect(e: any) {
      const { value } = e.detail
      const { type } = this.data.filterPopup
      
      this.setData({
        [`filters.${type}`]: value,
        'filterPopup.show': false
      })

      // 保存筛选条件
      wx.setStorageSync('food_filters', this.data.filters)
    },

    // 随机按钮点击
    async onRandomTap() {
      await this.randomFood()
    },

    // 快捷操作点击
    onQuickAction(e: any) {
      const action = e.currentTarget.dataset.action
      const food = this.data.currentFood
      if (!food) return

      switch (action) {
        case 'favorite':
          // TODO: 收藏逻辑
          break
        case 'blacklist':
          // TODO: 加入黑名单逻辑
          break
        case 'share':
          // TODO: 分享逻辑
          break
        case 'navigate':
          // TODO: 导航逻辑
          break
      }
    },

    // 随机选择美食
    async randomFood() {
      const food = await this.getFoodData()
      
      if (food) {
        // 更新当前食物和历史记录
        this.setData({
          currentFood: food,
          history: [food, ...this.data.history].slice(0, 10)
        })
        
        // 保存历史记录到本地存储
        wx.setStorageSync('food_history', this.data.history)
      } else {
        // 没有符合条件的食物
        wx.showToast({
          title: '没有找到符合条件的美食',
          icon: 'none'
        })
      }
    },

    // 获取食物数据
    async getFoodData(): Promise<Food.IFood | null> {
      return FoodUtils.randomSelect(mockFoods, this.data.filters)
    }
  }
})
