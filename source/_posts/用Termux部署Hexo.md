---
title: 用Termux部署Hexo
tags: [Termux, Hexo]
categories: [安卓, Termux]
cover: https://hexo.io/themes/screenshots/landscape.png
date: 2025-08-15 09:44:03
description: 轻松使用Termux部署一个属于自己的博客
sticky: 100
---
{% note simple %}
此篇文章结合网络上的方法已经我个人的一些经验撰写，可能有些许不足，请谅解
{% endnote %}

_正文开始_

------
## 安装并部署Termux环境

### 安装Termux
- 可以使用 {% btn 'https://github.com/termux/termux-app/releases/latest',官方的Termux,,blue outline %}
- 或第三方的类似于 {% btn 'https://github.com/hanxinhao000/ZeroTermux/releases/latest',Zero Termux,,green outline %} （以此做演示）

打开后授予权限，

{% note warning %}
如果您是非ROOT用户，**<u>强烈建议您使用ZeroTermux进行下列步骤</u>**，否则后期编辑配置文件会很困难（当然你如果要是会命令行编辑，用官方版也行）
{% endnote %}

### 换源
> 目的是在国内提高下载速度（挂着加速器可以无需进行此步）

在命令框输入
``` bash
termux-change-repo
```
并回车，此时会出现![1.这样的界面](https://img.mauz.top/file/blog/1/1.png)

{% note primary %}
_可以使用**右下角的方向按钮**操控，也可以直接用手点_
{% endnote %}

选择第二个选项，便会出现![2.这样的界面](https://img.mauz.top/file/blog/1/2.png)

{% note primary %}
_如果您英文很好，那么可以根据右边的注释来选择，_ 否则直接**选带有`tuna`字样**的，这是清华大学的镜像源
{% endnote %}

换完源之后，我们就可以
### 安装Node.js
在命令框输入
``` bash
pkg install
```
更新一下软件包库，然后再输入
``` bash
pkg install nodejs -y
```
**或者**
``` bash
pkg install nodejs-lts -y
```
{% note info %}
_这俩的区别就是一个是**稳定版**，一个是**长期版**_
{% endnote %}

等待进程跑完，然后继续
### 安装Git和OpenSSH
> 目的是为后面[将Hexo部署到Github Pages](#%E9%83%A8%E7%BD%B2Hexo%E5%88%B0Github-Pages)做准备

输入
``` bash
pkg install git&&openssh -y
```
进程跑完后然后就开始

####  配置Git
输入
``` bash
git config --global user.name '你的Github用户名'; git config --global user.email '你的Github绑定邮箱'
```
{% note default %}
没有Github账号请先[注册](https://github.com/signup)
{% endnote %}

#### 配置公钥
输入
``` bash
ssh-keygen -t rsa -C "你的Github绑定邮箱""
```
连续按三次回车，运行结束后再输入
``` bash
cat ~/.ssh/id_rsa.pub
```
把输出的内容全部复制保存，**后面会用到**

## 部署Hexo框架及测试

### 部署
先输入
``` bash
cd ..
```
切到上一级目录，再输入
``` bash
npm install hexo-cli -g
```
等待进程跑完，然后再输入
``` bash
hexo init blog
```
运行结束后`/data/data/com.termux/files/`下就会有一个名为`blog`的文件夹，这个文件夹就储存着Hexo的必备文件了
> 文件夹名称`blog`可以随意，但**不要是中文**

#### 如果您是

{% tabs 如果您是 %}

<!-- tab ROOT用户 -->
您可以直接使用MT管理器访问 `/data/data/com.termux/files/blog`来快速查看和编辑配置文件
<!-- endtab -->

<!-- tab 非ROOT用户 -->
您就无法直接访问`blog`文件夹，此时您就可以在ZeroTermux的设置中![3.通过向右划或按音量➕打开该菜单](https://img.mauz.top/file/blog/1/3.png)
依次点击`安装/还原Termux官方软件`--`(Zero)Utermux File Plug`--`确定`，稍等片刻便会开始安装质感文件
安装完成后打开，点击左上角三横线，你就会看到`访问Utermux文件`![4.e.g](https://img.mauz.top/file/blog/1/4.jpg)
点它你就能看到`blog`文件夹，这样就能查看和编辑配置文件了
<!-- endtab -->

{% endtabs %}

由于后续需要通过Git将Hexo部署到Github，所以我们还需要

#### 安装附加组件
先输入
``` bash
cd blog
```
进入`blog`文件夹，然后再输入
``` bash
npm install hexo-deployer-git
```
安装`hexo-deployer-git`

### 测试
输入
``` bash
hexo s
```
运行后[本地地址4000端口](http://localhost:4000)会映射出内容，在浏览器中打开它，不出所料，你就能看到![5.这样的页面](https://img.mauz.top/file/blog/1/5.png)
这就说明你的**Hexo已经部署成功了！**

<mark>下面是一些**常用的操作命令**</mark>

|命令|注释|
|-|-|
|hexo s|映射本地预览网页，端口4000|
|hexo g|以当前配置生成文件，生成在`*/public`下|
|hexo d|部署到远程仓库|
|hexo cl|清理先前生成的文件|
|hexo new post ~|新建文章，`~`即文章名字，生成在`*/source/_posts`下|
|hexo new draft ~|新建草稿，`~`即草稿名字，生成在`*/source/_drafts`下|
|hexo publish ~|发布草稿为文章，`~`即要发布的草稿名字|

{% note info %}
前四条命令均为缩写，具体请查看[官方文档](https://hexo.io/zh-cn/docs/)
{% endnote %}

{% note warning %}
由于各个主题之间的差异，在此不对安装主题做任何讲解，具体请查看官方文档或查阅资料
{% endnote %}

## 部署Hexo到Github Pages

{% note default %}
就是将博客部署在公网，只不过Github Pages在国内容易被墙，
当然后续也可以通过再次部署到Cloudflare Pages再[绑定域名](#绑定域名)来解决这个问题
{% endnote %}

### 配置
登录[Github](https://gtihub.com)，创建一个仓库，新账号的话主页会有一个`Create repository`，点它
仓库名称就填 你的用户名+`.github.io`![6.像这样](https://img.mauz.top/file/blog/1/6.png)
再点击`Create repository`创建仓库

接着打开账户设置，找到`SSH and GPG keys`![7.e.g](https://img.mauz.top/file/blog/1/7.png)
再按照下面👇的图片填![8.e.g](https://img.mauz.top/file/blog/1/8.png)
最后点`Add SSH key`添加公钥

然后我们回到Termux，输入
``` bash
ssh -T git@github.com
```
运行结束后如果出现类似于![9.这样](https://img.mauz.top/file/blog/1/9.png)
的提示，说明已经成功连接到Github了

接着，要修改一下Hexo的配置文件：
打开`*/_config.xml`，滑到最底部，添加以下内容：
``` yaml
deploy:
  type: git
  repo: git@github.com:你的Github用户名/你的Github用户名.github.io.git
  branch: main
```
然后保存，至此，我们的配置就搞定啦🎉

### 部署
返回Termux，输入
``` bash
hexo g -d
```
> 这是一个组合命令：创建并部署

静静等待，出现`done`提示后就说明文件已推送到仓库，然后稍微等待一会儿，再访问 你的用户名➕`.github.io` 就能正常访问博客啦😋![11.嘻嘻](https://img.mauz.top/file/blog/1/11.jpeg)

## 部署到Cloudflare Pages上

### 部署
登录[Cloudflare仪表盘](https://dash.cloudflare.com)，没有账号请先注册，
然后找到`计算 (Workers)`![12.这个](https://img.mauz.top/file/blog/1/12.png)
再点右上角的`创建`，然后选`Pages`--`导入现有的 Git 存储库`![13.开始使用🤨](https://img.mauz.top/file/blog/1/13.png)
下一个页面选`连接到 Github`，在跳转的页面授权一下

再返回来，选择自己相应的仓库，然后直接点`开始设置`![14.e.g](https://img.mauz.top/file/blog/1/14.png)
下一个页面，直接点`保持并部署`，静静的等待它部署完成😠

部署完成后会给你个链接（`xxx.pages.dev`），链接内容和前面部署到GitHub Pages的网页是一样的![15.哇欧！](https://img.mauz.top/file/blog/1/15.jpeg)

{% note warning %}
由于`.pages.dev`在大陆容易被墙，所以（最好）接下来开始
{% endnote %}

### 绑定域名

{% note info %}
<mark>关于域名</mark>，可以去买个六位纯数字的`.xyz`域名，一年大概也就5块，
如果**0预算**的话可以去<u>**申请一个免费域名**</u>，具体请看零度大佬的[这期视频](https://www.bilibili.com/video/BV13pGJzpEpT/)
{% endnote %}

回到Cloudflare Pages页面，上方有个`自定义域`，点进去跟着向导走，就能把你的博客绑定到你的域名

------

_正文结束_

{% note success %}
这是我第一次用markdown写文章，可能排版有点丑💩可能有一些不全，但想到会补上的，得看我什么时候想到了😁
{% endnote %}