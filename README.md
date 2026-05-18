# 果宝特攻桌面宠物（Electron + React + TypeScript + Live2D）

这是一个桌宠项目脚手架，主题是《果宝特攻》中的水果角色。

## 功能

- Electron 透明无边框窗口，常驻桌面顶层
- React + TypeScript UI
- Live2D 模型加载（基于 Pixi + pixi-live2d-display）
- 一键切换角色：橙留香 / 菠萝吹雪 / 陆小果

## 快速开始

```bash
npm install
npm run dev
```

## 模型资源说明

请将你合法拥有使用权的 Live2D 模型文件放到：

`public/live2d/fruits/`

并使用以下文件名：

- `chengliuxiang.model3.json`
- `boluochuixue.model3.json`
- `luxiaoguo.model3.json`

## 构建

```bash
npm run build
```


## 打包 EXE（Windows）

```bash
npm install
npm run dist:win
```

输出目录：`release/`，会同时生成：

- 安装版：`DeskPet Setup *.exe`（NSIS）
- 便携版：`DeskPet *.exe`（Portable）


## 启动后看不到界面？

- 如果你直接运行 `electron .`，且本地没有启动 Vite，应用会自动回退加载 `dist/index.html`。
- 如果看得到面板但看不到宠物，说明模型文件缺失。请确认 `public/live2d/fruits/` 下存在：
  - `chengliuxiang.model3.json`
  - `boluochuixue.model3.json`
  - `luxiaoguo.model3.json`
- 应用内会显示“模型加载失败”提示，便于定位缺失模型。
输出目录：`release/`，可直接获得 Windows 安装包（`.exe`）。
