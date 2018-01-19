class PrototypesController < ApplicationController
  before_action :set_prototype, only: :show

  def index
    @prototypes = Prototype.all
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
end
