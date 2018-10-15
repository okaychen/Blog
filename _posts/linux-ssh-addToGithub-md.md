---
title: "linux下误将ssh密钥写入/root"
date: 2018-10-05 12:05:37
tags:  
    - linux
    - github
    - ssh协议
categories:
    - linux
# banner: /assets/05.jpg
---

无论是使用github类似的开源平台还是搭建的git服务器来团队协作开发，我们总是需要使用本地ssh密钥来建立连接，如果要使用ssh服务linux下我们还需要通过终端安装ssh并且开启ssh服务
<!--more-->

# 一.关于ssh密钥
首先应该检查下是否存在ssh密钥，
终端键入`ls -ah`查看是否存在.ssh文件，不存在则我们需要生成ssh密钥：
终端键入`ssh-keygen -t rsa -C 'you_email@email.com'`

回车之后下面是设置的密码，不设置回车即可。即：
```
Enter file in which to save the key (/home/.ssh/id_rsa): 【按回车】
/*这一步不需要修改名字，否则后面我们通过`ssh -T git@github.com`检测是否建立连接会失败，因为ssh默认会读取id_rsa这个公钥*/
Enter passphrase (empty for no passphrase): 【输入密码】
Enter same passphrase again: 【再次输入密码】
```
然后将.ssh/id_rsa.pub添加进去你github中ssh中即可

通过`sss -T git@github.com`检查连接是否建立成功，出现下面信息则提示已经建立连接喽
```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```
然后回去观察你的github ssh and GpG keys的对应的ssh小钥匙灰色已经变成了绿色



# 二.关于ssh服务
对于linux下安装ssh服务相关，这里我做了简单的整理：
### 1.查看ssh服务的状态
输入`sudo service sshd status`:
如果出现No such file or directory相关提示，说明还没有安装ssh服务
如果提示Active:inactive(dead)，则已经安装了ssh服务，但是没有开启

### 2.安装ssh服务
因为linux发行版众多，有一些不同的安装方式
redhat，fedora，centos等系列linux发行版可以尝试：
`sudo yum install sshd`或者`sudo yum install openssh-server` 
debian，ubuntu，linux mint等系列的linux发行版尝试：
`sudo apt-get install sshd`或者`sudo apt-get install openssh-server`

### 3.开启ssh服务
在终端输入`sudo service sshd start`
提示Active: active (running) since Sun 2018-10-5 13:43:11 CST; 15s ago则说明ssh服务已经启动成功

### 4.卸载ssh服务
和安装对应，我们可以使用
`sudo yum remove sshd`和`sudo apt-get -purge remove sshd`
来卸载ssh服务

# 三.解决问题(Permission denied)
因为误通过sudo命令生成ssh密钥，导致ssh密钥写入了/root系统文件，而引发后来一系列问题
丢失了截图，在一次试错后：
![请告诉我你的身份](https://www.chenqaq.com/assets/images/linux-ssh-error01.png)
其实我安装git后已经设置了身份的，通过`git config --list`查看
![git user config](https://www.chenqaq.com/assets/images/linux-ssh-user01.png)
于是我很自然的先搁置这个问题，下面是Permission denied的报错：
![Permission denied](https://www.chenqaq.com/assets/images/linux-ssh-error02.png)
发现是权限问题，于是我反复检查，才发现自己误用了sudo命令，将ssh密钥写入了系统盘/root，导致权限不足，无法与远程建立连接。
![误用sudo生成ssh密钥](https://www.chenqaq.com/assets/images/linux-ssh01.png)



