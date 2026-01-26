---
permalink: p/3/
title: 有关微软MFA的一些解决办法
date: 2026-01-10 21:47:39
tags: [微软, MFA]
categories: [吐槽, 一些解决方法]
description: 当MFA出错时，我哈气了
---
## 前言
前段时间给自己的E5全局管理员账户上了把锁（MFA），想着说安全性提高了，由于Microsoft Authenticator神一样的逻辑，锁的钥匙被我搞丢了
每次登录都需要验证码，但是验证器又用不了，直接就无限循环

{% note success %}
后来我还是在M365 Admin里咨询了一下，才了解到解决方法，但是好像得提前有另一个全局管理员权限的账户![1.jpg](https://roc.us.ci/file/blog/3/1.jpg)
{% endnote %}

## 正文
用（另一个）全局管理员账户登录 [Microsoft Entra](https://entra.microsoft.com)，然后找到侧边栏 `Entra ID`-->`用户`，在右边选择要操作的账户，点其对应的显示名称![2.jpg](https://roc.us.ci/file/blog/3/2.jpg)
再点侧边栏`身份验证方法`，你就能看到`需要重新注册多重身份验证`的按钮，点它![3.jpg](https://roc.us.ci/file/blog/3/3.jpg)

此时登录刚才操作过的账号，随便一个登录页面都行，
当你输完密码确定以后，就会跳转到一个页面，此时你就可以跟着引导重新设置MFA啦🎉

## 结尾
为什么说“由于微软验证器的神一样的逻辑”呢？🤔

如果你是事先在设置中打开了备份，没错，你的数据的确会被备份到☁️，但是！
要在第二台手机上登录时恢复这个备份，你可不能点亮眼的{% label 大按钮 blue %}，点了{% label warning@那就遭啦！ %}

得点下面小字`从备份恢复`，这才是{% label success@正确的步骤 %}![4.png](https://roc.us.ci/file/blog/3/4.png)

{% note warning %}
如果你真的直接点`通过 Microsoft 登录`，那么你们备份就会被**覆盖**，你可以用之前登录的那台手机重新创建备份，那要是没有呢…就只能哈气了
{% endnote %}