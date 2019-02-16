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
    currentTab: 0,
    // 热销榜
    goodsWelfareItems: [],
 
    goodsHotItems: []
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
              // console.log(result.data)
              that.setData({
                goodsHotItems: result.data
              })
              // console.log(that.data.goodsHotItems)
            }
        })

        //商品目录
        db.collection('goods').get({
            success(result) {
              // res.data 是包含以上定义的两条记录的数组
              console.log(result.data)
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
  onShow: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onAddHotsData: function() {
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

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
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

  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

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
  navbarTap: function(e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //加载更多
  onReachBottom: function() {
    console.log('加载更多');
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
        goodsWelfareItems: [{
            goodId: 0,
            name: '泊尔崖蜜蜜光面膜（5片盒装）',
            url: 'bill',
            imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/142/fb2960bf8e074d029c24315279289c19-5_218x274_70.jpg',
            newprice: "86",
            oldprice: "88",
            discount: "8.8",
          },
          {
            goodId: 1,
            name: '透无瑕矿物养护两用粉饼#03',
            url: 'bill',
            imageurl: 'https://a4.vimage1.com/upload/merchandise/pdcvis/2017/08/21/27/4b24e2a629644877866d3da755f6a36e-5_218x274_70.jpg',
            newprice: "147.00",
            oldprice: "150.00",
            discount: "8.8",
          },
          {
            goodId: 2,
            name: '川水水光面膜（5片盒装）',
            url: 'bill',
            imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/08/21/86/7891361fdab348a1bc91aeca31fc77b1-5_218x274_70.jpg',
            newprice: "86.00",
            oldprice: "88.00",
            discount: "8.8",
          },
          {
            goodId: 3,
            name: '蜜三色渐变咬唇膏3.2g 03蜜橙动心恋',
            url: 'bill',
            imageurl: 'http://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/21/176/c3b9453a4d7f46c6a8fe78705f77352b-5_218x274_70.jpg',
            newprice: "97.00",
            oldprice: "99.00",
            discount: "8.8",
          },
          {
            goodId: 4,
            name: '时焕颜亮采套装',
            url: 'bill',
            imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/08/21/93/69a6bc1c11eb4be184b7dffb43b8565b-5_218x274_70.jpg',
            newprice: "398.00",
            oldprice: "459.00",
            discount: "8.8",
          }, {
            goodId: 5,
            name: '雪域眼霜套装',
            url: 'bill',
            imageurl: 'https://a4.vimage1.com/upload/merchandise/pdcvis/2017/08/23/127/53409c86f74647af915bc379427b97c2-5_218x274_70.jpg',
            newprice: "238.00",
            oldprice: "358.00",
            discount: "8.8",
          }, {
            goodId: 6,
            name: '凝时鲜颜冰肌水套装',
            url: 'bill',
            imageurl: 'https://a2.vimage1.com/upload/merchandise/pdcvis/2017/11/13/95/fb6c3d0c1f304b449dadb1f0100c1205-5_218x274_70.jpg',
            newprice: "248.00",
            oldprice: "348.00",
            discount: "8.8",
          }, {
            goodId: 7,
            name: '雪润皙白精选三件套',
            url: 'bill',
            imageurl: 'https://a3.vimage1.com/upload/merchandise/pdcvis/2017/08/30/184/a5000156098940b5a05a0e696535ac20-5_218x274_70.jpg',
            newprice: "348.00",
            oldprice: "396.00",
            discount: "8.8",
          }
        ],
      })
    }, 500)
  }
})