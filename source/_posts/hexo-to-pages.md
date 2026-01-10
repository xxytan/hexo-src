---
title: 部署Hexo到各Pages
date: 2025-12-21 01:22:49
tags: [Hexo, Termux, Pages]
categories: [Hexo, Pages]
description: 轻松让你的Hexo在互联网永生
cover: https://img.oxue.de/file/blog/2/cover.png
permalink: /p/2/
---
## 前言
{% note default %}
如何部署Hexo请移步[上篇文章](/p/1)
也是以Termux为终端，桌面端的宝子除了终端不同，其他步骤是一样的哦
{% endnote %}

## 准备工作

### 生成博客文件
为了方便，输入
``` bash
cd ..
```
来返回上级目录，然后输入
``` bash
hexo init blog
```
`blog`可随便填，即博客文件夹的名字，**不要是中文**
等待进程跑完，此时目录下就会有个名为`blog`的文件夹，里面存放的就是Hexo的文件

### 安装Git和OpenSSH
输入 
``` bash
pkg install git&&openssh -y
```
等待进程跑完然后

#### 配置Git
{% note info %}
根据需求，选择[Github](https://github.com)、[Gitlab](https://gitlab.com)还是[Gitee](https://gitee.com)
以Github做演示
{% endnote %}

逐条输入
``` bash
git config --global user.name 'Github用户名'
git config --global user.email 'Github绑定邮箱'
```
并回车，配置Git全局配置

#### 配置OpenSSH
输入
``` bash
ssh-keygen -t rsa -C "你的Github绑定邮箱"
```
回车，并再连续三次回车，生成公钥
然后再输入
``` bash
cat ~/.ssh/id_rsa.pub
```
查看公钥，把反出的一大长串复制下来，
然后打开[SSH and GPG Keys](https://github.com/settings/keys)，往下滑，`点New SSH Key`，照下图填写![1.png](https://img.oxue.de/file/blog/2/1.png)然后点 `Add SSH Key`

## 将代码托管到Github仓库
点[New Repository](https://github.com/new)创建新仓库，仓库名称就按`Github用户名.github.io`来填，仓库保持公开![2.png](https://img.oxue.de/file/blog/2/2.png)然后点`Create Repository`

### 初始化仓库
返回Termux，输入
``` bash
cd blog
```
切换到刚刚我们生成的博客文件夹，然后逐条输入
``` bash
git init
git add .
git commit -m "wow"
git branch -M main
git remote add origin git@github.com:username/username.github.io.git
```
{% label username blue %}即Github用户名，然后再输入
``` bash
git push -u origin main
```
进程跑完后，博客文件就被托管到远程仓库了

<mark>接下来就是重头戏</mark>

## 部署到各Pages
{% note warning %}
优缺点各不相同，请自行选择
{% endnote %}

### 部署到GitHub Pages
{% note primary %}
利用GitHub Actions部署
~~国内容易被墙~~  *这段时间好像还挺好？*
{% endnote %}

#### 开始
我们在博客文件夹下创建依次创建
`.github/workflows/pages.yml`
（先创建`.github`文件夹，再在里面创建`workflows`文件夹，再在里面创建 `pages.yml`文件），在文件里填入
``` yaml
name: Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          submodules: recursive
      - name: Use Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: "22.21.1"
      - name: Cache NPM dependencies
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.OS }}-npm-cache
          restore-keys: |
            ${{ runner.OS }}-npm-cache
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public
  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
并保存，

打开仓库设置里的`Pages`，把`Bulid and eployment`下的`Source`从 `Deploy from a branch`改为`GitHub Actions`，![3.png](https://img.oxue.de/file/blog/2/3.png)
返回Termux，输入
``` bash
git push --force origin main
```
等待推送完毕，此时我们打开仓库的`Actions`，当一切皆绿时，我们点击`deploy`下面给的地址，就能访问我们的博客啦🎉!![6.png](https://img.oxue.de/file/blog/2/6.png)

#### 绑定域名
在博客文件夹内创建一个`CNAME`文件，将要绑定的自定义域填入，然后
``` bash
git push --force origin main
```
再到你的域名管理商添加`CNAME`记录，值为 `username.github.io`，{% label username blue %}即Github用户名![4.png](https://img.oxue.de/file/blog/2/4.png)
继续到仓库设置的`Pages`，在右侧`Custom domain`下填入前面输入的自定义域，点`Save`，等待下方成`DNS check successful`，此时访问你的自定义域是能成功访问的🎉![12.e.g](https://img.oxue.de/file/blog/2/12.png)

### 部署到CloudFlare Pages
{% note primary %}
个人最推荐，后续可根据CM大佬的[优选方法](https://blog.cmliussss.com/p/BestWorkers#%E4%B8%BA-Pages-%E9%A1%B9%E7%9B%AE%E4%BD%BF%E7%94%A8%E4%BC%98%E9%80%89%E5%9F%9F%E5%90%8D)提升网站访问速度（前提得有域名）
{% endnote %}

#### 开始
登录[Cloudflare 仪表盘](https://dash.cloudflare.com)，打开`计算和 AI`下的`Workers and Pages`，点`创建应用程序`，再点下面的`Get started`![7.png](https://img.oxue.de/file/blog/2/7.png)选择 `导入现有的 Git 存储库`，授权一下你的 Github，然后选择前面创建的仓库，再按下面的填：
``` bash
npm install ; npm run build #构建命令
public #构建输出目录
```
然后点保存并部署![8.png](https://img.oxue.de/file/blog/2/8.png)等待他部署完成，会给一个`xxxxx.pages.dev`的域名，点进去也是能够访问的

#### 绑定域名
打开项目，点`自定义域`--`设置自定义域`，跟着引导走，等到呈现活动状态就能够通过自定义域访问了![9.png](https://img.oxue.de/file/blog/2/9.png)

### 部署到EdgeOne Pages
{% note primary %}
腾讯的玩意儿，在国内的访问速度确实不错，后续也可以通过添加`A记录`优选
{% endnote%}

#### 开始
登录[EdgeOne](https://console.tencentcloud.com/edgeone)，点`Pages`--`创建项目`--`导入 Git 仓库`，授权一下Github，然后选择前面创建的仓库，会自动匹配`框架预设`，我们就直接点开始部署就好了![10.png](https://img.oxue.de/file/blog/2/10.png)部署完毕后会有一个 `xxxxx.edgeone.xxx`域名，三个小时后过期，打开后也是能够访问的

#### 绑定域名
打开项目，点到`项目设置`，找到`添加自定义域`，跟着引导走就行了，等到`DNS记录`&`证书`都呈现已部署状态就能通过自定义域名访问了![11.png](https://img.oxue.de/file/blog/2/11.png)

### 部署到Vercel
{% note primary %}
国内访问速度还行，后续也可以通过优选提高访问速度，但提升效果不明显，自行搜寻
{% endnote %}

#### 开始
登录[Vercel](https://vercel.com)，*新账号可能需要先创建团队*，

点右上角的`Add New…`，选`Project`，授权一下你的Github，然后选择前面创建的仓库，会自动匹配预设，如果没有匹配请自行选择![13.jpg](https://img.oxue.de/file/blog/2/13.jpg)
然后点`Deploy`，等待一会就部署好啦，点`Go to Dashboard`，就能看到一个`xxxxx.vercel.app`的域名，打开也是能够访问的

#### 绑定域名
点`Domains`旁的 ➕ 号，![14.jpg](https://img.oxue.de/file/blog/2/14.jpg)然后再点`Add Domain`，输入你想绑定的域名，点`Save`或回车↩︎，再把给出的`CNAME`记录添加到域名管理商，耐心等待一会，直至呈现`Valid Configuration`就行啦![15.jpg](https://img.oxue.de/file/blog/2/15.jpg)

## 结尾
由于Netlify每次部署都需要花费额度（其实每个月有免费的300$），所以不做教程，大概步骤都是一样的，*导入Git仓库，然后填构建命令*