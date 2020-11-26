$('#login_btn').on('click', function() {
    $('.login').hide();
    $('.reg').show();
})
$('#reg_btn').on('click', function() {
    $('.login').show();
    $('.reg').hide();
})
var form = layui.form;
var layer = layui.layer;
form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
      if(/(^\_)|(\__)|(\_+$)/.test(value)){
        return '用户名首尾不能出现下划线\'_\'';
      }
      if(/^\d+\d+\d$/.test(value)){
        return '用户名不能全为数字';
      }
    },
    
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    password: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd: function(value) {
        let pwd = $('.reg [name=password]').val();
        if(pwd !== value) {
            return '两次密码不一致';
        }
    }
  });  
$('#reg_form').on('submit', function(e) {
    e.preventDefault();
    // console.log($(this).serialize());
    $.ajax({
        type: 'post',
        url: '/api/reguser',
        data: $(this).serialize(),
        success: function(res) {
            // console.log(res);
            if(res.status !== 0) {
                return layer.msg('注册失败');
            }
            layer.msg('恭喜您注册成功');
            $('#reg_btn').click();
        }
    })
})
$('#login_form').submit(function(e) {
    e.preventDefault();
    // console.log($(this).serialize());
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function(res) {
        //     console.log(res);
        if(res.status !==0) {
            return layer.msg('登录失败');
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token);
        location.href = 'index.html';
        }
    })
})