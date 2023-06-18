// pages/news_list/news_list.js
const db=wx.cloud.database()
var times = require('../../utils/times.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		news:''
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		db.collection("tzgg").orderBy('_createTime','desc').get({
			success:res=>{
				for(var i=0;i<res.data.length;i++){
					console.log(res.data[i]["_createTime"])
					res.data[i]["_createTime"] = times.toDate(res.data[i]["_createTime"])
				}
				this.setData({
					news:res.data
				})
			}
		})
	},

	tzgg:function(e){
		console.log(e.currentTarget.id)
		wx.navigateTo({
			url: '../news/news?text_id='+e.currentTarget.id,
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