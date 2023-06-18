// pages/me/me.js
const timeHelper = require('../../utils/time_helper.js');
const db=wx.cloud.database()
var times = require('../../utils/times.js')
const _ = db.command
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		user:'',
		datatempstart:'',
		datatempend:'',
		activity:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad:function(options) {
	},
	login:function(){
		wx.navigateTo({
			url: '../login/login',
		})
	},
	setup:function(){
		wx.navigateTo({
			url: '../setup/setup',
		})
	},
	regard:function(){
		wx.navigateTo({
			url: '../regard/regard',
		})
	},
	contact:function(){
		wx.navigateTo({
			url: '../contact/contact',
		})
	},
	activity_history:function(){
		wx.navigateTo({
			url: '../activity_history/activity_history',
		})
	},
	my_dynamic:function(){
		wx.navigateTo({
			url: '../my_dynamic/my_dynamic',
		})
	},
	news_manage:function(){
		wx.navigateTo({
			url: '../news_manage/news_manage',
		})
	},
	activity_manage:function(){
		wx.navigateTo({
			url: '../activity_manage/activity_manage',
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
		var user=wx.getStorageSync('user')
		console.log(user)
		var timeStamp = Date.parse(new Date())
		var timeStamp1 = timeHelper.getDayFirstTimestamp(timeStamp + 24*60*60*1000)
		let activity = []
		console.log(timeStamp)
		console.log(timeStamp1)
		this.setData({
			user:user,
			datatempstart:timeStamp,
			datatempend:timeStamp1,
		})
		db.collection('application').where({
			id:this.data.user.id
		}).get({
			success:res=>{
				console.log(res)
				for(let i=0;i<res.data.length;i++){
					db.collection('activity').where({
						_id:res.data[i].relevancy
					}).get({
						success:res=>{
							console.log(res)
							res.data[0]["startTime"] = Date.parse(res.data[0]["startTime"])
							if(res.data[0]["startTime"]>this.data.datatempstart&&res.data[0]["startTime"]<this.data.datatempend){
								activity = activity.concat(res.data[0])
							}
							this.setData({
								activity:activity
							})
						}
					})
				}
			}
		})
	},
	
	zyhd:function(e){
		console.log(e.currentTarget.id)
		wx.navigateTo({
			url: '../activity/activity?text_id='+e.currentTarget.id,
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