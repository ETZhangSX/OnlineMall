// pages/searchResult/searchResult.js
var searchKey = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    search_Key: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    searchKey = options.searchKey;
    console.log(searchKey);
    that.setData ({
      search_Key: searchKey
    })
    that.resultShow();
  },

  resultShow: function(e) {
    var that = this;
    const db = wx.cloud.database()
    // const _ = db.command
    db.collection('goods').where({
      title: db.RegExp({
        regexp: searchKey,
        options: 'i',
      })
    })
      .get({
        success(res) {
          console.log(res.data)
          that.setData ({
            result: res.data
          })

        }
      })
  },

  onSearch: function(e) {
    var that = this;
    searchKey = e.detail;
    console.log(searchKey);
    that.setData ({
      search_Key: searchKey
    })
    that.resultShow();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //跳转到详情页
  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    var dbName = e.currentTarget.dataset.dbname;
    console.log('goodsId:' + goodsId);
    //新增商品用户点击数量
    // that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({
      url: '../detail/detail?goodsId=' + goodsId + '&dbName=' + dbName
    })
  },
})