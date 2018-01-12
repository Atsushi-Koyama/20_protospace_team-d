$(function() {
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
});
