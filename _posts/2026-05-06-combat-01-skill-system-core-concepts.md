---
layout: post
title: "战斗 01：技能系统的底层概念"
short_title: "技能系统的底层概念"
description: "从底层概念上理解技能系统：Skill 和 Buff 作为触发 Effect 的载体，Effect 作用于 Unit。"
series: combat
series_title: 战斗系列
series_order: 1
---

## 先给结论

技能系统可以抽象为：

> Skill 和 Buff 是触发 Effect 的载体，Effect 作用于 Unit。

这句话可以拆成四个概念：

<div class="concept-grid">
  <div>
    <strong>Skill</strong>
    <span>流程</span>
    <p>描述一次主动行为从释放到结束的过程。</p>
  </div>
  <div>
    <strong>Buff</strong>
    <span>状态</span>
    <p>描述一个持续存在、可以定时或按事件触发的状态。</p>
  </div>
  <div>
    <strong>Effect</strong>
    <span>结果</span>
    <p>描述一次具体效果，比如伤害、回血、加 Buff。</p>
  </div>
  <div>
    <strong>Unit</strong>
    <span>对象</span>
    <p>描述战场中的释放者、拥有者、目标或承受者。</p>
  </div>
</div>

它们之间的关系可以简化成：

```text
Skill / Buff
  -> 触发 Effect
  -> Effect 作用于 Unit
  -> Unit 的属性、状态或表现发生变化
```

## 前言

在做战斗系统时，技能很容易被理解成一个按钮、一段动画、一个特效，或者一次伤害结算。

但从底层设计上看，技能系统可以拆成几个核心概念：

- Skill：一次主动流程
- Buff：一个持续状态
- Effect：一次具体效果
- Unit：战斗中的作用对象

这套拆分的重点是：

> Skill 和 Buff 不直接等于结果，它们更像是触发 Effect 的载体；Effect 才是真正产生结果的地方，而 Unit 是这些结果作用的对象。

## Skill：一次主动流程

Skill 偏主动，更像是一次从释放到结束的流程描述。

一个 Skill 通常会包含：

- 释放者是谁
- 是否满足释放条件
- 是否需要消耗资源
- 是否进入冷却
- 播放什么动作
- 在什么时机触发效果
- 目标是谁
- 技能什么时候结束

比如一个“挥剑产生剑气”的技能，可以拆成：

```text
释放技能
-> 播放挥剑动作
-> 在指定时间点生成剑气
-> 剑气命中目标
-> 触发伤害 Effect
-> 技能结束
```

再比如一个“瞬移到目标身后攻击”的技能，可以拆成：

```text
判断目标是否合法
-> 瞬移到目标身后
-> 播放攻击动作
-> 触发伤害或控制 Effect
-> 回到后续状态
```

所以 Skill 的重点不是“造成了什么结果”，而是“如何组织这次行为流程”。

## Buff：一个持续状态

Buff 偏被动，更像是一个带生命周期的状态。

一个 Buff 通常会包含：

- 什么时候添加
- 持续多久
- 什么时候移除
- 是否周期触发
- 是否监听某些事件
- 触发哪些 Effect

例如中毒 Buff：

```text
添加中毒
-> 持续 5 秒
-> 每 1 秒触发一次伤害 Effect
-> 时间结束后移除
```

例如护盾 Buff：

```text
添加护盾
-> 监听受到伤害事件
-> 抵消一部分伤害
-> 护盾值耗尽后移除
```

Buff 和 Skill 的区别不在于有没有效果，而在于它们描述的东西不同：

```text
Skill 偏一次主动流程
Buff 偏持续存在的状态
```

## Effect：一次具体效果

Effect 是技能系统里最值得拆出来的概念。

它表示一次具体、明确、可复用的结果，例如：

- 造成伤害
- 回复生命
- 修改属性
- 添加 Buff
- 移除 Buff
- 击退目标
- 召唤单位
- 发射抛射物

拆出 Effect 的好处是复用。

同一个伤害 Effect，可以被普攻触发，也可以被技能触发，还可以被 Buff、陷阱、装备效果触发。

例如：

```text
普通攻击 -> 触发伤害 Effect
火球术命中 -> 触发伤害 Effect
中毒 Buff 每秒 -> 触发伤害 Effect
陷阱触发 -> 触发伤害 Effect
```

如果 Skill 和 Buff 直接写死具体结果，系统会越来越难扩展。
而把 Effect 拆出来后，Skill 和 Buff 只需要负责“什么时候触发”，具体结果交给 Effect 执行。

## Unit：战斗单位

这里的 Unit 指战斗系统中的战场对象，不只是英雄或怪物。

它可以包括：

- 英雄
- 怪物
- 小兵
- 宠物
- 召唤物
- 机关
- 陷阱
- 抛射物

在技能系统里，Unit 可能是：

- Skill 的释放者
- Buff 的拥有者
- Effect 的来源
- Effect 的目标
- Effect 的承受者

也就是说，Unit 是 Skill、Buff、Effect 之间发生关系的对象基础。

## 概念关系

一个比较清晰的技能系统，可以简化成：

```text
Skill / Buff 负责触发
Effect 负责产生结果
Unit 负责承载和接收结果
```

Skill 和 Buff 是不同类型的触发载体。

Skill 更偏主动流程，例如释放技能、播放动作、命中目标。
Buff 更偏持续状态，例如周期触发、监听事件、修改属性。

Effect 则是最终产生战斗结果的地方。

在这套抽象下，很多战斗内容都可以放进同一套模型里：

```text
普攻是一个简单 Skill
主动技能是一个复杂 Skill
持续伤害是 Buff 周期触发伤害 Effect
被动技能可以是 Buff 监听事件后触发 Effect
装备效果也可以是 Buff 或规则触发 Effect
```

## 总结

技能系统表面上包含按钮、动作、特效、伤害、Buff、数值和状态，看起来很复杂。

但从底层概念上看，可以先抓住四个核心对象：

```text
Skill：流程
Buff：状态
Effect：结果
Unit：对象
```

其中最关键的一点是：

> 将 Effect 拆分出来，让 Skill 和 Buff 成为触发 Effect 的载体，而不是把所有结果都写死在 Skill 或 Buff 里。

这样做能让技能系统更容易复用、扩展和维护，也更方便后续处理普攻、主动技能、被动技能、持续效果、装备效果等不同战斗需求。
