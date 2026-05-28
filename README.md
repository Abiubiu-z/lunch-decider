# 中午吃什么

帮你随机决定午餐的纯前端单页应用：171 道菜品、多维筛选、转盘抽奖、礼花动效。

## 运行

```bash
npm install
npm run dev
```

浏览器打开终端显示的地址（一般为 http://localhost:5173）。

## 构建

```bash
npm run build
npm run preview
```

## 技术栈

- Vite + TypeScript
- 原生 HTML / CSS / Canvas（无 React/Vue）

## 目录说明

| 目录 | 说明 |
|------|------|
| `src/data/menu.ts` | 菜品数据，可自行扩充 |
| `src/lib/` | 筛选、随机、本地记录、礼花动效 |
| `src/components/` | 转盘、结果卡片 |
