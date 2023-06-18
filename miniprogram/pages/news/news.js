// pages/news/news.js
const db=wx.cloud.database()
var times = require('../../utils/times.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		text_id:'',
		title:'',
		_createTime:'',
		content:'',
		people:'',
		relevancy:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			text_id:options.text_id
		})
		db.collection("tzgg").doc(this.data.text_id).get().then(res=>{
			console.log(res.data.relevancy)
			res.data._createTime = times.toDate(res.data._createTime)
			this.setData({
				title:res.data.title,
				_createTime:res.data._createTime,
				content:res.data.content,
				people:res.data.people,
				relevancy:res.data.relevancy
			})
		})
	},
	relevancy:function(e){
		wx.navigateTo({
			url: '../activity/activity?text_id='+e.currentTarget.id,
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