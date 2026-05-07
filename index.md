---
layout: home
title: 首页
---

<section class="intro-panel">
  <p>这里主要记录游戏开发相关经验，内容会集中在战斗、SDK 接入、框架设计和 AI 工具使用等方向。文章更偏总结和思路提炼，重点整理概念抽象、设计取舍和系统边界，不会过度展开细节实现。</p>
</section>

<section class="section-heading">
  <h2>系列文章</h2>
</section>

<section class="series-list" aria-label="系列文章">
  {% for series in site.data.series %}
    {% assign series_posts = site.posts | where: "series", series.id | sort: "series_order" %}
    <article class="series-card">
      <div class="series-card-header">
        <h3>{{ series.title }}</h3>
        <span>{{ series_posts.size }} 篇</span>
      </div>
      <p>{{ series.description }}</p>
      {% if series_posts.size > 0 %}
        <ol>
          {% for post in series_posts %}
            <li>
              <a href="{{ post.url | relative_url }}">
                {{ post.series_order | prepend: "00" | slice: -2, 2 }}. {{ post.short_title | default: post.title }}
              </a>
            </li>
          {% endfor %}
        </ol>
      {% else %}
        <p class="empty-note">暂未发布。</p>
      {% endif %}
    </article>
  {% endfor %}
</section>

<section class="section-heading">
  <h2>文章列表</h2>
  <a href="{{ '/posts/' | relative_url }}">查看全部</a>
</section>

{% if site.posts.size > 0 %}
  <ol class="article-list">
    {% for post in site.posts limit:8 %}
      <li class="article-item">
        <div>
          {% if post.series_title %}
            <span class="article-tag">{{ post.series_title }} {{ post.series_order | prepend: "00" | slice: -2, 2 }}</span>
          {% endif %}
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
    <span>游戏项目演示、功能讲解和作品视频</span>
  </a>
  <a href="{{ '/about/' | relative_url }}">
    <strong>关于我</strong>
    <span>游戏开发方向、技术栈和联系方式</span>
  </a>
</section>
