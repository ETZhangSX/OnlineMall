//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    openid: '123',
    navbar: ['推荐', '男装', '海淘', '电器', '母婴', '居家'],
    currentTab: 1,
    // 热销榜
    goodsWelfareItems: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //读取数据库数据
    const db = wx.cloud.database()
    var that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res.result.openid)
        //热销榜
        db.collection('hots').get({
          success(result) {
            // res.data 是包含以上定义的两条记录的数组
            that.setData({
              goodsHotItems: result.data
            })
            // console.log(that.data.goodsHotItems)
          }
        })

        //商品
        db.collection('goods').get({
          success(result) {
            // res.data 是包含以上定义的两条记录的数组
            that.setData({
              goodsWelfareItems: result.data
            })
            console.log(that.data.goodsWelfareItems)
          }
        })

      },
      fail: err => {
        console.error('失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onAddHotsData: function () {
    const db = wx.cloud.database()
    for (var i = 0; i < this.data.goodsWelfareItems.length; i++) {
      db.collection('goods').add({
        data: this.data.goodsWelfareItems[i],
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
    }
  },

  onGetUserInfo: function (e) {
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

  onGetOpenid: function () {
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

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })

    console.info(e.currentTarget.dataset.idx)
    if (e.currentTarget.dataset.idx == 1) {
      wx.navigateTo({
        url: '../manClothes/manClothes',
      })
    }

    if (e.currentTarget.dataset.idx == 2) {
      wx.navigateTo({
        url: '../haiTao/haiTao',
      })
    }

    if (e.currentTarget.dataset.idx == 3) {
      wx.navigateTo({
        url: '../dianQi/dianQi',
      })
    }

    if (e.currentTarget.dataset.idx == 4) {
      wx.navigateTo({
        url: '../muYing/muYing',
      })
    }

    if (e.currentTarget.dataset.idx == 5) {
      wx.navigateTo({
        url: '../jvJia/jvJia',
      })
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

  toCart: function () {
    console.log("jump tp cart");
    wx.navigateTo({
      url: '../cart/cart',
    });
  },

  onSearch: function (e) {
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