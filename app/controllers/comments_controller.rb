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
    @comment = Comment.find(params[:id])
    if @comment.destroy
      respond_to do |format|
        format.html { redirect_to prototype_path }
        format.json
      end
    else
      flash.now[:alert] = "削除できませんでした。"
      render :show
    end
  end

  def edit
  end


  def update
    @comment = Comment.find(params[:id])
    if @comment.update(text: params[:text], prototype_id: params[:prototype_id], user_id: current_user.id)
      respond_to do |format|
        format.html { redirect_to prototype_path }
        format.json
      end
    else
      flash.now[:alert] = "編集できませんでした。"
      render :show
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:text)
  end
end

