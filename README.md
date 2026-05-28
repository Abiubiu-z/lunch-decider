# 中午吃什么

帮你随机决定午餐的纯前端单页应用：171 道菜品、多维筛选、转盘抽奖、礼花动效。

## 在线访问（手机推荐）

部署完成后，手机浏览器直接打开：

**https://abiubiu-z.github.io/lunch-decider/**

（需电脑与 GitHub 已推送最新代码，Actions 部署成功）

## 本地运行

```bash
npm install
npm run dev
```

终端会显示两行地址：

- `Local:` — 仅本机可用（**手机不要填 localhost**）
- `Network:` — 同一 WiFi 下手机可访问，例如 `http://192.168.1.5:5173`

### 手机连本地开发服务器

1. 电脑、手机连接**同一 WiFi**
2. 电脑运行 `npm run dev`
3. 在手机浏览器输入终端里的 **Network** 地址（不是 localhost）
4. 若仍打不开，检查 Windows 防火墙是否放行 Node/Vite

## 构建

```bash
npm run build
npm run preview -- --host
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
