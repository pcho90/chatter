require 'test_helper'

class PostHashtagsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post_hashtag = post_hashtags(:one)
  end

  test "should get index" do
    get post_hashtags_url, as: :json
    assert_response :success
  end

  test "should create post_hashtag" do
    assert_difference('PostHashtag.count') do
      post post_hashtags_url, params: { post_hashtag: { hashtag_id_id: @post_hashtag.hashtag_id_id, post_id_id: @post_hashtag.post_id_id } }, as: :json
    end

    assert_response 201
  end

  test "should show post_hashtag" do
    get post_hashtag_url(@post_hashtag), as: :json
    assert_response :success
  end

  test "should update post_hashtag" do
    patch post_hashtag_url(@post_hashtag), params: { post_hashtag: { hashtag_id_id: @post_hashtag.hashtag_id_id, post_id_id: @post_hashtag.post_id_id } }, as: :json
    assert_response 200
  end

  test "should destroy post_hashtag" do
    assert_difference('PostHashtag.count', -1) do
      delete post_hashtag_url(@post_hashtag), as: :json
    end

    assert_response 204
  end
end
