;(function($) {

	// Dialog 构造函数
	var Dialog = function (config) {

		var _this_ = this;

		// 默认参数配置
		this.config = {
			// 按钮组
			buttons:null,

			// 类型 
			type:'waiting',

			// 延迟关闭时间
			delay:null,

			// 对话框提示信息
			message:null,

			// 对话框的宽高
			width:'auto',
			height:'auto',

			// 改变遮罩透明度
			opacity:null,
			
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

		// 创建弹框头部
		this.winHeader = $('<div class="dl-header">');

		// 创建内容
		this.winContent = $('<div class="dl-content">');

		// 创建按钮区域
		this.winFooter = $('<div class="dl-footer">');

		// 渲染DOM
		this.creat();
		
	};

	Dialog.prototype= {

		// 创建弹出框
		creat:function () {
			var _this_ = this,
				config = this.config,
				mask = this.mask,
				win = this.win,
				header = this.winHeader,
				content = this.winContent,
				footer = this.winFooter,
				body = this.body;

			// 判断是否传递了参数
			if(this.isConfig){
				// 没有参数
				win.append(content.html('加载中..'));
				mask.append(win);
				body.append(mask);
			}else{

				// 根据参数创建弹窗
				header.addClass(config.type);
				win.append(header);

				// 信息文本
				if(config.message){
					win.append(content.html(config.message));
				};

				// 按钮组
				if(config.buttons){
					this.creatButtons(footer,config.buttons);
					win.append(footer);
				}

				// 插入到页面
				mask.append(win);
				body.append(mask);

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
				if(config.delay && config.delay　!= 0){
					window.setTimeout(function () {
						_this_.close();
					},config.delay);
				}

			}

		},
		creatButtons: function (footer,buttons) {
			// console.log(buttons);
			var _this_ = this;
			$(buttons).each(function(i) {
				var type = this.type ? this.type : '';
				var text = this.text ? this.text : '按钮'+(++i);
				var callback = this.callback ? this.callback : null;

				var button = $('<button class="'+type+'">'+text+'</button>');

				if(callback){
					button.tap(function () {
						callback();

						_this_.close();
					})
				}else{
					button.tap(function () {
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