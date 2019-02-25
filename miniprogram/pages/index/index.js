//index.js
const app = getApp()
var sectionData = [];
var activityId = null;
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    openid: '123',
    navbar: ['推荐', '男装', '海淘', '电器', '母婴', '居家'],
    currentTab: 0,
    indexTab: 0,
    // 热销榜
    goodsWelfareItems: [],

    goodsHotItems: [],
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        var that = this;
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log(res.result.openid)
            //渲染首页数据
            that.showGoodsInfo();
          },
          fail: err => {
            console.error('失败', err)
            wx.navigateTo({
              url: '../deployFunctions/deployFunctions',
            })
          }
        })
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      wx.navigateTo({
        url: '../userProfile/userProfile',
      })
    }
  },

  showGoodsInfo: function(e) {
    //读取云数据库
    const db = wx.cloud.database()
    var that = this;
    //热销榜
    db.collection('hots').get({
      success(result) {
        that.setData({
          goodsHotItems: result.data
        })
        // console.log(that.data.goodsHotItems)
      }
    })

    //商品
    db.collection('goods').get({
      success(result) {
        var goodsInfo = result.data;
        for (var i in goodsInfo) {
          //商品名称长度处理
          var name = goodsInfo[i].name;
          if (name.length > 27) {
            goodsInfo[i].name = name.substring(0, 24) + '...';
          }
        }
        that.setData({
          goodsWelfareItems: goodsInfo
        })
        console.log(that.data.goodsWelfareItems)
      }
    })
  },

  //跳转到详情页
  catchTapCategory: function(e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    var dbName = e.currentTarget.dataset.dbname;
    console.log('goodsId:' + goodsId);
    //跳转商品详情
    wx.navigateTo({
      url: '../detail/detail?goodsId=' + goodsId + '&dbName=' + dbName
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  onImageLoad1: function(e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW;
    let imgHeight = oImgH * scale; //自适应高度

    let images = this.data.brandGoods;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img._id + "" === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
      col1.push(imageObj);
    } else {
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  brandShow: function(success) {
    var that = this;
    const db = wx.cloud.database()
    var currentTab = that.data.currentTab;
    console.log("enter")
    db.collection('goods').where({
      type: currentTab.toString()
    }).get({
      success(res) {
        console.log("success");
        var newGoodsData = res.data;
        sectionData['brandGoods'] = newGoodsData;
        that.setData({
          brandGoods: sectionData['brandGoods'],
          loadingCount: sectionData['brandGoods'].length,
        });
        console.log(that.data.brandGoods)
        wx.stopPullDownRefresh();
      }
    })
  },
  // 导航切换监听
  navbarTap: function(e) {
    var that = this;
    var tab = e.currentTarget.dataset.idx;
    console.log(tab);
    //防止重复触发
    if (tab != that.data.currentTab) {
      that.setData({
        currentTab: tab,
        col1: [],
        col2: []
      });
      console.log(that.data.currentTab);
      that.brandShow();
    }

  },
  //加载更多
  // onReachBottom: function() {
  //   console.log('加载更多');
  //   setTimeout(() => {
  //     this.setData({
  //       isHideLoadMore: true,
  //     })
  //   }, 500)
  // },

  toCart: function() {
    console.log("jump tp cart");
    wx.navigateTo({
      url: '../cart/cart',
    });
  },

  onSearch: function(e) {
    var searchKey = e.detail;
    console.log(searchKey);
    //防止未输入关键字即跳转
    if (searchKey != null && searchKey != '') {
      wx.navigateTo({
        url: '../searchResult/searchResult?searchKey=' + searchKey,
      })
    }

  },
})