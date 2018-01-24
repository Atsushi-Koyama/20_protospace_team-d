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
  $(".button_likes").on("click", function(){
    if ($("button").hasClass("liked")){
      var prototype_id = $(this).data("prototype-id")
      var user_id = $(this).data("user-id")
      $.ajax({
        url: "/like/" + prototype_id + ".js",
        type: "delete",
        data: { prototype_id: prototype_id },
        dataType: "json"
      })
      .done(function(data){
        $(".liked").remove()
      })
      .fail(function() {
        setTimeout(function(){
          location.reload();
        },1);
      })
    }else{
      var prototype_id = $(this).data("prototype-id")
      var user_id = $(this).data("user-id")
      $.ajax({
        url: "/like/" + prototype_id + ".js",
        type: "post",
        data: { prototype_id: prototype_id, user_id: user_id },
        dataType: "json"
      })
      .done(function(data){
        $(".like").remove()
      })
      .fail(function() {
        setTimeout(function(){
          location.reload();
        },1);
      })
    }
  });

  // メッセージ機能実装
  function buildHTML(comment){
    var html = '<h5 class="user_name">'
               + comment.name
               + "</h5>"
               + '<p class="comment_text">'
               + comment.text
               + "</p>"
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
});
