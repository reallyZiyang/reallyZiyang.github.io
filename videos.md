---
layout: page
title: 视频
permalink: /videos/
---

把视频文件放进 `assets/videos/` 目录，然后按下面的格式添加到这个页面。建议视频压到几十 MB 以内；如果文件较大，放到 B 站、YouTube、网盘或对象存储会更合适。

## 项目演示视频

还没有添加视频。

添加视频时，可以复制下面这段，把 `your-video.mp4` 改成实际文件名：

{% raw %}
```html
<div class="video-item">
  <h3>视频标题</h3>
  <p>这里写一两句话说明这个视频展示了什么。</p>
  <video controls preload="metadata" width="100%">
    <source src="{{ '/assets/videos/your-video.mp4' | relative_url }}" type="video/mp4">
    你的浏览器不支持 video 标签。
  </video>
</div>
```
{% endraw %}
