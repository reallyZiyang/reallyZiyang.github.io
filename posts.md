---
layout: page
title: 文章
permalink: /posts/
---

<section class="series-index">
  {% for series in site.data.series %}
    {% assign series_posts = site.posts | where: "series", series.id | sort: "series_order" %}
    <div class="series-block">
      <h2>{{ series.title }}</h2>
      <p>{{ series.description }}</p>
      {% if series_posts.size > 0 %}
        <ol class="series-post-list">
          {% for post in series_posts %}
            <li>
              <span>{{ post.series_order | prepend: "00" | slice: -2, 2 }}</span>
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </li>
          {% endfor %}
        </ol>
      {% else %}
        <p class="empty-note">暂未发布。</p>
      {% endif %}
    </div>
  {% endfor %}
</section>

## 全部文章

{% if site.posts.size > 0 %}
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% if post.description %}
          <p>{{ post.description }}</p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
{% else %}
  还没有文章。
{% endif %}
