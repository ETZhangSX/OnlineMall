// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      "https://m.360buyimg.com/n12/jfs/t11317/108/1080677336/325163/f4c2a03a/59fd8b17Nbe2fcca3.jpg!q70.jpg",
      "https://m.360buyimg.com/n12/jfs/t11575/282/348533702/60173/d75cd1cc/59edb8d6N688b420f.jpg!q70.jpg",
      "https://m.360buyimg.com/n12/jfs/t11536/279/360605865/15194/442cab0b/59edb8d3N163a7608.jpg!q70.jpg",
      "https://m.360buyimg.com/n12/s750x750_jfs/t9733/126/2033941175/68120/a4eb4468/59edb8d6N37bea6f7.jpg!q70.jpg",
      "https://m.360buyimg.com/n12/s750x750_jfs/t10744/195/2053933852/71608/94425578/59edb8d6Ne28c70ff.jpg!q70.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    detailImg: [
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_0_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_500_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_1000_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_1500_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_2000_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_2500_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_3000_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_3500_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_4000_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_4500_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_5000_750_500&imageView&thumbnail=710x0&quality=85",
      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_5500_750_500&imageView&thumbnail=710x0&quality=85",

      "https://haitao.nosdn1.127.net/8b8f60cb94b148e485dd50934e35ecca1511959468798jal1mola10610.jpg?imageView&quality=98&crop=0_6000_750_500&imageView&thumbnail=710x0&quality=85",

      "https://haitao.nos.netease.com/a108a6ae73914a91b7e07b8cc0ad32ad1511959470997jal1mqad10611.jpg?imageView&quality=98&crop=0_7500_750_500&imageView&thumbnail=710x0&quality=85",

      "https://haitao.nos.netease.com/a108a6ae73914a91b7e07b8cc0ad32ad1511959470997jal1mqad10611.jpg?imageView&quality=98&crop=0_8000_750_500&imageView&thumbnail=710x0&quality=85",

      "https://haitao.nos.netease.com/a108a6ae73914a91b7e07b8cc0ad32ad1511959470997jal1mqad10611.jpg?imageView&quality=98&crop=0_8500_750_500&imageView&thumbnail=710x0&quality=85",

      "https://haitao.nos.netease.com/a108a6ae73914a91b7e07b8cc0ad32ad1511959470997jal1mqad10611.jpg?imageView&quality=98&crop=0_9000_750_500&imageView&thumbnail=710x0&quality=85",

      "https://haitao.nos.netease.com/a108a6ae73914a91b7e07b8cc0ad32ad1511959470997jal1mqad10611.jpg?imageView&quality=98&crop=0_9500_750_376&imageView&thumbnail=710x0&quality=85",
    ],
    quantity1: {
      quantity: 1,
      min: 1,
      max: 20,
      delStatus: 'disabled',
      addStatus: 'normal'
    },
    isLike: true,
    showDialog: false, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  /**
     * sku 弹出
     */
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function () {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  /* 减数 */
  delCount: function (e) {
    console.log("刚刚您点击了减一");
    var count = this.data.quantity1.quantity;
    // 商品总数量-1
    if (count > 1) {
      count -= 1;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态  
    var addStatus = count >= 10 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity1: {
        quantity: count,
        delStatus: delStatus,
        addStatus: addStatus
      }
    });
  },
  /* 加数 */
  addCount: function (e) {
    console.log("刚刚您点击了加一");
    var count = this.data.quantity1.quantity;
    // 商品总数量-1  
    if (count < 10) {
      count += 1;
    }

    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态  
    var addStatus = count >= 10 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity1: {
        quantity: count,
        delStatus: delStatus,
        addStatus: addStatus
      }
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var count = this.data.quantity1.quantity;
    // 将数值与状态写回  
    this.setData({
      count: count
    });
  },
  /**
   * 加入购物车
   */
  addCar: function (e) {
    console.log(e.target.dataset.goodid);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
})