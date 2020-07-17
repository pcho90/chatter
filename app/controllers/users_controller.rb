class UsersController < ApplicationController
  before_action :set_user, only: [:update, :destroy, :show]
  # before_action :authorize_request, except: :create

  # GET /users
  def index
    @users = User.all

    render json: @users, include: [:posts, :comments, :likes ]
  end

  # GET /users/1
  def show
    render json: @user, :include => [{ :posts => { :include => { :comments => { :include => :subcomments }}}}, :likes, :followers, :following, :reposts => { :include => [:post, :user] } ]
  end

  # POST /users
  def create
    @user = User.new(user_params)
    
    if @user.save
      @token = encode({id: @user.id})
      render json: {
        user: @user.attributes.except(:password_digest),
        token: @token
        }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find_by(username: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password, :name, :subtitle)
    end
end
