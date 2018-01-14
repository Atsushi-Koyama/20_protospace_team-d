$(function() {
  function append_like(like) {
    var html = `<button class="like">
                  <i class="fa fa-heart fa-1x"></i>
                  LIKE
                  <span class="count">${ like.count }</span>
                </button>`
    $(".button_likes").append(html);
  }

  function append_liked(like) {
    var html = `<button class="liked">
                  <i class="fa fa-heart fa-1x"></i>
                  LIKE
                  <span class="count">${ like.count }</span>
                </button>`
    $(".button_likes").append(html);
  }

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

  $(".button_likes").on("click", function(){
    console.log("test")
    if ($("button").hasClass("liked")){
      $.ajax({
        url: "/likes/" + $(this).data("prototype-id"),
        type: "delete",
        data: { prototype_id: $(this).data("prototype-id") },
        dataType: "json"
      })
      .done(function(data){
        $(".liked").remove()
        append_like(data);
      })
    }else{
      $.ajax({
        url: "/likes",
        type: "post",
        data: { prototype_id: $(this).data("prototype-id") },
        dataType: "json"
      })
      .done(function(data){
        $(".like").remove()
        append_liked(data);
      })
    }
  });
});
