
    getUserinfo();

    $('#logout').on('click', function() {
        layui.layer.confirm('你确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
          });
    })















function getUserinfo() {
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
            renderAvator(res.data)
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


function renderAvator(user) {
    var name = user.nickname || user.username;
    $('.welcom').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic) {
        $('.layui-nav-img').prop('src', user.user_pic).show();
        $('.text_avator').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text_avator').html(first).show();
    }
}