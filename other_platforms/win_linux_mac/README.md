## 制作在win、mac和linux的安装包
### 1. 复制文件
将项目根目录下的css,js,words文件夹和index.html,wordlib.json文件复制到本目录内
```console
cd other_platforms/win_linux_mac/
cp -r ../../css ./
cp -r ../../js ./
cp -r ../../words ./
cp ../../index.html ./
cp ../../wordlib.json ./
```
之后本目录内应该有如下结构  
win_linux_mac  
├── css  
│   ├── adminlte.css  
│   ├── OverlayScrollbars.min.css  
│   └── toggle.css  
├── icons  
│   └── 256.ico  
├── index.html  
├── js  
│   ├── canvas-title.js  
│   ├── choice-title.js  
│   ├── common.js  
│   ├── fill-blank-answer.js  
│   ├── fill-blank-kana.js  
│   ├── fill-blank-kanji.js  
│   ├── jquery-3.6.0.js  
│   ├── jquery-3.6.0.min.js  
│   ├── jquery-3.6.0.min.js.map  
│   ├── sel-word-page.js  
│   ├── setting-page.js  
│   ├── title-page.js  
│   └── utils.js   
├── main.js  
├── package.json  
├── README.md  
├── wordlib.json  
└── words  
&nbsp;&nbsp;&nbsp;&nbsp;├── lesson10.json  
&nbsp;&nbsp;&nbsp;&nbsp;├── lesson11.json  
&nbsp;&nbsp;&nbsp;&nbsp;...
<br>

### 2. 安装electron

默认已经安装node.js。此处使用cnpm以加快速度
```console
# 注：npm install -g 是全局安装，在项目中安装可能会产生错误
# 需要联网
npm install -g cnpm
cnpm install -g electron 
cnpm install -g electron-packager
```

### 3. 生成
```console
# 需要联网
# 直接调用electron-packager
electron-packager ./ JpnWordsRem --platform=[win32|darwin|linux] --arch=[ia32|x64|armv7l|arm64|mips64el] --out ./OutApp --electron-version 15.0.0 --overwrite --icon=./icons/256.ico

# 或者 根据平台选择
npm run package-all
npm run package-win
npm run package-mac
npm run package-linux
```
在OutApp文件夹可以找到结果。OutApp/JpnWordsRem-xxx/ 内找到 JpnWordsRem / JpnWordsRem.exe / JpnWordsRem.app即可。之后也可以打成压缩包。