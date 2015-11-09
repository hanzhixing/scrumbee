# scrumbee
# AngularJs使用中Protractor和Karma调用远程浏览器运行测试用例的条件
## 远程浏览器所在机器上要做的事情
1. 到selenium官网下载webdriver，根据操作系统和浏览器下载不同的压缩包。
2. 到selenium官网下载selenium-server-standalone的jar包。
3. 上面两个都可以放到任何目录下。另外要安装java环境，因为要运行jar文件嘛。
4. 然后执行命令
```bash
/usr/libexec/java_home -v 1.8 --exec java \
-jar /Users/hanzhixing/playground/selenium/selenium-server-standalone-2.48.2.jar \
-Dwebdriver.chrome.driver=/Users/hanzhixing/playground/selenium/chromedriver
```
## 测试用例所在机器上要做的事情
1. 这是执行protractor和karma的环境。
2. 对protractor，在protractor-conf.js文件中
```javascript
    directConnect: false,
    seleniumAddress: 'http://远程浏览器所在机器的IP:4444/wd/hub',
    baseUrl: 'http://项目所在机器的IP:8000/', // 就是通过浏览器访问项目
```
3. 对karma，在karma.conf.js文件中
```javascript
```
