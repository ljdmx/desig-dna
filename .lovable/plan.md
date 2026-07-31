## 目标

把上传的 `Premium_Web_Design_DNA_Library™ v7.0`（32 个设计方案）做成一个沉浸式数字美术馆风格的展示网站。JSON 数据原样使用，不做任何修改。

## 数据

- 上传的 JSON 原封不动放入 `src/data/design-library.json`（内容一字不改），通过类型化模块读取。
- 已确认每个方案字段：`id / name / design_philosophy / design_keywords[] / visual_positioning / color_system(8) / material_language(4) / layout_system(5) / typography_system(5) / motion_system(4) / image_direction(4) / ui_elements(4) / experience_scene / premium_score(5)`。

## 页面结构

```
/            首屏（大标题 + 搜索 + 关键词筛选）+ 32 方案网格
/design/$id  方案详情：全屏沉浸式，左侧章节导航 + 各字段分区
```

- 网格：移动 1 列 / 平板 2 列 / 桌面 3 列，卡片显示编号、中英文名、色卡条、前 3 个关键词、premium overall 分。
- 详情页分区：设计哲学、色彩体系、材质语言、布局系统、排版系统、动效系统、影像方向、UI 元素、体验场景、评分。

## 三种复制能力（核心）

每个方案详情页顶部固定操作条，卡片悬停时也提供快捷复制：

1. **复制 Markdown**：把该方案完整字段渲染成结构化 Markdown（标题、分节、列表、色值表）。
2. **复制 JSON**：输出该方案在原 JSON 中的对象，`JSON.stringify(obj, null, 2)`，与源文件完全一致，不增删字段。
3. **一键复制全部色值**：输出该方案 `color_system` 的全部色值（含 lighting 描述），格式为 `primary: #161616` 逐行，另提供 hex 列表形式。

复制均用 Clipboard API + sonner Toast 提示 + 按钮图标短暂变勾。

## 视觉与动效

- 背景 `#0A0A0A`，表面 `#1A1A1A` / `#2A2A2A`，文字 `#F5F5F5`，强调渐变紫 `#7C3AED → #A78BFA`；全部写成 `src/styles.css` 的 oklch 语义 token，深色为默认，浅色模式为反转主题，切换 400ms 平滑过渡。
- 字体：Poppins（标题）+ Inter（正文），通过 `__root.tsx` 的 `<link>` 加载；标题 32–48px，正文 14–16px，行距 1.6/1.4。
- 签名元素：卡片悬停光晕 + Y 轴 -4px（200ms）、渐变分割线、浮动关键词标签、入场淡入上移 300ms、详情弹层背景模糊缩放 350ms；动画只用 transform/opacity。

## 技术细节

- TanStack Start 路由：重写 `src/routes/index.tsx`，新增 `src/routes/design.$id.tsx`，每页各自 `head()` SEO。
- 组件：`DesignCard`、`CopyButton`、`ColorSwatchRow`、`ThemeToggle`、`SectionBlock`；工具 `src/lib/export.ts`（Markdown/JSON/色值序列化）。
- Logo/Favicon：渐变紫「D/DNA」几何符号。
- 无障碍：焦点环、键盘可达、WCAG AA 对比度。
- 纯前端，无需后端。
