# wiznote.custom
```css
.desktop-editor .editor-main .root-container .editor-block .style-bold{
  color: #BF360C !important;
}

.desktop-editor .editor-main h1.editor-block,
.desktop-editor .editor-main h2.editor-block,
.desktop-editor .editor-main h3.editor-block,
.desktop-editor .editor-main h4.editor-block,
.desktop-editor .editor-main h5.editor-block,
.desktop-editor .editor-main h6.editor-block {
  font-style: bold !important;
  color: #009688 !important;
}

.desktop-editor .editor-main h1.editor-block {
  font-size: 26px !important;
  border-bottom: 1px solid #ddd !important;
}

.desktop-editor .editor-main h2.editor-block {
  font-size: 20px !important;
  border-bottom: 1px solid #eee !important;
}

.desktop-editor .editor-main h3.editor-block {
  font-size: 18px;
}

.desktop-editor .editor-main h4.editor-block {
  font-size: 16px;
}

.desktop-editor .editor-main .root-container .editor-block .style-italic{
  color: #7f8c8d;
}

.desktop-editor .editor-main .root-container .editor-block .style-bold{
  color: #BF360C !important;
}

.desktop-editor .editor-main .root-container .embed-block hr.editor-embed {
  border: 1px solid #BF360C;
  margin: 1.5em auto;
}

.desktop-editor .editor-main .editor-block.editor-quote-block .block-content {
  border-left: 2px solid #009688;
  padding: 0 10px;
  color: #777;
  quotes: none;
  margin-left: 1em;
}

.desktop-editor .editor-main .editor-block.editor-quote-block + .editor-quote-block .block-content {
  margin-top: -16px;
}
```
# 李笑来同款md样式
```Plain Text
.desktop-editor .editor-main {
  font-size: 16px;
  line-height: 1em;
  letter-spacing: 0.1em;
}

.desktop-editor .editor-main .root-container .code-line-block.editor-block * {
  border-radius: 2px;
  font-size: 12px;
  line-height: 1em;
  font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
}

.desktop-editor .editor-main .root-container .code-block.editor-block {
  border-radius: 3px;
}

.desktop-editor .editor-main .root-container .editor-block .style-bold{
  color: #BF360C !important;
}

.desktop-editor .editor-main .root-container .editor-block .style-italic{
  color: #009688;
   #  color: #7f8c8d;
}

.desktop-editor .editor-main .root-container .embed-block hr.editor-embed {
  border: 1px solid #BF360C;
  margin: 1.5em auto;
}

.desktop-editor .editor-main .editor-block {
   margin-top: 1.5em !important;
  margin-bottom: 1.5em !important; margin-top: 1.5em !important;
  margin-bottom: 1.5em !important;
}

.desktop-editor .editor-main .editor-block.editor-quote-block,
.desktop-editor .editor-main .editor-block.list-block{
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}

.desktop-editor .editor-main .editor-block.editor-quote-block .block-content {
  border-left: 2px solid #009688;
  padding: 0 10px;
  color: #777;
  quotes: none;
  margin-left: 1em;
}

.desktop-editor .editor-main .editor-block.editor-quote-block + .editor-quote-block .block-content {
  margin-top: -10px;
}
.desktop-editor .editor-main h1.editor-block,
.desktop-editor .editor-main h2.editor-block,
.desktop-editor .editor-main h3.editor-block,
.desktop-editor .editor-main h4.editor-block,
.desktop-editor .editor-main h5.editor-block,
.desktop-editor .editor-main h6.editor-block {
  font-style: bold !important;
  color: #009688 !important;
}

.desktop-editor .editor-main h1.editor-block {
  font-size: 26px !important;
  border-bottom: 1px solid #ddd !important;
}

.desktop-editor .editor-main h2.editor-block {
  font-size: 20px !important;
  border-bottom: 1px solid #eee !important;
}

.desktop-editor .editor-main h3.editor-block {
  font-size: 18px;
}

.desktop-editor .editor-main h4.editor-block {
  font-size: 16px;
}

.desktop-editor .editor-main .editor-block.table-block table {
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
  font: inherit;
  border: 0;
  margin: 0;
}

.desktop-editor .editor-main .editor-block.table-block table tbody {
  margin: 0;
  padding: 0;
  border: 0;
}

.desktop-editor .editor-main .editor-block.table-block table table tr {
  border: 0;
  border-top: 1px solid #CCC;
  background-color: white;
  margin: 0;
  padding: 0;
}

.desktop-editor .editor-main .editor-block.table-block table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

.desktop-editor .editor-main .editor-block.table-block table tr th, 
.desktop-editor .editor-main .editor-block.table-block table tr td {
  font-size: 16px;
  border: 1px solid #CCC;
  margin: 0;
  padding: 5px 10px;
}

.desktop-editor .editor-main .root-container .editor-block.table-block table tr:first-of-type {
  font-weight: bold;
  color: #eee;
  border: 1px solid #009688;
  background-color: #009688 ;
}
.desktop-editor .editor-main .root-container .editor-block.table-block table tr:first-of-type .editor-block {
  font-weight: bold;
  color: #eee;
}
.desktop-editor .editor-main .root-container .editor-block.table-block .editor-block {
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
}
```
# 基本设置
```Plain Text
/* 设置用户头像大小 */
.wiznote-userinfo-avatar {
  width: 100px;
  height: 100px;
}

/* 设置左面面板上我的收藏的字体 */
.wiznote-fav-tree-item .wiznote-label {
  font-size: 10px;
}

/* 设置左面面板上我的消息的字体 */
.wiznote-my-messages .wiznote-label {
  font-size: 10px;
}

/* 设置左面面板文件夹的字体 */
.wiznote-folder-tree .wiznote-label {
  font-size: 12px;
}

/* 设置左面面板文件夹的背景颜色 */
.wiznote-folder-tree {
  background-color: #223344;
}

/* 设置整个左面面板的颜色 */
.wiznote-left-pane {
  background-color: #223300;
}
```
## 根据文字设置颜色
```Plain Text
/* 在最左面，将所有“测试”开头的节点背景改为蓝色 */
.wiznote-left-pane [label-text^="测试"] {
  background-color: blue;
}

/* 在笔记列表，将所有标题为“wiznote.custom"开头的笔记背景改为绿色 */
.wiznote-note-item [title-text^="wiznote.custom"] .wiznote-note-item-container {
  background-color: green;
  border-radius: 8px;
}

/* 在笔记列表，将所有标题为“wiznote.custom"开头的笔记字体改为黄色 */
.wiznote-note-item [title-text^="wiznote.custom"] .wiznote-note-item-container p {
  color: yellow;
}
```
## 笔记列表
```css
/* 不显示笔记列表中的笔记所在文件夹 */
.wiznote-note-item-info {
  display: none;
}

/* 笔记列表更紧凑 */
.wiznote-note-item-container {
  padding: 2px;
}

.wiznote-note-item div[draggable="true"] {
  padding: 0;
}

.wiznote-note-item-title {
  margin: 0;
}
```
# 面板宽度
```Plain Text
/* 设置最左面板的固定宽度 */
.wiznote-split-pane-main:first-of-type {
  width: 200px !important;
}

/* 设置笔记列表的宽度 */
.wiznote-split-pane-sub:first-of-type {
  width: 250px !important;
}
```
# 编辑器
```Plain Text
/* 编辑器 code 样式 */
.desktop-editor .editor-main .root-container .code-line-block.editor-block * {
    font-size: 14px;
}
```
### 代码段显示行号
```Plain Text
.editor-main .root-container > .code-block {
  counter-reset: line;
}

.editor-main .root-container > .code-block .editor-block.code-line-block {
  margin-left: 16px;
}

.editor-main .root-container > .code-block .editor-block.code-line-block:before {
  content: counter(line);
  counter-increment: line;
  position: absolute;
  left: -48px;
  top: 10px;
  z-index: var(--wiz-editor-z-block-counter);
  margin-top: -6px;
  display: block;
  width: 48px;
  padding-right: 8px;
  text-align: right;
  color: var(--editor-line-number-color);
  box-sizing: border-box;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 1;
}

```
# 绿色简约（推荐）
```Plain Text
body{
    margin: 0 auto;
    font-family: "Microsoft YaHei", arial,sans-serif;
    color: #444444;
    line-height: 1;
    padding: 30px;
}
@media screen and (min-width: 768px) {
    body {
        width: 748px;
        margin: 10px auto;
    }
}
h1, h2, h3, h4 {
    color: #111111;
    font-weight: 400;
    margin-top: 1em;
}

h1, h2, h3, h4, h5 {
    font-family: Georgia, Palatino, serif;
}
h1, h2, h3, h4, h5, p , dl{
    margin-bottom: 16px;
    padding: 0;
}
h1 {
    font-size: 48px;
    line-height: 54px;
}
h2 {
    font-size: 36px;
    line-height: 42px;
}
h1, h2 {
    border-bottom: 1px solid #EFEAEA;
    padding-bottom: 10px;
}
h3 {
    font-size: 24px;
    line-height: 30px;
}
h4 {
    font-size: 21px;
    line-height: 26px;
}
h5 {
    font-size: 18px;
    list-style: 23px;
}
a {
    color: #0099ff;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
}
a:hover {
    text-decoration: none;
    color: #ff6600;
}
a:visited {
    /*color: purple;*/
}
ul, ol {
    padding: 0;
    padding-left: 24px;
    margin: 0;
}
li {
    line-height: 24px;
}
p, ul, ol {
    font-size: 16px;
    line-height: 24px;
}

ol ol, ul ol {
    list-style-type: lower-roman;
}

/*pre {
    padding: 0px 24px;
    max-width: 800px;
    white-space: pre-wrap;
}
code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    line-height: 1.5;
    font-size: 13px;
}*/

code, pre {
    border-radius: 3px;
    background-color:#f7f7f7;
    color: inherit;
}

code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    margin: 0 2px;
}

pre {
    line-height: 1.7em;
    overflow: auto;
    padding: 6px 10px;
    border-left: 5px solid #6CE26C;
}

pre > code {
    border: 0;
    display: inline;
    max-width: initial;
    padding: 0;
    margin: 0;
    overflow: initial;
    line-height: inherit;
    font-size: .85em;
    white-space: pre;
    background: 0 0;

}

code {
    color: #666555;
}


/** markdown preview plus 对于代码块的处理有些问题, 所以使用统一的颜色 */
/*code .keyword {
  color: #8959a8;
}

code .number {
  color: #f5871f;
}

code .comment {
  color: #998
}*/

aside {
    display: block;
    float: right;
    width: 390px;
}
blockquote {
    border-left:.5em solid #eee;
    padding: 0 0 0 2em;
    margin-left:0;
}
blockquote  cite {
    font-size:14px;
    line-height:20px;
    color:#bfbfbf;
}
blockquote cite:before {
    content: '\2014 \00A0';
}

blockquote p {
    color: #666;
}
hr {
    text-align: left;
    color: #999;
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
}

dl {
    padding: 0;
}

dl dt {
    padding: 10px 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
}

dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
}

dd {
    margin-left: 0;
}

/* Code below this line is copyright Twitter Inc. */

button,
input,
select,
textarea {
    font-size: 100%;
    margin: 0;
    vertical-align: baseline;
    *vertical-align: middle;
}
button, input {
    line-height: normal;
    *overflow: visible;
}
button::-moz-focus-inner, input::-moz-focus-inner {
    border: 0;
    padding: 0;
}
button,
input[type="button"],
input[type="reset"],
input[type="submit"] {
    cursor: pointer;
    -webkit-appearance: button;
}
input[type=checkbox], input[type=radio] {
    cursor: pointer;
}
/* override default chrome & firefox settings */
input:not([type="image"]), textarea {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}

input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}
label,
input,
select,
textarea {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: normal;
    line-height: normal;
    margin-bottom: 18px;
}
input[type=checkbox], input[type=radio] {
    cursor: pointer;
    margin-bottom: 0;
}
input[type=text],
input[type=password],
textarea,
select {
    display: inline-block;
    width: 210px;
    padding: 4px;
    font-size: 13px;
    font-weight: normal;
    line-height: 18px;
    height: 18px;
    color: #808080;
    border: 1px solid #ccc;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
select, input[type=file] {
    height: 27px;
    line-height: 27px;
}
textarea {
    height: auto;
}
/* grey out placeholders */
:-moz-placeholder {
    color: #bfbfbf;
}
::-webkit-input-placeholder {
    color: #bfbfbf;
}
input[type=text],
input[type=password],
select,
textarea {
    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
input[type=text]:focus, input[type=password]:focus, textarea:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
    -moz-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}
/* buttons */
button {
    display: inline-block;
    padding: 4px 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 18px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    background-color: #0064cd;
    background-repeat: repeat-x;
    background-image: -khtml-gradient(linear, left top, left bottom, from(#049cdb), to(#0064cd));
    background-image: -moz-linear-gradient(top, #049cdb, #0064cd);
    background-image: -ms-linear-gradient(top, #049cdb, #0064cd);
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #049cdb), color-stop(100%, #0064cd));
    background-image: -webkit-linear-gradient(top, #049cdb, #0064cd);
    background-image: -o-linear-gradient(top, #049cdb, #0064cd);
    background-image: linear-gradient(top, #049cdb, #0064cd);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    border: 1px solid #004b9a;
    border-bottom-color: #003f81;
    -webkit-transition: 0.1s linear all;
    -moz-transition: 0.1s linear all;
    transition: 0.1s linear all;
    border-color: #0064cd #0064cd #003f81;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}
button:hover {
    color: #fff;
    background-position: 0 -15px;
    text-decoration: none;
}
button:active {
    -webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}
button::-moz-focus-inner {
    padding: 0;
    border: 0;
}
table {
    *border-collapse: collapse; /* IE7 and lower */
    border-spacing: 0;
    width: 100%;
}
table {
    border: solid #ccc 1px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    /*-webkit-box-shadow: 0 1px 1px #ccc;
    -moz-box-shadow: 0 1px 1px #ccc;
    box-shadow: 0 1px 1px #ccc;   */
}
table tr:hover {
    background: #fbf8e9;
    -o-transition: all 0.1s ease-in-out;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
}
table td, .table th {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}

table th {
    background-color: #dce9f9;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
    background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:    -moz-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:     -ms-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:      -o-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:         linear-gradient(top, #ebf3fc, #dce9f9);
    /*-webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
    -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
    box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;*/
    border-top: none;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
    padding: 5px;
}

table td:first-child, table th:first-child {
    border-left: none;
}

table th:first-child {
    -moz-border-radius: 6px 0 0 0;
    -webkit-border-radius: 6px 0 0 0;
    border-radius: 6px 0 0 0;
}
table th:last-child {
    -moz-border-radius: 0 6px 0 0;
    -webkit-border-radius: 0 6px 0 0;
    border-radius: 0 6px 0 0;
}
table th:only-child{
    -moz-border-radius: 6px 6px 0 0;
    -webkit-border-radius: 6px 6px 0 0;
    border-radius: 6px 6px 0 0;
}
table tr:last-child td:first-child {
    -moz-border-radius: 0 0 0 6px;
    -webkit-border-radius: 0 0 0 6px;
    border-radius: 0 0 0 6px;
}
table tr:last-child td:last-child {
    -moz-border-radius: 0 0 6px 0;
    -webkit-border-radius: 0 0 6px 0;
    border-radius: 0 0 6px 0;
}
```
