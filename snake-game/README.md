# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 使用说明

先安装 npm

启动：npm start

## 贪吃蛇游戏需求文档

### 核心功能

1. **蛇的基本属性和行为**
   - 初始位置：游戏开始时蛇位于游戏区域的中心。
   - 初始长度：蛇的初始长度为3节。
   - 移动速度：初始速度为每秒移动5格，随着分数增加逐渐加快。
   - 移动方向：支持上下左右四个方向的移动。
   - 蛇身结构：记录每一节蛇身的位置和方向。

2. **食物系统**
   - 随机生成位置：食物不会出现在蛇身上。
   - 食物类型：普通食物，每次吃到增加1分。
   - 生成频率：每次吃掉食物后立即生成新的食物。

3. **碰撞检测**
   - 边界碰撞：蛇头碰到边界时，从另一侧穿过（例如，从右边穿到左边，从下边穿到上边）。
   - 自身碰撞：蛇头碰到蛇身时游戏结束。
   - 食物碰撞：蛇头碰到食物时，蛇身增长，得分增加。

4. **游戏状态控制**
   - 游戏初始状态：显示开始界面。
   - 游戏进行中状态：正常游戏状态。
   - 游戏暂停状态：按下暂停键时暂停游戏。
   - 游戏结束状态：显示得分和重新开始选项。
   - 状态之间的转换：通过键盘输入控制。

### 其他功能
- 计分系统：显示当前得分和最高分。
- 游戏音效：吃到食物和游戏结束时播放音效。


### 游戏控制

1. **键盘控制**
   - 方向控制：
     * 上：W 键或向上箭头
     * 下：S 键或向下箭头
     * 左：A 键或向左箭头
     * 右：D 键或向右箭头
   - 功能控制：
     * 开始游戏：Space 键
     * 暂停游戏：ESC 键
     * 重新开始：Enter 键

2. **移动规则**
   - 蛇不能直接向相反方向移动（例如向右移动时不能直接向左转向）
   - 在暂停状态下不响应方向控制
   - 当快速按下多个方向键时，确保移动的连续性和准确性

3. **触摸控制（移动端支持）**
   - 滑动控制方向：
     * 向上滑动：蛇向上移动
     * 向下滑动：蛇向下移动
     * 向左滑动：蛇向左移动
     * 向右滑动：蛇向右移动
   - 点击操作：
     * 单击屏幕：开始/暂停游戏
     * 双击屏幕：重新开始游戏

4. **游戏速度控制**
   - 基础移动速度：每秒5格
   - 每获得10分增加移动速度
   - 最大速度限制：每秒15格

### 游戏界面设计

1. **游戏区域**
   - 大小：建议为20x20的网格系统，具体大小可以根据设备屏幕调整。
   - 背景：简单的颜色或图案，确保蛇和食物清晰可见。

2. **蛇和食物的视觉表现**
   - 蛇：每节蛇身用方块表示，颜色可以是绿色或其他醒目的颜色。
   - 食物：用不同颜色的方块表示，确保与蛇区分开。

3. **分数显示**
   - 位置：游戏区域上方或下方。
   - 样式：简单明了，使用大号字体。

4. **游戏状态显示**
   - 开始界面：显示游戏名称和开始提示。
   - 暂停界面：显示暂停提示。
   - 结束界面：显示最终得分和重新开始选项。

5. **响应式设计**
   - 确保在不同设备和屏幕尺寸下，游戏界面都能正常显示。
   - 使用相对单位（如百分比）调整布局。

6. **音效和动画**
   - 吃到食物时的音效。
   - 游戏结束时的音效。
   - 蛇移动时的简单动画效果。
