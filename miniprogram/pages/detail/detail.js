// pages/detail/detail.js
var goods = null;
var goodsId = null;
var dbName = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    goods: null,
    isLike: false,
    showDialog: false,
    totalMoney: 2698.00,
  },

  onWriteData: function() {
    const db = wx.cloud.database();
    var that = this;
    var goodsItem = {
      name: that.data.name,
      price: that.data.price,
      privilegePrice: that.data.privilegePrice,
      discount: that.data.discount,
      imgUrls: that.data.imgUrls,
      detailImg: that.data.detailImg,
      inStock: that.data.buyRate,
      goodsId: that.data.goodsId,
    }
    // for (var i = 0; i < this.data.goodsWelfareItems.length; i++) {
    db.collection('goods').add({
      data: goodsItem,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('失败：', err)
      }
    })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    goodsId = options.goodsId;
    dbName = options.dbName;
    console.log(goodsId);
    console.log(dbName);
    that.goodsInfoShow();
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
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  //
  goodsInfoShow: function(success) {
    var that = this;
    const db = wx.cloud.database();
    var goodsItem = null;

    db.collection(dbName).doc(goodsId).get({
      success(res) {
        goodsItem = res.data;
        console.log(goodsItem);
        goods = {
          imgUrls: goodsItem.imgUrls,
          title: goodsItem.title,
          price: goodsItem.price,
          privilegePrice: goodsItem.privilegePrice,
          discount: goodsItem.discount,
          detailImg: goodsItem.detailImg,
          imgUrl: goodsItem.imageurl,
          buyRate: goodsItem.inStock, //库存
          goodsId: goodsItem.goodsId,
          count: 1,
          totalMoney: goodsItem.price,
        }

        console.log(goods);
        that.setData({
          goods: goods
        })
      }
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
  toggleDialog: function() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function() {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  /* 减数 */
  delCount: function(e) {
    // console.log("刚刚您点击了减一");
    // var count = this.data.goods.count;
    // // 商品总数量-1
    // if (count > 1) {
    //   count -= 1;
    // }
    // // 只有大于一件的时候，才能normal状态，否则disable状态  
    // var delStatus = count <= 1 ? 'disabled' : 'normal';
    // // 只有大于10件的时候，才能normal状态，否则disable状态  
    // var addStatus = count >= 10 ? 'disabled' : 'normal';
    // // 将数值与状态写回  
    // this.setData({
    //   quantity1: {
    //     quantity: count,
    //     delStatus: delStatus,
    //     addStatus: addStatus
    //   }
    // });
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count;
    // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function(e) {
    /* console.log("刚刚您点击了加一");
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
    }); */
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    var maxCount = this.data.goods.buyRate;
    // 商品总数量-1  
    if (count < maxCount) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },

  /* 输入框事件 */
  bindManual: function(e) {
    var count = this.data.quantity1.quantity;
    // 将数值与状态写回  
    this.setData({
      count: count
    });
  },

  //价格计算
  priceCount: function(e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /**
   * 加入购物车
   */
  addCar: function(e) {
    // console.log(e.target.dataset.goodid);
    // wx.showToast({
    //   title: '加入购物车成功',
    //   icon: 'success',
    //   duration: 2000
    // });
    // console.info("关闭");
    // this.setData({
    //   showDialog: false
    // });
    var goods = this.data.goods;
    goods.isSelect = false;
    var count = this.data.goods.count;

    var title = this.data.goods.title;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }

    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].goodsId == goodsId) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].count = arr[j].count + 1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    // console.log("跳转购物车");
    wx.navigateTo({
      url: '../cart/cart'
    });
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