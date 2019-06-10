class UsersController < ApplicationController
  
 def index
    
   if params[:group_id].present?
    member_ids = Group.find(params[:group_id]).user_ids
   else
    member_ids = []
    member_ids << current_user.id
   end
   
   @users = User.where('name LIKE(?)',"%#{params[:keyword]}%").where.not(id: member_ids)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit

  end

  def update
    if current_user.update(account_update_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def account_update_params
    params.require(:user).permit(:name, :email)
  end

  
end
