class HashtagsController < ApplicationController
  before_action :set_hashtag, only: [:show, :update, :destroy]

  # GET /hashtags
  def index
    @hashtags = Hashtag.all

    render json: @hashtags, :include => [{ :posts => { :include => :comments }}]
  end

  # GET /hashtags/1
  def show
    render json: @hashtag, :include => [{ :posts => { :include => :comments }}]
  end

  # POST /hashtags
  def create
    @hashtag = Hashtag.new(hashtag_params)

    if @hashtag.save
      render json: @hashtag, status: :created, location: @hashtag
    else
      render json: @hashtag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /hashtags/1
  def update
    if @hashtag.update(hashtag_params)
      render json: @hashtag
    else
      render json: @hashtag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /hashtags/1
  def destroy
    @hashtag.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hashtag
      # @hashtag = Hashtag.find(params[:id])
      @hashtag = Hashtag.find_by(name: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def hashtag_params
      params.require(:hashtag).permit(:name)
    end
end
