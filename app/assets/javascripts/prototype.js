$(function() {
  // プレビュー機能実装
  $("#prototype_captured_images_attributes_0_content").change(function(){
    if (!this.files.length) {
      return;
    }
    var file = this.files[0]
    var image = $('#main_image_uploader')
    fileReader = new FileReader()

    fileReader.onload = function(event) {
      image.children('img').attr('src', event.target.result)
      image.imgLiquid()
    };
    fileReader.readAsDataURL(file);
  });

  $("#prototype_captured_images_attributes_1_content").change(function(){
    if (!this.files.length) {
      return;
    }
    var file = this.files[0]
    var image = $('.image-upload_1')
    fileReader = new FileReader()

    fileReader.onload = function(event) {
      image.children('img').attr('src', event.target.result)
      image.imgLiquid()
    };
    fileReader.readAsDataURL(file);
  });

  $("#prototype_captured_images_attributes_2_content").change(function(){
    if (!this.files.length) {
      return;
    }
    var file = this.files[0]
    var image = $('.image-upload_2')
    fileReader = new FileReader()

    fileReader.onload = function(event) {
      image.children('img').attr('src', event.target.result)
      image.imgLiquid()
    };
    fileReader.readAsDataURL(file);
  });

  $("#prototype_captured_images_attributes_3_content").change(function(){
    if (!this.files.length) {
      return;
    }
    var file = this.files[0]
    var image = $('.image-upload_3')
    fileReader = new FileReader()

    fileReader.onload = function(event) {
      image.children('img').attr('src', event.target.result)
      image.imgLiquid()
    };
    fileReader.readAsDataURL(file);
  });

  // いいね機能実装
  function likeHTML(likes){
    var html = '<button class="like">'
               + '<i class="fa fa-heart fa-1x"></i>'
               + 'LIKE'
               + '<span class="count">'
               + likes.length
               + '</span>'
               + '</button>'
    return html;
   }

   function likedHTML(likes){
    var html = '<button class="liked">'
               + '<i class="fa fa-heart fa-1x"></i>'
               + 'LIKE'
               + '<span class="count">'
               + likes.length
               + '</span>'
               + '</button>'
    return html;
   }

  $(".button_likes").on("click", function(){
    if ($("button").hasClass("liked")){
      var prototype_id = $(this).data("prototype-id")
      var user_id = $(this).data("user-id")
      $.ajax({
        url: "/like/" + prototype_id,
        type: "DELETE",
        data: { prototype_id: prototype_id, user_id: user_id },
        dataType: "json"
      })
      .done(function(data){
        var html = likeHTML(data);
        $(".button_likes").html(html);
      })
      .fail(function() {
        alert('通信エラー');
      })
    }else{
      var prototype_id = $(this).data("prototype-id")
      var user_id = $(this).data("user-id")
      $.ajax({
        url: "/like/" + prototype_id,
        type: "POST",
        data: { prototype_id: prototype_id, user_id: user_id },
        dataType: "json"
      })
      .done(function(data){
        var html = likedHTML(data);
        $(".button_likes").html(html);
      })
      .fail(function() {
        alert('通信エラー');
      })
    }
  });

  // メッセージ機能実装
  function buildHTML(comment){
    var html = '<div class="comment_each" data-comment-id="' + comment.id + '" data-prototype-id="' + comment.prototype_id + '">'
               + '<h5 class="user_name">'
               + comment.name
               + "</h5>"
               + '<p class="comment_text">'
               + comment.text
               + "</p>"
               + '<a href="/prototypes/' + comment.prototype_id + "/comments/" + comment.id + '">'
               + '<p class="comment_destroy">削除</p></a>'
               + '<a>'
               + '<p class="comment_edit">編集</p></a>'
               + "</div>"
    return html;
  }

  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comment_list').append(html);
      $('.input--message').val('');
    })
    .fail(function(){
      alert('通信エラー');
    })
    return false;
  })

  // メッセージ機能実装(削除)
  $(".comment_list").on("click", ".comment_destroy", function(){
    var comment_id = $(this).parent().parent().data('comment-id')
    var prototype_id = $(this).parent().parent().data("prototype-id")
    var comment_each = $(this)
    $.ajax({
      url: "/prototypes/" + prototype_id + "/comments/" + comment_id,
      type: "DELETE",
      data: { prototype_id: prototype_id, id: comment_id },
      dataType: "json"
    })
    .done(function(){
      comment_each.parent().parent().remove();
      alert("コメントを削除しました。");
    })
    .fail(function() {
      alert('通信エラー');
    })
    return false;
  });

  // メッセージ機能実装(編集・記入部分表示)
  function buildEditForm(comment, prototype){
    var html = '<form class="edit_comment" id="edit_comment" action="/prototypes/' + prototype + '/comments/' + comment + '" method="patch">'
               + '<textarea name="text">'
               + '</textarea>'
               + '<input type="submit" value="EDIT" class="edit_btn">'
               + '</form>'
    return html;
  }

  $(".comment_list").on("click", ".comment_edit", function(){
    var comment_id = $(this).parent().parent().data('comment-id')
    var prototype_id = $(this).parent().parent().data("prototype-id")
    var html = buildEditForm(comment_id, prototype_id);
    $(this).parent().parent().append(html);
    $(this).remove();
  });

  // メッセージ機能実装(編集・アップデート)
  function buildUpdateHTML(comment){
    var html = '<h5 class="user_name">'
               + comment.name
               + "</h5>"
               + '<p class="comment_text">'
               + comment.text
               + "</p>"
               + '<a href="/prototypes/' + comment.prototype_id + "/comments/" + comment.id + '">'
               + '<p class="comment_destroy">削除</p></a>'
               + '<a>'
               + '<p class="comment_edit">編集</p></a>'
    return html;
  }

  $('.comment_list').on('submit', '#edit_comment', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    var edit_comment = $(this)
    $.ajax({
      url: url,
      type: "PATCH",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      var html = buildUpdateHTML(data);
      edit_comment.parent().html(html);
    })
    .fail(function(){
      alert('通信エラー');
    })
    return false;
  })

});
