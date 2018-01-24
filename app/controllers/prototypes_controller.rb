class PrototypesController < ApplicationController
  before_action :set_prototype, only: :show

  def index
    @prototypes = Prototype.all.page(params[:page]).per(8)
  end

  def new
    @prototype = Prototype.new
    @prototype.captured_images.build
  end

  def create
    @prototype = Prototype.new(prototype_params)
    if @prototype.save
      redirect_to root_path, notice: 'New prototype was successfully created'
    else
      redirect_to  new_prototype_path, alert: 'New prototype was unsuccessfully created'
    end
  end

  def destroy
    prototype = Prototype.find(params[:id])
    prototype.destroy if prototype.user_id == current_user.id
    redirect_to :root, notice: 'Prototype was successfully updated.'
  end

  def edit
    @prototype = Prototype.find(params[:id])
    @captures = @prototype.captured_images
      @captures.each do |capture|
      if capture.status == "main"
        @main_image = capture
      else
        @sub_image = capture
      end
    end
    return @main_image
    return @sub_image
  end

  def update
    prototype = Prototype.find(params[:id])
    if prototype.user_id == current_user.id
      prototype.update(update_prototype_params)
      redirect_to :root, notice: "prototype was successfully updated"
    else
      render :edit
    end
  end


  def show
    @prototype = Prototype.find(params[:id])
    @likes = Like.where(prototype_id: params[:id])
    @comments = @prototype.comments.includes(:user)
    @comment = Comment.new
  end

  private

  def set_prototype
    @prototype = Prototype.find(params[:id])
  end

  def prototype_params
    params.require(:prototype).permit(
      :title,
      :catch_copy,
      :concept,
      :user_id,
      captured_images_attributes: [:content, :status]
    )
  end

  def update_prototype_params
    params.require(:prototype).permit(:title,:catch_copy,:concept,:user_id,captured_images_attributes: [:content, :status, :id])
  end
end
