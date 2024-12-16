import { FILTER_OPTIONS } from '../../constants/filter'

type FilterOption = {
  text: string
  value: string
}

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    }
  },

  data: {
    options: [] as FilterOption[]
  },

  observers: {
    'type': function(type: string) {
      if (type) {
        this.setData({
          options: FILTER_OPTIONS[type as keyof typeof FILTER_OPTIONS]
        })
      }
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close')
    },

    onSelect(e: WechatMiniprogram.TouchEvent) {
      const { value } = e.currentTarget.dataset
      this.triggerEvent('select', { value })
    }
  }
}) 