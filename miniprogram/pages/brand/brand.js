var sectionData = [];
var activityId = null;
Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  onLoad: function (options) {
    activityId = options.activityId;
    console.log('activityId:' + activityId);
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

        //加载首组图片
        // this.loadImages();
        this.brandShow();
      }
    })
  },

  onImageLoad1: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;       
    let imgHeight = oImgH * scale;      //自适应高度

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

  brandShow: function (success) {
    var that = this;
    console.log(page)
    const db = wx.cloud.database()

    db.collection('goods').get({
      success(res) {
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

  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('goodsId:' + goodsId);
    // //新增商品用户点击数量
    // that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
  },
  goodsClickShow(goodsId) {
    console.log('增加商品用户点击数量');
    var that = this;
  },
})
