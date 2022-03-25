/**
 * 使用环境要求：node.js
 * 1. 安装gulp、gulp-replace，执行以下命令即可
 * npm install gulp -g
 * npm install gulp
 * npm install gulp-replace -g
 * npm install gulp-replace
 *
 * 2. 修改index.html中的搜索配置的paths前面添加 /*gulp*/
/**
 * 3. 运行任务
 * gulp default
 *
 * 3. 打开index.html之后会发现path后面已经生成了最新的内容
 */
"use strict";
const gulp = require('gulp');
var fs = require('fs');
const replace = require('gulp-replace');

// 遍历某一个文件夹，每次得到文件，或者得到文件夹的时候，
// finishCb 遍历完的回调
// 要返回的有效文件数组
// ignoreFileArr 要忽略的文件的名字, 包括文件夹
// 最原始的路径
function traverseDir (path, finishCb, fileArr, ignoreFileArr, originPath) {
  fileArr = fileArr || [];
  ignoreFileArr = ignoreFileArr || [];
  originPath = originPath || path;
  fs.readdir(path, function (err, files) {
    //err 为错误 , files 文件名列表包含文件夹与文件
    if (err) {
      console.log('error:\n' + err);
      return;
    }
    var count = files.length;
    var trackCount = 0;
    var singleFinish = function(){
      trackCount += 1;
      checkIsDone();
    };
    var doneCb = function(){
      // 这时候是全部完成，直接返回
      finishCb(fileArr);
    };
    var checkIsDone = function(){
      if(trackCount === count){
        doneCb();
      }
    };
    if (count === 0) {
      doneCb();
    } else {
      files.forEach(function (file, index) {
        var filePath = path + '/' + file;
        fs.stat(filePath, function (err, stat) {
          if (err) {
            console.log(err);
            return;
          }
          // 判断是否要过滤掉这个文件夹或者这个文件夹
          var validFileName = filePath.substr(originPath.length + 1);
          // console.log("valid file:" + validFileName);
          if(ignoreFileArr.indexOf(validFileName) > -1){
            // 如果在过滤数组里面。那么就过滤掉。
            // console.log("ignore file:=============" + validFileName);
            trackCount += 1;
            checkIsDone();
          }else{
            if (stat.isDirectory()) {
              // 如果是文件夹, 就进行递归
              traverseDir(filePath, singleFinish, fileArr, ignoreFileArr, originPath);
            } else {
              // 读出所有的文件
              // 这边只有 .md 文件的，才要放进去
              var tmpArr = file.split(".");
              if(tmpArr.length > 1 && tmpArr.pop() === 'md'){
                fileArr.push('/' + validFileName);
              }
              trackCount += 1;
              checkIsDone();
            }
          }
        });
      });
    }
  });
};


gulp.task('default', () => {
  return traverseDir(process.cwd(), function(fileArr) {
    console.log("遍历共有文件：" + fileArr.length);
    return gulp.src(process.cwd() + '/index.html')
        .pipe(replace(/(\/\*gulp\*\/paths:)(.*)/, '$1 '+ JSON.stringify(fileArr) +','))
        .pipe(gulp.dest(process.cwd()))
  },[],[
    // 这边是要过滤掉的文件或者文件夹
    // todo 这边要注意一个细节，因为这些搜索关键字都是放在 localstorage 上的，只有 5M 的空间，所以如果后面文档太多的话，是有可能会爆的， 除非后面直接改代码，将其存放在 indexDB 之类的
    'node_modules',
    'project_relevance.md',
    '_sidebar.md',
  ]);
});