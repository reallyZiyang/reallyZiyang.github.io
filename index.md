---
layout: home
title: 首页
---

这里用来放你的文章、视频和项目记录。适合求职时给招聘方快速了解你做过什么、会什么、如何表达技术思路。

## 推荐放这些内容

- 项目总结：项目背景、你负责的部分、技术栈、难点和结果
- 技术文章：学习笔记、踩坑记录、源码阅读、问题复盘
- 视频演示：项目运行效果、功能讲解、作品展示

## 最近文章

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url | relative_url }}) <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
{% endfor %}

## 视频展示

视频可以直接放在 `assets/videos/` 目录里，然后在 [视频]({{ "/videos/" | relative_url }}) 页面引用。
