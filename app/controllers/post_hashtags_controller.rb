class PostHashtagsController < ApplicationController
  before_action :set_post_hashtag, only: [:show, :update, :destroy]

  # GET /post_hashtags
  def index
    @post_hashtags = PostHashtag.all

    render json: @post_hashtags
  end

  # GET /post_hashtags/1
  def show
    render json: @post_hashtag
  end

  # POST /post_hashtags
  def create
    @post_hashtag = PostHashtag.new(post_hashtag_params)

    if @post_hashtag.save
      render json: @post_hashtag, status: :created, location: @post_hashtag
    else
      render json: @post_hashtag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /post_hashtags/1
  def update
    if @post_hashtag.update(post_hashtag_params)
      render json: @post_hashtag
    else
      render json: @post_hashtag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /post_hashtags/1
  def destroy
    @post_hashtag.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post_hashtag
      @post_hashtag = PostHashtag.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_hashtag_params
      params.require(:post_hashtag).permit(:post_id, :hashtag_id)
    end
end
