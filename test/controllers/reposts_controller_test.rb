require 'test_helper'

class RepostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @repost = reposts(:one)
  end

  test "should get index" do
    get reposts_url, as: :json
    assert_response :success
  end

  test "should create repost" do
    assert_difference('Repost.count') do
      post reposts_url, params: { repost: { comment_id: @repost.comment_id, post_id: @repost.post_id, user_id: @repost.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show repost" do
    get repost_url(@repost), as: :json
    assert_response :success
  end

  test "should update repost" do
    patch repost_url(@repost), params: { repost: { comment_id: @repost.comment_id, post_id: @repost.post_id, user_id: @repost.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy repost" do
    assert_difference('Repost.count', -1) do
      delete repost_url(@repost), as: :json
    end

    assert_response 204
  end
end
