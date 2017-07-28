# waving
一个按钮点击产生波浪的插件

## 支持以下功能：

- 支持设置波浪动画时间，波浪颜色深度参数。
- 支持连续点击同时产生多个波浪。
- 支持其他元素(不限于按钮，如div等）点击产生波浪。
- 兼容chrome、Firefox、IE10+，支持手机端，PC端....


## 初始化方法：
```
<!-- 引用代码包 -->
<script src="waving.js"></script>


<!-- HTML结构 -->
<style>
    .btn
    {
        position: relative;
        width: 200px;
        height: 40px;
        line-height: 40px;
        background-color: #0086ff;
        border-radius: 4px;
        text-align: center;
        font-size: 18px;
        color:white;
        border:0px!important;
        overflow: hidden;
    }
</style>
<div>
    <button class="btn">测试<span>asdfas</span></button>
    <button class="btn">测试1</button>
</div>

<!-- js代码 -->
<script type="text/javascript">
    //new Waving(document.querySelector(".btn"), { duration: 1000, shade: 0.2 });
    new Waving(document.getElementsByClassName("btn"), { duration: 1000, shade: 0.2 });
</script>


```

