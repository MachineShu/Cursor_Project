// 模拟美食数据
export const mockFoods: Food.IFood[] = [
  {
    id: '1',
    name: '麻辣香锅',
    imageUrl: '../images/foods/malaxiangguo.jpg',
    price: '45',
    distance: '0.8',
    taste: ['麻辣', '重口味'],
    category: '川菜',
    description: '特色麻辣香锅,食材新鲜,配料丰富',
    location: {
      latitude: 30.5,
      longitude: 104.5,
      address: '某某路123号'
    }
  },
  {
    id: '2', 
    name: '清蒸鲈鱼',
    imageUrl: '../images/foods/qingzhengluyu.jpg',
    price: '88',
    distance: '1.2',
    taste: ['清淡', '鲜美'],
    category: '粤菜',
    description: '新鲜鲈鱼清蒸,保持原汁原味',
    location: {
      latitude: 30.6,
      longitude: 104.6,
      address: '某某路456号'
    }
  },
  {
    id: '3',
    name: '重庆小面',
    imageUrl: '../images/foods/xiaomian.jpg',
    price: '15',
    distance: '0.3',
    taste: ['麻辣', '酸辣'],
    category: '面食',
    description: '传统重庆小面,麻辣鲜香',
    location: {
      latitude: 30.4,
      longitude: 104.4,
      address: '某某路789号'
    }
  },
  {
    id: '4',
    name: '水煮鱼',
    imageUrl: '../images/foods/shuizhuyu.jpg',
    price: '68',
    distance: '2.1',
    taste: ['麻辣', '鲜香'],
    category: '川菜',
    description: '新鲜草鱼,特制麻辣汤底',
    location: {
      latitude: 30.7,
      longitude: 104.7,
      address: '某某路321号'
    }
  },
  {
    id: '5',
    name: '糖醋里脊',
    imageUrl: '../images/foods/tangculiji.jpg',
    price: '32',
    distance: '1.5',
    taste: ['甜味', '酸甜'],
    category: '粤菜',
    description: '外酥里嫩,酸甜可口',
    location: {
      latitude: 30.3,
      longitude: 104.3,
      address: '某某路654号'
    }
  }
] 