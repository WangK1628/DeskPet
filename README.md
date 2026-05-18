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
