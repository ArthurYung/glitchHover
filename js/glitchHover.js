(function(window, undefined) {
    "use strict"
    var _o = {
        data: "null",
        cls: 'hover-white', //颜色风格
        rx: 12, //抖动幅度
        mt: 12, //抖动时间
        sp: 4, //抖动速度
        fun: false //点击执行函数
    };

    function glitchHover(o) {
        this.n = 'h-model';
        this.h = '<hgroup class="hover-coler">' +
            '<div>{{ddd}}</div>' +
            '<div>{{ddd}}</div>' +
            '<div>{{ddd}}</div>' +
            '</hgroup>';
        this.el = [];
        this.o = this.extend(_o, o);
        this.init();
    };
    glitchHover.prototype = {
        init: function() {
            var els = document.getElementsByTagName('*');
            for (var i in els) {
                if (this.isDom(els[i])) {
                    els[i].getAttribute(this.n) && this.el.push(els[i]);
                };
            }
            this.addChild();
        },
        addChild: function() {
            var o = this.o,
                n = this.n,
                h = this.h;
            var move = this.addEnter;
            var stop = this.stop;
            this.el.forEach(function(v, i) {
                var f = v.getAttribute(n),
                    old = v.getAttribute("class"),
                    txt = o[f].data || o.data,
                    cls = o[f].cls || o.cls,
                    _h = h.replace(/{{ddd}}/g, txt),
                    size = v.currentStyle ? v.currentStyle.fontSize : window.getComputedStyle(v, null).fontSize; //获取字体大小
                o[f].size = parseInt(size); //将字体大小存入o[obj],字体越大，有色文字抖动幅度越大
                v.innerHTML = txt;
                v.style.height = v.clientHeight + 'px';
                v.setAttribute("class", old + ' ' + cls);
                v.innerHTML = _h + _h + _h + _h + _h + _h + _h + _h + _h + _h;
                move(v, o, stop, f);
            })
        },
        addEnter: function(el, o, stop, h) {
            var m = o[h].mt || o.mt;
            var x = o[h].rx || o.rx;
            var f = o[h].fun || o.fun;
            var s = o[h].sp || o.sp;
            el.addEventListener("mouseenter", function() {
                var start = 0;
                var shake = function() {
                    if (start < m) {
                        setTimeout(shake, 200 / s)
                    } else {
                        stop(el);
                        return;
                    }
                    for (var i = 0; i < el.children.length; i++) {
                        var r = Math.random() * x - x / 2;
                        var c = el.children[i];
                        c.children[0].style.left = r + 'px';
                        c.children[1].style.left = r + o[h].size / 10 + 2 + 'px';
                        c.children[2].style.left = r + o[h].size / 20 + 1 + 'px';

                    }
                    start++;
                }
                shake();
            });
            f && el.addEventListener("click", f);
        },
        stop: function(el) {
            var _el = el;
            for (var i = 0; i < _el.children.length; i++) {
                var c = _el.children[i];
                c.children[0].style.left = '0px';
                c.children[1].style.left = '0px';
                c.children[2].style.left = '0px';
            }
        },
        isDom: function(obj) {
            if ((typeof HTMLElement === 'object')) {
                return obj instanceof HTMLElement;
            } else {
                return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            }
        },
        extend: function(target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }
            return target;
        }
    };

    window.glitchHover = function(o) {
        return new glitchHover(o);
    }
})(window)