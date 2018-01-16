class LikesController < ApplicationController
  def create
    @like = Like.new( prototype_id: params[:prototype_id], user_id: params[:user_id] )
    @likes = Like.where(prototype_id: params[:prototype_id])
    if @like.save
      respond_to do |format|
        format.html
        format.json
      end
    else
      render template: 'prototypes/show'
    end
  end


  def destroy
    @like = current_user.likes.find_by(prototype_id: params[:prototype_id])
    @likes = Like.where(prototype_id: params[:prototype_id])
    if @like.user_id == current_user.id
      @like.destroy
      respond_to do |format|
        format.html
        format.json
      end
    else
      render template: 'prototypes/show'
    end
  end

  private

  def like_params
    params.require(:like).permit(:prototype_id, :user_id)
  end

end
