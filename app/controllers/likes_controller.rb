class LikesController < ApplicationController
  def create
    @prototype = Prototype.find(params[:prototype_id])
    @like = Like.new( prototype_id: params[:prototype_id], user_id: current_user.id )

    if @like.save
      redirect_to prototype_path(@prototype)
    else
      render :show
    end
  end

  def destroy
  end

  private
    def like_params
      params.require(:like).permit(:prototype_id, :user_id)
    end

end
