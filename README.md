# Design DNA Library

> 沉浸式数字设计系统展示平台 — 收录 **52** 个顶级 Web 设计方案，每个方案都是一件可被探索的数字艺术品。

**Live Demo**: https://desig-dna.lovable.app

---

## 功能特性

- **52 个顶级设计系统** — 覆盖色彩、材质、排版、动效、影像等完整设计维度
- **智能搜索与筛选** — 支持按关键词、名称、设计哲学实时搜索
- **一键复制导出** — Markdown 方案 / JSON 源码 / 全部色值，随时取用
- **时间色彩系统** — 部分方案支持晨、午、昏、夜四时动态色彩展示
- **深浅主题切换** — 深色沉浸模式与浅色阅读模式一键切换
- **响应式布局** — 移动端 1 列 / 平板 2 列 / 桌面 3 列自适应
- **高级交互体验** — 卡片悬停光晕、平滑入场动画、Toast 复制反馈

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 路由 / SSR | TanStack Router + TanStack Start |
| 样式 | Tailwind CSS v4 |
| 组件库 | shadcn/ui + Radix UI |
| 构建工具 | Vite 8 |
| 图标 | Lucide React |
| 通知 | Sonner |

---

## 项目结构

```
desig-dna/
├── public/
│   └── favicon.svg              # 品牌图标
├── src/
│   ├── routes/
│   │   ├── index.tsx            # 首页：卡片列表 + 搜索筛选
│   │   ├── design.$id.tsx       # 详情页：完整设计系统展示
│   │   └── __root.tsx           # 根布局 + 主题 / 错误边界
│   ├── components/
│   │   ├── DesignCard.tsx       # 方案卡片
│   │   ├── ColorSwatchRow.tsx   # 色块预览
│   │   ├── CopyButton.tsx       # 复制按钮
│   │   ├── SectionBlock.tsx     # 详情页内容区块
│   │   └── ui/                  # shadcn/ui 组件
│   ├── data/
│   │   ├── design-library.json  # 52 个方案数据源（只读）
│   │   └── library.ts           # 数据类型与工具函数
│   ├── lib/
│   │   ├── export.ts            # Markdown / JSON / 色值导出
│   │   └── utils.ts             # 通用工具
│   ├── styles.css               # 全局样式 + Tailwind
│   └── router.tsx               # 路由配置
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 数据结构

每个设计系统包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识，如 `PVEO-001` |
| `name` | `string` | 方案名称 |
| `design_philosophy` | `string` | 设计哲学 |
| `design_keywords` | `string[]` | 设计关键词 |
| `visual_positioning` | `string` | 视觉定位 |
| `color_system` | `object` | 色彩体系（含时间色彩系统） |
| `material_language` | `object` | 材质语言 |
| `layout_system` | `object` | 布局系统 |
| `typography_system` | `object` | 排版系统 |
| `motion_system` | `object` | 动效系统 |
| `image_direction` | `object` | 影像方向 |
| `ui_elements` | `object` | UI 元素 |
| `experience_scene` | `string` | 体验场景 |
| `premium_score` | `object` | 高级感评分 |

> ⚠️ `src/data/design-library.json` 为数据源文件，**请勿直接修改**。如有数据更新需求，请通过外部流程替换后重新构建。

---

## 本地开发

```sh
# 克隆仓库
git clone https://github.com/ljdmx/desig-dna.git
cd desig-dna

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

默认运行在 `http://localhost:8080`。

---

## 构建部署

```sh
# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

---

## 路由

| 路由 | 页面 |
|------|------|
| `/` | 首页 — 卡片网格、搜索、关键词筛选 |
| `/design/$id` | 详情页 — 完整设计系统展示、复制导出 |

---

## 品牌

- **Logo**: DNA 双螺旋几何符号，紫罗兰渐变（`#7C3AED → #A78BFA`）
- **Favicon**: `public/favicon.svg`
- **Slogan**: 为全球顶级设计师与品牌打造的高级设计系统展示平台

---

## License

本项目代码开源，设计系统数据版权归原创建者所有。

---

*Built with [Lovable](https://lovable.dev).*
