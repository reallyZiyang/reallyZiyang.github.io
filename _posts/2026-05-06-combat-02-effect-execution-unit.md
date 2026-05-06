---
layout: post
title: "战斗 02：Effect 的设计思路"
short_title: "Effect 的设计思路"
description: "Effect 可以看作技能系统中最小的效果执行单元：接收上下文，对上下文中的对象执行一次具体逻辑。"
series: combat
series_title: 战斗系列
series_order: 2
---

## 先给结论

Effect 可以看作技能系统中最小的效果执行单元。

它不负责技能流程，也不负责 Buff 生命周期，而是被 Skill、Buff、装备、陷阱等载体持有，并在合适的时机被触发执行。

Effect 只关心一件事：

> 接收上下文，对上下文中的对象执行一次明确的战斗逻辑。

常见的 Effect 包括：

- 造成伤害
- 回复生命
- 添加 Buff
- 移除 Buff
- 修改属性
- 生成抛射物
- 击退目标

## Effect 的定位

在技能系统里，Skill 和 Buff 更像触发载体，Effect 才是真正产生结果的执行单元。

例如一个技能命中目标后触发伤害：

```text
Skill 命中目标
-> 触发 DamageEffect
-> DamageEffect 接收上下文
-> 对上下文中的目标扣血
```

这里 Skill 负责组织流程，例如释放、动作、命中和结束；DamageEffect 只负责执行伤害结果。

这种拆分的好处是：效果逻辑不被写死在某一个技能或 Buff 里，而是可以被多个载体复用。

## 特点一：不持有运行时状态

Effect 应该尽量不持有运行时战斗状态。

它执行所需的信息，应该来自外部传入的上下文，例如：

- 释放者
- 目标
- 技能等级
- 效果参数
- 命中信息
- 伤害来源
- 战斗环境

Effect 接收到上下文后，只对上下文中的对象执行特定逻辑。

例如 DamageEffect 不需要知道自己来自哪个 Skill，也不需要知道技能动画播放到哪一帧。它只需要知道：

```text
谁造成伤害
谁承受伤害
伤害数值或计算参数是什么
```

然后完成扣血逻辑即可。

这里的“无状态”更准确地说，是不持有运行时状态。Effect 仍然可以有配置数据，例如伤害类型、倍率、BuffId、持续时间等。

## 特点二：独立

Effect 应该尽量独立于 Skill 和 Buff。

它不关心自己是被谁持有，也不关心自己是在什么流程里触发的。

同一个 DamageEffect 可以被很多地方复用：

```text
普攻命中 -> DamageEffect
技能命中 -> DamageEffect
中毒 Buff 每秒触发 -> DamageEffect
陷阱触发 -> DamageEffect
装备被动触发 -> DamageEffect
```

Effect 被其他载体持有和控制执行，但它本身不反向依赖这些载体。

也就是说，Skill、Buff、装备、陷阱可以决定什么时候触发 Effect，但 Effect 不应该依赖某一个具体 Skill 或 Buff 才能运行。

## 特点三：一次性执行

Effect 更像一次执行动作。

它被触发后，根据上下文执行一次逻辑，执行完成后就结束。

这和 Buff 不同。Buff 是持续存在的状态，而 Effect 是一次性的执行结果。

例如：

```text
AddBuffEffect 执行一次后，会给目标添加一个 Buff
但 AddBuffEffect 本身不会持续存在
真正持续存在的是被添加到目标身上的 Buff
```

这个边界很重要。

如果一个效果需要持续存在、定时触发、监听事件或在未来某个时机移除，那它更适合被建模为 Buff，而不是 Effect。

## 和 Command 的关系

从设计模式角度看，Effect 和 Command 有相似之处。

它们都把一次操作封装成一个可执行对象：

```text
DamageEffect.Execute(context)
HealEffect.Execute(context)
AddBuffEffect.Execute(context)
```

但 Effect 和完整的 Command 也不完全一样。

Command 通常可能包含撤销、重做、队列等能力，而 Effect 更关注战斗中的一次效果执行。

因此可以说：

> Effect 类似 Command，但通常只需要 Execute，不需要 Undo。

## 示例

一个伤害 Effect 可以抽象成：

```csharp
public interface IEffect
{
    void Execute(EffectContext context);
}

public class DamageEffect : IEffect
{
    public void Execute(EffectContext context)
    {
        var source = context.Source;
        var target = context.Target;
        var damage = context.GetValue("damage");

        target.Hp -= damage;
    }
}
```

这里的 DamageEffect 不关心：

- 来自哪个技能
- 来自哪个 Buff
- 由谁控制触发时机
- 动画播放到了哪一帧
- 特效是否已经播放

它只关心上下文中有没有执行伤害所需的数据。

## 总结

Effect 的核心价值在于拆分和复用。

如果把伤害、回血、加 Buff 等逻辑都写死在 Skill 或 Buff 里，系统会快速变得臃肿。

而把 Effect 抽出来后，Skill 和 Buff 只负责控制触发时机，Effect 负责执行具体结果。

关系可以概括为：

```text
Skill / Buff / 装备 / 陷阱
  -> 持有并触发 Effect
  -> Effect 接收 Context
  -> 对 Context 中的目标执行一次具体逻辑
```

因此，Effect 可以被理解为：

> 一个不持有运行时状态、独立、一次性的最小效果执行单元。
