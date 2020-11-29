$(function() {

    getArticle();
    var addList = null
    function getArticle() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layui.layer.msg('获取列表数据失败');
                }
                // layui.layer.msg('获取列表数据成功');
               var htmlstr = template('tpl_article', res);
               $('tbody').html(htmlstr);
            }
        })
    }
    $('#btn_add').on('click', function() {
       addList = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#article_add').html()
          });     
            
    })

    $('body').on('submit','#form_add', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('添加数据失败');
                }
                layui.layer.msg('添加数据成功');
                getArticle();
                layui.layer.close(addList);
            }
        })
    })
    var editList = null;
    $('tbody').on('click', '.edit_article', function() {
        var id = $(this).attr('data-id');
        editList =  layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#article_edit').html()
          });     
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                layui.form.val('form_edit', res.data)
            }
        })
    })

    $('body').on('submit','#form_edit', function(e) {
        e.preventDefault();
        console.log(1);
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if(res.status!==0) {
                    return layui.layer.msg('更新列表失败');
                }
                layui.layer.msg('更新列表成功');
                layui.layer.close(editList);
                getArticle();
            }
        })
    })

    $('tbody').on('click','.del_btn', function() {
        var id = $(this).attr('data-id');
        console.log(id);
        layui.layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layui.layer.msg('删除数据失败');
                    }
                    layui.layer.msg('删除数据成功');
                    getArticle();
                }
            })
            
            layer.close(index);
          });
    })














})