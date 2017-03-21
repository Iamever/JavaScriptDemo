;(function($) {

	// Dialog 构造函数
	var Dialog = function (config) {

		var _this_ = this;

		// 默认参数配置
		this.config = {
			// 按钮组
			buttons:null,

			// 类型 
			type:null,

			// 延迟关闭时间
			delay:null,

			// 延迟关闭之后的回调
			delayCallBack: null,

			// 对话框提示信息
			message:'信息提示',

			// 对话框的宽高
			width:'auto',
			height:'auto',

			// 改变遮罩透明度
			opacity:null,

			// 点击遮罩层是否关闭
			maskClose:false,

			// 是否启用动画
			effect:true,
			
		};

		// 默认参数扩展
		if(config && $.isPlainObject(config)){

			$.extend(this.config,config);

		}else{
			// 没有扩展
			this.isConfig = true;
		}


		// 创建基本的DOM
		this.body = $('body');

		// 创建遮罩层
		this.mask = $('<div class="dl-container">');

		// 创建弹窗
		this.win = $('<div class="dl-window">');

		// 创建内容
		this.winContent = $('<div class="dl-content">');

		// 创建按钮区域
		this.winFooter = $('<div class="dl-footer">');

		// 渲染DOM
		this.creat();
		
	};

	Dialog.zIndex = 9999;

	Dialog.prototype= {
		// 动画
		animate:function () {
			var _this_ = this;
			this.win.css('-webkit-transform', 'scale(0,0');
			window.setTimeout(function () {
				_this_.win.css('-webkit-transform', 'scale(1,1)');
			},100);
		},

		// 创建弹出框
		creat:function () {
			var _this_ = this,
				config = this.config,
				mask = this.mask,
				win = this.win,
				content = this.winContent,
				footer = this.winFooter,
				body = this.body;

				// 增加弹窗层级
				Dialog.zIndex ++;
				this.mask.css('zIndex', Dialog.zIndex);


			// 判断是否传递了参数
			if(this.isConfig){
				// 没有参数
				win.append(content.html(config.message));
				mask.append(win);
				body.append(mask);

				if(config.effect){
					this.animate();
				}

				if(mask){
					mask.click(function() {
						_this_.close();
					});
				}

			}else{

				// 弹窗类型
				content.addClass(config.type);
				win.append(content);

				// 信息文本
				if(config.message){
					win.append(content.html(config.message));
				};

				// 按钮组
				if(config.buttons){
					this.creatButtons(footer,config.buttons);
					win.append(footer);
				}

				// 设置宽
				if(config.width != 'auto'){
					win.width(config.width);
				}

				// 设置高
				if(config.height != 'auto'){
					win.height(config.height);
				}

				// 设置透明度
				if(config.opacity){
					mask.css('backgroundColor', 'rgba(0,0,0,'+config.opacity+')');
				}

				// 延迟关闭时间
				if(config.delay && config.delay!= 0){
					window.setTimeout(function () {
						_this_.close();

						// 延迟之后的回调
						config.delayCallBack && config.delayCallBack();
					},config.delay);
				}

				// 点击遮罩层 关闭弹框
				if(config.maskClose){
					mask.click(function() {
						_this_.close();
					});
				}

				if(config.effect){
					this.animate();
				}

				// 插入到页面
				mask.append(win);
				body.append(mask);

			}

		},
		creatButtons: function (footer,buttons) {
			var _this_ = this;
			$(buttons).each(function(i) {
				var type = this.type ? this.type : '';
				var text = this.text ? this.text : '按钮'+(++i);
				var callback = this.callback ? this.callback : null;

				var button = $('<button class="'+type+'">'+text+'</button>');

				if(callback){
					button.click(function (e) {
						var isClose = callback();

						// 阻止事件冒泡
						e.stopPropagation();
						if(isClose === false){
						}else{
							_this_.close();
						}
					})
				}else{
					button.click(function (e) {
						e.stopPropagation();
						_this_.close();
					})
				}

				footer.append(button);

			});
		},
		close: function () {
			this.mask.remove();
		}
	};
	// 注册到window对象上，使外层可以访问到Dialog
	window.Dialog = Dialog;

})(Zepto);