$(function() {

layui.form.verify({
  nickname: function(value) {
   if (value.length > 6) {
    return '昵称长度必须在 1 ~ 6 个字符之间！'
  }
 }
})
    initUserinfo();
function initUserinfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //        Authorization: localStorage.getItem('token') || ''
        //      },
        success: function(res) {
            // console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取数据失败');
            }
            layui.form.val('formUser', res.data)
        },
        // complete: function(res) {
        //     console.log(res);
        //     if(res.responseJSON.message ==='身份认证失败！' && res.responseJSON.status ===1) {
        //     localStorage.removeItem('token');
        //     location.assign('/login.html')
        
        // }
        // }
    })
}
    $('#reset').on('click', function(e) {
        e.preventDefault();
        initUserinfo();
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新信息失败');
                }
                console.log(res);
                layer.msg('更新成功');
                // console.log(window.parent);
                window.parent.getUserinfo();
                console.log(window.parent.getUserinfo());
                console.log(2);
            }
        })
    })




















})