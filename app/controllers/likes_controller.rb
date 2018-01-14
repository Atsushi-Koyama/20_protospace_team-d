class LikesController < ApplicationController
  def create
    @like = Like.new( prototype_id: params[:prototype_id], user_id: current_user.id )
    if @like.save
      respond_to do |format|
        format.html
        format.json
    end
    @likes = Like.where(prototype_id: params[:prototype_id])
  end

  def destroy
    @like = current_user.likes.find_by(prototype_id: params[:prototype_id])
    if @like.destroy
      respond_to do |format|
        format.html
        format.json
      end
    end
    @likes = Like.where(prototype_id: params[:prototype_id])
  end

  private
    def like_params
      params.require(:like).permit(:prototype_id, :user_id)
    end

end
