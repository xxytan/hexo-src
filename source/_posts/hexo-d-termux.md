---
permalink: p/1/
title: 用Termux部署Hexo
date: 2025-08-15 09:44:03
tags: [Termux, Hexo]
categories: [安卓, Termux, Hexo]
description: 轻松使用Termux部署一个属于自己的博客
---
## 前言
此篇文章结合网络上的方法已经我个人的一些经验撰写，可能有些许不足，请谅解
桌面端的同志仅终端不一样，其他过程都大差不差

## 安装Termux
- 可以使用 {% btn https://github.com/termux/termux-app/releases/latest, 官方Termux %}
- 或第三方的类似于 {% btn https://github.com/hanxinhao000/ZeroTermux/releases/latest, Zero Termux %} （以此做演示）

> [!WARNING]
如果您是非ROOT用户，**<u>强烈建议您使用ZeroTermux进行下列步骤</u>**，否则后期编辑配置文件会很困难（当然你如果要是会命令行编辑，用官方版也行）

打开后跟着向导，授予基本权限，然后我们就可以开始

### 换源
> 目的提高国内网络环境下载速度

在命令框输入
``` bash
termux-change-repo
```
并回车，此时会出现![1.这样的界面](https://roc.us.ci/file/blog/1/1.png)

使用**右下角的方向按钮**操控，选择第二个选项，便会出现![2.这样的界面](https://roc.us.ci/file/blog/1/2.png)
选带有`tuna`[^1]的空格并回车，等待它自动更新软件包库

## 安装Node.js[^2]
输入
``` bash
pkg install nodejs-lts -y
```
等待进程跑完，然后继续

## 部署Hexo框架及测试

### 部署
输入
``` bash
npm i hexo-cli -g
```
安装Hexo框架，然后再输入
``` bash
cd ..
```
回到上一级目录，接着再输入
``` bash
hexo init <folder>
```
> `<folder>`[^3]即文件夹名，本教程以`blog`为例

运行结束后`/data/data/com.termux/files/`下就会有一个名为`blog`的文件夹，这个文件夹就储存着Hexo的必备文件了

{% note warning no-icon Q&A %}
?: 在`/sdcard`部署不是更方便吗
!: 若在`/sdcard`下部署，安装依赖时会提示权限不足，从而无法进行后续步骤![就像这样](https://roc.us.ci/file/blog/1/6(1).png)
{% endnote %}

#### 用户差异

{% tabs 如果您是 %}

<!-- tab ROOT用户 -->
您可以直接使用MT管理器访问 `/data/data/com.termux/files/blog`来快速查看和编辑配置文件
<!-- endtab -->

<!-- tab 非ROOT用户 -->
您就无法直接访问`blog`文件夹，此时您就可以在ZeroTermux的设置中![3.通过向右划或按音量➕打开该菜单](https://roc.us.ci/file/blog/1/3.png)
依次点击`安装/还原Termux官方软件`--`(Zero)Utermux File Plug`--`确定`，稍等片刻便会开始安装质感文件
安装完成后打开，点击左上角三横线，你就会看到`访问Utermux文件`![4.e.g](https://roc.us.ci/file/blog/1/4.jpg)
点它你就能看到`blog`文件夹，这样就能查看和编辑配置文件了
<!-- endtab -->

{% endtabs %}

### 测试
输入
``` bash
hexo s
```
运行后[本地4000端口](http://localhost:4000)会映射出内容，在浏览器中打开它，不出所料，你就能看到![5.这样的页面](https://roc.us.ci/file/blog/1/5.png)
这就说明你的**Hexo已经部署成功了！**

## 常用的操作命令[^4]
|命令|注释|
|-|-|
|hexo s|映射本地预览网页，端口4000|
|hexo g|以当前配置生成文件，生成在`./public`下|
|hexo d[^5]|部署到远程仓库|
|hexo cl|清理先前生成的文件|
|hexo n post ~|新建文章，`~`即文章名字，生成在`./source/_posts`下|
|hexo n draft ~|新建草稿，`~`即草稿名字，生成在`./source/_drafts`下|
|hexo n page ~|生成页面，`~`即页面名字，生成友链和关于等页面会用到|
|hexo p ~|发布草稿为文章，`~`即要发布的草稿名字|

## 结尾
- 由于各个主题之间的差异，在此不对安装主题做任何讲解，具体请查看官方文档或查阅资料

[^1]: 清华大学源。也可自行选择其他国内镜像源
[^2]: 安装的是长期版。也可通过以下命令安装稳定版：
    ``` bash
    pkg install nodejs
    ```
[^3]: 不得使用**中文**、**Emoji**等其他非法字符
[^4]: 均为缩写命令，具体请参阅[官方文档](https://hexo.io/zh-cn/docs/commands)
[^5]: 需借助`hexo-deployer-git`，具体请参阅[官方文档](https://hexo.io/zh-cn/docs/one-command-deployment#Git)