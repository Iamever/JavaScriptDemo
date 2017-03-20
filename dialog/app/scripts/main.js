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

			// 关闭时间
			delay:null,

			// 对话框提示信息
			message:null,

			// 对话框的宽高
			width:'auto',
			height:'auto',

			// 改变遮罩透明度
			opacity:'0.4',
			
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

				win.append(content.html('请等待..'));
				mask.append(win);
				body.append(mask);
			}else{

				// 根据参数创建弹窗
				header.addClass(config.type);
				win.append(header);
				if(config.message){
					win.append(content.html(config.message));
				}else{

				}
			}

		}
	};
	// 注册到window对象上，使外层可以访问到Dialog
	window.Dialog = Dialog;

})(Zepto);