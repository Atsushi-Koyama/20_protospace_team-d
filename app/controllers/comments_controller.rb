class CommentsController < ApplicationController
  def create
    @comment = Comment.new(text: comment_params[:text], prototype_id: params[:prototype_id], user_id: current_user.id)
    if @comment.save
      respond_to do |format|
        format.html { redirect_to prototype_path }
        format.json
      end
    else
      flash.now[:alert] = "メッセージを入力してください。"
      render :show
    end
  end

  def destroy
  end

  def edit
  end

  private
  def comment_params
    params.require(:comment).permit(:text)
  end
end
