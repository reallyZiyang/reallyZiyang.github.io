---
layout: home
title: 首页
---

<section class="intro-panel">
  <p>我主要面向 Unity 前端开发岗位，文章会集中记录战斗、SDK 接入、框架设计和 AI 工具使用经验。内容尽量偏实战，重点写清楚问题背景、实现思路、踩坑过程和最终结果。</p>
</section>

<section class="section-heading">
  <h2>文章方向</h2>
</section>

<section class="topic-list" aria-label="文章方向">
  {% for topic in site.data.topics %}
    <article class="topic-item">
      <span>{{ topic.meta }}</span>
      <h3>{{ topic.title }}</h3>
      <p>{{ topic.description }}</p>
    </article>
  {% endfor %}
</section>

<section class="section-heading">
  <h2>最新文章</h2>
  <a href="{{ '/posts/' | relative_url }}">查看全部</a>
</section>

{% if site.posts.size > 0 %}
  <ol class="article-list">
    {% for post in site.posts limit:8 %}
      <li class="article-item">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
        <div>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}
            <p>{{ post.description }}</p>
          {% endif %}
        </div>
      </li>
    {% endfor %}
  </ol>
{% else %}
  <p>还没有文章。</p>
{% endif %}

<section class="quick-links" aria-label="其他内容">
  <a href="{{ '/videos/' | relative_url }}">
    <strong>视频展示</strong>
    <span>Unity 项目演示、功能讲解和作品视频</span>
  </a>
  <a href="{{ '/about/' | relative_url }}">
    <strong>关于我</strong>
    <span>Unity 前端方向、技术栈和联系方式</span>
  </a>
</section>
