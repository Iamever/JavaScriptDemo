

;(function($,window,document,undefined){

    var pluginName = 'TSlick',
        defaults = {
            // 外层div
            container:'.ge-tslick-container',
            // 内层div
            wrap:'.ge-tslick-wrap',
            // 子项
            item:'.ge-tslick-item',
        };

    function TSlick(ele,options){
        this.ele = ele;
        this.settings = $.extend({}, defaults,options);
        this._defaults  = defaults;
        this._name = pluginName;
        this.version = 'v1.0';
        this.init();
        
    }




    TSlick.prototype = {
        /**
         * 入口函数
         * @return {[type]} [description]
         */
        init:function () {

            this.click();
            this.touchstart();
            this.touchmove();
        }
        /**
         * 点击选项事件
         * @return {[type]} [修改item的left值][修改当前item类，一致来调整高亮]
         */
        ,click:function(){
            var _this_ = this,

            view_width = $(this.settings.container).width(),
            slick_width = $(this.settings.wrap).width();

            $(this.settings.item).click(function() {
                //wrap 的left值
                var left;
                // 视口中心点
                var center_pointer_width = (view_width - $(this).width()) / 2;
                // 当前item的left值
                var curr_item_left = parseInt($(this).position().left);

                // 如果item在中心点的左边，则wrap的left值不变
                if (curr_item_left <= center_pointer_width) {
                    left = 0;
                } else if (center_pointer_width - curr_item_left <= view_width - slick_width) { // item在中心点的右边，则设置当前item为中心位置
                    left = view_width - slick_width;
                } else {
                    left = center_pointer_width - curr_item_left;
                }
                $(_this_.settings.wrap).animate({left: left}, 200);
                $(this).addClass('curr').siblings().removeClass('curr');
            });

            return this;

        }
        /**
         * 触摸开始
         * @return {[type]} [description]
         */
        ,touchstart:function(){
            var _this_ = this,start_x,start_y,start_left;

            $(this.settings.wrap).on('touchstart', function(e) {
                _this_.start_x = e.originalEvent.targetTouches[0].pageX;
                _this_.start_y = e.originalEvent.targetTouches[0].pageY;
                _this_.start_left = parseInt($(this).css('left'));
            });

            return this;

        }
        /**
         * [触摸移动]
         * @return {[type]} [description]
         */
        ,touchmove:function(){
            var _this_ = this,

            view_width = $(this.settings.container).width(),

            slick_width = $(this.settings.wrap).width();


            $(this.settings.wrap).on('touchmove', function(e) {
                var move_touch = e.originalEvent.targetTouches[0];
                var move_x = move_touch.pageX;
                var move_y = move_touch.pageY;

                if(_this_.touchstart().start_left + move_x - _this_.touchstart().start_x>=0){
                    // 已经到最左
                    $(this).css('left', 0);
                }else if(_this_.touchstart().start_left + move_x - _this_.touchstart().start_x <= view_width - slick_width){
                    // 已经到最右
                    $(this).css('left', view_width - slick_width);
                }else{
                    // 在中间
                    $(this).css('left', _this_.touchstart().start_left + move_x - _this_.touchstart().start_x);
                }

                if(Math.abs(move_y - _this_.touchstart().start_y)>0){
                    e.preventDefault();
                }
                
            });
        }
    }

    $.fn[pluginName] = function(options){
        this.each(function() {
            if(!$.data(this,'plugin_'+pluginName)){
                $.data(this, 'plugin_'+pluginName , new TSlick(this,options));
            }
        });
        return this;
    }

})($,window,document);

