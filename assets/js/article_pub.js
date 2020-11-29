$(function () {

    initcate()
    function initcate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlstr = template('tpl-select', res);
                $('[name=cate_id]').html(htmlstr);
                //调用form.render方法进行渲染
                layui.form.render();
            }
        })
    }
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btn_chooseimg').on('click', function () {
        $('#cover').click();
    })
    $('#cover').on('change', function (e) {
        var files = e.target.files;
        if (files.length == 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //发布功能
    var art_status = '已发布';

    $('#savaDate').on('click', function () {
        console.log(art_status);
    })
    //监听表单提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($('#form-pub')[0])
        fd.append('state', art_status);
        console.log(fd);

        //将裁减后的封面加入到fd中
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                fd.forEach(function(k,y) {
                    console.log(k,y);
                })
                $.ajax({
                    method: 'post',
                    url: '/my/article/add',
                    data: fd,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layui.layer.msg('发布文章失败');
                        }
                        layui.layer.msg('发布文章成功')
                        location.href = 'article_list.html';
                    }
                })
            });



    })



















})