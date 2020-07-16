class RepostsController < ApplicationController
  before_action :set_repost, only: [:show, :update, :destroy]

  # GET /reposts
  def index
    @reposts = Repost.all

    render json: @reposts, include: [:post, :comment, :user]
  end

  # GET /reposts/1
  def show
    render json: @repost, include: [:post, :comment, :user]
  end

  # POST /reposts
  def create
    @repost = Repost.new(repost_params)

    if @repost.save
      render json: @repost, status: :created, location: @repost
    else
      render json: @repost.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reposts/1
  def update
    if @repost.update(repost_params)
      render json: @repost
    else
      render json: @repost.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reposts/1
  def destroy
    @repost.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repost
      @repost = Repost.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def repost_params
      params.require(:repost).permit(:user_id, :post_id, :comment_id)
    end
end
