// pages/sm/sm.js
var wxbarcode=require('../../utils/index')
var times=require('../../utils/times.js')
const db= wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code_id:'',
    id:'',
		user:'',
		times:'',
		duration:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var user=wx.getStorageSync('user')
		this.setData({
			user:user,
			id:user.id,
			duration:user.duration,
			code_id:user.id.toString().substr(-4).padStart(user.id.toString().length,"*")
		})
    wxbarcode.barcode('barcode',user.id.toString(),600,100)
    wxbarcode.qrcode('qrcode',user.id.toString(),380,380)
  
	},
	openqr:function(){
				var id=this.data.id
				var duration=this.data.duration
        var bhxx=''//编号
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        var Y =date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
				var sj=+Y+"/"+M+"/"+D+" "//时间
        wx.scanCode({
          onlyFromCamera: true,
          success (res) {
            console.log(res.result)
						var resultid=res.result
            db.collection("application").where({
							relevancy:res.result,
							id:id
						}).get().then(res=>{
              if(res.data.length!=0){
                if(res.data[0].qdzt==0){
                  db.collection("application").where({
										relevancy:res.result,
										id:id
									}).update({
                  data:{
                      qdzt:true
                    },
                    success:res=>{
											console.log(res)
                      wx.showToast({
                        title: '签到成功',
                        icon: 'success',
                        duration: 2000,
											})
                    }
									})
									db.collection("activity").where({
										_id:res.result
									}).get().then(res=>{
										db.collection("users").where({
											id:id
										}).update({
											data:{
												duration:duration+res.data[0].times
											}
										})
									})
									wx.switchTab({
										url: '../home/home',
									})
                }else{
                  wx.showToast({
                    title: '您已签到',
                    icon: 'success',
                    duration: 2000,
                  })
                }
              }else{
                wx.showToast({
                  title:'未参加当前活动',
                  icon:'error',
                  duration:2000,
                })
              }
    
            })
            /**/
          }
        })
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

  }
})