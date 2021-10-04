## 制作 Android apk 包
### 1. 复制文件
将项目根目录下的css,js,words文件夹和index.html,wordlib.json文件复制到 本目录/www/ 内
```console
cd other_platforms/android/
cp -r ../../css ./www/
cp -r ../../js ./www/
cp -r ../../words ./www/
cp ../../index.html ./www/
cp ../../wordlib.json ./www/
```
之后本目录内应该有如下结构
android  
├── platforms  
├── resources  
│   └── android  
│        └── ...  
├── www  
│   ├──css   
│   │      └── ...  
│   ├──js  
│   │      └── ...  
│   ├──words  
│   │      └── ...  
│   ├──index.html  
│   └──wordlib.json  
├── config.xml  
├── package.json  
├── package-lock.json  
└── README.md
### 2.准备环境

- 首先安装android sdk。要么直接安装android studio，要么下载Android sdk manger.
(可以从 https://www.androiddevtools.cn/#sdk-tools 下载,我选择的是这种,没下载android studio。
注意安装的时候选择"only for me",否则在win10下可能有权限问题)  
- 然后安装gradle (mac/linux参照 https://gradle.org/install/ ,win下载软件包 https://gradle.org/releases/ 并解压到合适的位置)  
我使用的是6.9.1版本。

安装好之后：  
- 新建一个环境变量(如果没有)：ANDROID_SDK_ROOT，变量值是android sdk 的安装位置
(我的是C:\Users\admin\AppData\Local\Android\android-sdk,mac/linux视情况而定)  
- path变量添加三个(如果没有)：(mac/linux同理)  
    - %ANDROID_SDK_ROOT%\tools\bin
    - %ANDROID_SDK_ROOT%\platform-tools
    - 你的gradle安装位置\bin
- 上述两步的目的是能够在命令行/shell直接运行 gradle 和 sdkmanager.bat
- 命令行/shell中运行
  ```console 
  sdkmanager.bat "platform-tools" "platforms;android-28"
  sdkmanager.bat "build-tools;30.0.0"
  ```
- 接下来安装cordova。默认已经安装node.js。此处使用cnpm以加快速度
  ```console 
  # 注：npm install -g 是全局安装，在项目中安装可能会产生错误
  npm install -g cnpm
  cnpm install -g cordova
  ```

### 3.开始编译
  ```console 
  cordova platform add android@9.0.0  
  
  # debug版apk  
  npm run build-debug  
  # 之后到 platforms/android/app/build/outputs/apk/debug/ 找结果  
  
  # 正式版apk  
  npm run build-release  
  # 之后到 platforms/android/app/build/outputs/apk/release/ 找结果  
  # 正式版app需要签名 请参考网络文章。自己用的话debug版就够了。
  ```


