---
layout: home
title: 首页
tabs: true
---

这里用来放你的文章、视频和项目记录。首页按页签做了简单分类，方便招聘方快速了解你的知识体系和作品内容。

<section class="index-tabs" data-tabs>
  <div class="tab-list" role="tablist" aria-label="分类索引">
    {% for tab in site.data.index %}
      <button
        class="tab-button{% if forloop.first %} is-active{% endif %}"
        type="button"
        role="tab"
        aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
        data-tab-target="{{ tab.id }}"
      >
        {{ tab.title }}
      </button>
    {% endfor %}
  </div>

  {% for tab in site.data.index %}
    <section
      class="tab-panel{% if forloop.first %} is-active{% endif %}"
      data-tab-panel="{{ tab.id }}"
      {% unless forloop.first %}hidden{% endunless %}
    >
      <div class="tab-panel-header">
        <h2>{{ tab.title }}</h2>
        <p>{{ tab.description }}</p>
      </div>

      {% if tab.posts %}
        {% if site.posts.size > 0 %}
          <ul class="index-list">
            {% for post in site.posts limit:5 %}
              <li>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                {% if post.description %}
                  <p>{{ post.description }}</p>
                {% endif %}
              </li>
            {% endfor %}
          </ul>
        {% else %}
          <p>还没有文章。</p>
        {% endif %}
      {% else %}
        <ul class="index-list">
          {% for item in tab.items %}
            <li>
              <a href="{{ item.link | relative_url }}">{{ item.title }}</a>
              <span>{{ item.meta }}</span>
              <p>{{ item.description }}</p>
            </li>
          {% endfor %}
        </ul>
      {% endif %}
    </section>
  {% endfor %}
</section>

## 维护方式

分类索引内容在 `_data/index.yml` 里维护；文章继续放在 `_posts/`，视频继续放在 `assets/videos/` 并在 [视频]({{ "/videos/" | relative_url }}) 页面引用。
