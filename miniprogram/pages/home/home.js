// pages/index/index.js
const db=wx.cloud.database()
var times = require('../../utils/times.js')
Page({
	data: {
		imglist:'',
		msgList:'',
		activity:'',
		navBarHeight:0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
	},
	gg:function(){
		wx.navigateTo({
			url: '../news_list/news_list',
		})
	},
	zyhd:function(e){
		console.log(e.currentTarget.id)
		wx.navigateTo({
			url: '../activity/activity?text_id='+e.currentTarget.id,
		})
	},
	activity:function(){
		wx.navigateTo({
			url: '../activity_list/activity_list',
		})
	},
	signin:function(){
		wx.navigateTo({
			url: '../sign-in/sign-in',
		})
	},
	ranking:function(){
		wx.navigateTo({
			url: '../activity_ranking/activity_ranking',
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		
		db.collection("banner").get({
			success:res=>{
				console.log(res)
				this.setData({
					imglist:res.data
				})
			}
		})
		db.collection("tzgg").get({
			success:res=>{
				console.log(res)
				this.setData({
					msgList:res.data
				})
			}
		})
		db.collection("activity").get({
			success:res=>{
				console.log(res)
				for(var i=0;i<res.data.length;i++){
					console.log(res.data[i]["deadline"])
					res.data[i]["deadline"] = times.toDate(res.data[i]["deadline"])
				}
				this.setData({
					activity:res.data
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})