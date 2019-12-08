# chordtone.xyz を React で作り直し

```
$ npx create-react-app .
```

vscode 拡張機能の Simple React Snippets 使用

## score.html と score.js は Vanila JS

React で window.open() してから小ウインドウを操作などが面倒そうだったため

### score.js は Parcel でバンドル

Parcel があるという前提  

```
$ npm install -g parcel-bundler
```

以下のディレクトリで行う

```
$ cd public  
$ parcel build ./src/score.js --no-source-maps  
```

## サーバーサイドは PHP

package.jsonに以下を追加  
```
"proxy": "http://localhost:8000",
```

React のサーバーを起動しつつ  
```
$ npm start
```

PHPのビルトインサーバーも起動  
```
$ cd ./cd public/api  
$ php -S localhost:8000
```

### ここで使う Google のアカウント

hehek407@gmail.com
