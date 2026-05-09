# 游戏开发个人博客

这是一个最简单的 GitHub Pages + Jekyll 博客模板，适合放游戏开发技术文章和视频。

## 文件说明

- `index.md`：首页
- `posts.md`：文章列表
- `videos.md`：视频页面
- `_posts/`：文章目录
- `assets/videos/`：视频文件目录
- `assets/css/style.css`：自定义样式
- `_data/topics.yml`：首页文章方向

## 写文章

在 `_posts/` 目录中新建 Markdown 文件，文件名格式：

```text
年-月-日-英文标题.md
```

例如：

```text
2026-05-06-my-project.md
```

文章开头需要包含：

```markdown
---
layout: post
title: "文章标题"
description: "文章简介"
---
```

## 添加视频

把 `.mp4` 文件放到：

```text
assets/videos/
```

然后在 `videos.md` 里添加：

```html
<video controls preload="metadata" width="100%">
  <source src="{{ '/assets/videos/your-video.mp4' | relative_url }}" type="video/mp4">
</video>
```

小视频可以直接上传到 GitHub 仓库。建议控制在几十 MB 以内：

- 通过 GitHub 网页上传时，单个文件通常不能超过 `25 MiB`
- 通过 Git 命令推送时，超过 `50 MiB` 会收到警告
- 单个文件超过 `100 MiB` 会被 GitHub 阻止

Git LFS 不适合 GitHub Pages 站点使用。文件变多或变大时，建议改用 B 站、YouTube、网盘或对象存储，再在博客中放链接。

## 本地预览

如果本机已经安装 Ruby 和 Jekyll，在当前目录运行：

```powershell
jekyll serve
```

然后打开：

```text
http://127.0.0.1:4000/
```

## 发布到 GitHub Pages

1. 新建 GitHub 仓库，仓库名建议使用 `你的用户名.github.io`
2. 把这些文件提交并推送到仓库
3. 在 GitHub 仓库设置里打开 Pages
4. 等待部署完成后访问 `https://你的用户名.github.io`
