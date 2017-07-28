/**
 * Created by Administrator on 2017/7/28.
 */

+(function(document){
    Waving = function(el, options){

        var _DEFAULTS = {
            duration: 1000,
            shade: 0.2,
        };

        // 获取target元素的祖先元素（符合selector选择器）
        function getParentElement(seletor, target){
            var targetObj = null;

            if(typeof seletor == 'string' ){
                while( target != document){
                    if(seletor.indexOf("#") == 0 && target.getAttribute("id") == seletor.substr(1)){
                        targetObj = target;
                        break;
                    }else if(seletor.indexOf(".") == 0 && target.className.split(" ").indexOf(seletor.substr(1)) >= 0){
                        targetObj = target;
                        break;
                    }

                    target = target.parentNode;
                }

            }else if(isDOM(seletor)){
                while(target != document){
                    if(seletor == target || Array.prototype.indexOf.call(seletor, target) >= 0) {
                        targetObj = target;
                        break;
                    }

                    target = target.parentNode;
                }
            }

            return targetObj;
        }

        //判断是否是dom元素
        function isDOM(obj)
        {
            var isdomEl = ( typeof HTMLElement === 'object' ) ?
                function(obj){
                    return obj instanceof HTMLElement;
                } :
                function(obj){
                    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
                };

            return ( obj instanceof HTMLCollection ) || obj instanceof NodeList || isdomEl(obj);
        }

        //获取option中的属性
        function getProperty(obj, prop, defaultObj){
            return obj[prop] != undefined ? obj[prop] : defaultObj[prop];
        }

        //按钮点击事件处理
        function clickHandler(e){
            var target =  e.target || e.srcElement;
            var targetBtn = getParentElement(el, target);

            if(!targetBtn) return;

            var i = document.createElement("i");
            var offsetX = e.pageX - targetBtn.getBoundingClientRect().left;
            var offsetY = e.pageY - targetBtn.getBoundingClientRect().top;
            var maxX = targetBtn.clientWidth - offsetX > targetBtn.clientWidth / 2 ? targetBtn.clientWidth - offsetX : offsetX;
            var maxY = targetBtn.clientHeight - offsetY > targetBtn.clientHeight / 2 ? targetBtn.clientHeight - offsetY : offsetY;

            i.style.position = "absolute";
            i.style.width = Math.max(maxX, maxY) * 2  + "px";
            i.style.height = i.style.width;
            i.style.top = offsetY - Math.max(maxX, maxY) + "px";
            i.style.left = offsetX - Math.max(maxX, maxY) + "px";

            i.style.opacity = 1;
            i.style.borderRadius = "100%";
            i.style.transform = "scale(0)";
            i.style.transformOrigin =  "50% 50%";
            i.style.transitionProperty =  "all";
            i.style.transitionDuration = getProperty(options, "duration", _DEFAULTS) + "ms";
            i.style.backgroundColor = "rgba(0,0,0," + getProperty(options, "shade", _DEFAULTS) + ")";

            //var csstext = "position:absolute; " +
            //    "width:"+ Math.max(maxX, maxY) * 2  + "px" + "; " +
            //    "height:" + Math.max(maxX, maxY) * 2  + "px" +";" +
            //    "top:" + offsetY - Math.max(maxX, maxY) + "px" +";" +
            //    "left:" + offsetX - Math.max(maxX, maxY) + "px" +";" +
            //    "opacity: 1; " +
            //    "border-radius: 100%; " +
            //    "transform: scale(0); " +
            //    "-moz-transform: scale(0); " +
            //    "transform-origin: 50% 50%; " +
            //    "-moz-transform-origin: 50% 50%; " +
            //    "transform-property: all; " +
            //    "-moz-transform-property: all; " +
            //    "transition-duration: " + getProperty(options, "duration", _DEFAULTS) + "ms" + "; " +
            //    "-moz-transition-duration: " + getProperty(options, "duration", _DEFAULTS) + "ms" + "; " +
            //    "background-color: " + "rgba(0,0,0," + getProperty(options, "shade", _DEFAULTS) + ")";
            //
            //i.style.cssText = csstext;

            targetBtn.appendChild(i);

            //console.log(maxX + "  " + maxY  + "   "  +  i.style.width);

            setTimeout(function(){
                i.style.transform = "scale(1.0)";
                i.style.opacity = "0";
            }, 10);

            setTimeout(function(){
                targetBtn.removeChild(i);
            }, getProperty(options, "duration", _DEFAULTS) + 10 );
        };

        //添加document级别的click事件
        if(document.addEventListener) {
            document.addEventListener("click", clickHandler, false);
        } else if (document.attachEvent){
            document.attachEvent("onclick", clickHandler);
        } else {
            document.onclick = clickHandler;
        }

    };
})(document);