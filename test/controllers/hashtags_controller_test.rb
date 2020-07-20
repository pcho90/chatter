require 'test_helper'

class HashtagsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @hashtag = hashtags(:one)
  end

  test "should get index" do
    get hashtags_url, as: :json
    assert_response :success
  end

  test "should create hashtag" do
    assert_difference('Hashtag.count') do
      post hashtags_url, params: { hashtag: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show hashtag" do
    get hashtag_url(@hashtag), as: :json
    assert_response :success
  end

  test "should update hashtag" do
    patch hashtag_url(@hashtag), params: { hashtag: {  } }, as: :json
    assert_response 200
  end

  test "should destroy hashtag" do
    assert_difference('Hashtag.count', -1) do
      delete hashtag_url(@hashtag), as: :json
    end

    assert_response 204
  end
end
