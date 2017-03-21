 	$('#btn1').click(function () {
      var d1 = new Dialog()
    });

    $('#btn2').click(function() {
      var d2 = new Dialog({
        type:'warning',
        delay:2000,
        message:'弹出警告框，2秒后自动关闭'
      })
    });

    $('#btn3').click(function() {
      var d3 = new Dialog({
        message:'弹出有确定和取消按钮的信息框，点击按钮关闭',
        buttons:[
        {
          text:'确认',
          type:'ok'
        },{
          text:'取消',
          type:'no'
        }
        ],
      })
    });

    $('#btn4').click(function() {
      var d4 = new Dialog({
        message:'弹出一个有确认按钮的警告框，点击按钮不关闭',
        type:'warning',
        buttons:[
        {
          text:'确认',
          type:'ok',
          callback:function () {
            alert(3);

            return false;
          }
        }
        ],
      })
    });


    $('#btn5').click(function() {
      var d5 = new Dialog({
        message:'弹出一个多组合的按钮框，样式可定制',
        buttons:[
        {
          text:'确认',
          type:'ok',
        },
        {
          text:'警告',
          type:'warning',
        },
        {
          text:'取消',
          type:'no',
        }
        ],
      })
    });


    $('#btn6').click(function() {
      var d6 = new Dialog({
        message:'弹出一个确认和删除的框，点击确认弹出加载框且2秒自动关闭；点击删除框把之前的框关闭掉',
        buttons:[
        {
          text:'确认',
          type:'ok',
          callback:function () {
            var dn = new Dialog({
              delay:2000,
              message:'你点击了确认按钮'
            })
          }
        },
        {
          text:'删除',
          type:'no',
          callback:function () {
            d6.close();
          }
        }
        ],
      })
    });