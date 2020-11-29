$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    var data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    // var q = {
    //     pagenum: 1, // 页码值，默认请求第一页的数据
    //     pagesize: 2, // 每页显示几条数据，默认每页显示2条
    //     cate_id: '', // 文章分类的 Id
    //     state: '' // 文章的发布状态
    //   }
    // 定义时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
         return n > 9 ? n : '0' + n
        }
        initTable()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取数据列表失败');
                }
                // console.log(res);
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
                renderPage(res.total)
            }
        })
    }
    initSelect();
    //渲染下拉选择框
    function initSelect() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var htmlstr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlstr)
                layui.form.render()
            }
        })
    }

    $('#form-earch').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        data.cate_id =cate_id;
        data.state = state;
        initTable();
    })

    //定义分页的方法
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pagebox',
            count: total,
            limit: data.pagesize,
            curr: data.pagenum,
            limits: [2, 3, 4, 5, 10],
            layout: ['count','limit','prev', 'page', 'next','skip'],
            jump: function(obj, first) {
             data.pagenum = obj.curr;
             data.pagesize = obj.limit;
             if(!first) {
                initTable()
             }
            }
        })
    }

    //删除功能,绑定删除点击事件
    $('tbody').on('click','.btn-del', function() {
        var id = $(this).attr('data-id')
        var len = $('.btn-del').length;
        layui.layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if(res.status!==0) {
                        return layui.layer.msg('删除文章失败');
                    }
                    layui.layer.msg('删除文章成功');

                    if(len === 1) {
                        data.pagenum = data.pagenum ===1 ? 1:data.pagenum -1;
                    }
                    initTable()
                }

            })
            layer.close(index);
          });
    })

    //文章的编辑功能
    $('tbody').on('click', '.btn-edit', function() {
        // console.log(1);
        var id = $(this).attr('data-id');
        console.log(id);
        // location.href = 'article_pub.html';
        //根据id获取文章详情
        $.ajax({
            method: 'get',
            url: '/my/article/' + id,
            success: function(res) {
                // console.log(res);
                
            }
        })
        console.log(2);
    })
























})