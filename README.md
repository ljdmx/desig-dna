# Design DNA Gallery

json数据不能修改，一模一样的使用，支持Markdown完整对应方案复制，支持json完整对应方案复制,支持一键复制对应方案全部色值：

Premium Web Design DNA Library™ v7.0 展示网站设计规划

项目概述

展示 32 个顶级 Web 设计方案的互动展示平台，每个方案包含完整的设计系统、色彩体系、排版系统、动效系统等详细信息。

三个设计方向

方向 1：极简学院派

概率：0.08

简洁网格布局，类似美术馆目录

黑白灰基础色系，强调内容本身

卡片式展示，严谨的信息层级

方向 2：沉浸式数字美术馆

概率：0.05

非线性布局，大量留白与空间感

深色背景，精细的光影效果

每个方案如同艺术品被聚光灯照亮

方向 3：现代交互展厅

概率：0.07

动态网格布局，卡片间有微妙的间距关系

渐变色背景，现代简洁风格

丰富的微交互和过渡动画

选定方向：沉浸式数字美术馆

设计运动

当代艺术美术馆策展美学结合数字交互体验

核心原则

空间感优先 - 大量留白与深色背景营造沉浸感

内容为王 - 每个设计方案如同展品，通过光影突出

精细交互 - 微妙的悬停效果、平滑的过渡、流畅的动画

高级质感 - 渐变、模糊、阴影等效果打造层次感

色彩哲学

深色基调：#0A0A0A 作为主背景，营造沉浸感

高级灰：#1A1A1A、#2A2A2A 作为卡片/表面色

强调色：#7C3AED（紫色）作为交互提示

文本色：#F5F5F5（浅白）确保高对比度

夜间模式：自动反转，背景变亮，文本变深

布局范式

首屏：大标题 + 简洁导航 + 搜索/筛选

方案网格：3 列响应式布局，卡片间有精确间距

方案详情：全屏沉浸式展示，侧边栏快速导航

页脚：简洁信息 + 社交链接

签名元素

光晕效果 - 卡片悬停时出现柔和光晕

渐变分割线 - 使用渐变而非纯色分割线

浮动标签 - 方案关键词以浮动标签形式展示

平滑过渡 - 所有交互都有 200-400ms 的平滑过渡

交互哲学

悬停卡片时：卡片升起、光晕出现、阴影加深

点击方案时：平滑过渡到详情页，背景虚化

主题切换时：平滑色彩过渡，无闪烁感

复制功能：Toast 提示 + 按钮视觉反馈

动效指南

入场动画：从下方淡入 + 微妙上升（300ms）

卡片悬停：Y 轴 -4px 位移 + 阴影增强（200ms）

模态打开：背景模糊 + 内容从中心缩放进入（350ms）

主题切换：全局色彩平滑过渡（400ms）

排版系统

标题：Poppins Bold / 思源黑体 Bold，大小 32-48px

副标题：Poppins SemiBold，大小 20-24px

正文：Inter / 思源黑体 Regular，大小 14-16px

标签：Inter Medium，大小 12px

行距：1.6（正文）、1.4（标题）

品牌本质

一句话定位：为全球顶级设计师和品牌提供的高级设计系统展示平台，每个方案都是一件可被探索的数字艺术品。

品牌人格：

专业（Professional）

精致（Refined）

创新（Innovative）

品牌声音

标题示例："探索 32 个顶级设计系统" 而非 "欢迎来到我们的网站"

CTA 示例："深入探索" 而非 "点击这里"

微文案：简洁、有品味、暗示高级感

Logo 与标识

Logo：简洁的几何符号，代表"D"与"DNA"的融合，采用渐变紫色

Favicon：同 Logo 设计

签名品牌色

渐变紫色：从 #7C3AED 到 #A78BFA，象征设计的创意与精致

样式决策

响应式设计

移动端（\<640px）：1 列布局，全宽卡片

平板端（640-1024px）：2 列布局

桌面端（\>1024px）：3 列布局

无障碍性

所有交互元素都有清晰的焦点状态

颜色对比度满足 WCAG AA 标准

支持键盘导航

性能优化

图片懒加载

虚拟滚动（如果方案数量很大）

CSS 动画优化（仅使用 transform 和 opacity）

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://desig-dna.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a1f98215-8235-489b-8852-1d8091b470fc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
