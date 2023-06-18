// pages/login/login.js
const db=wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id:'',
		password:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	getId(event){
		console.log(event.detail)
		let id=parseInt(event.detail.value)
		this.setData({
			id:id
		})
	},
	getPassword(event){
		this.setData({
			password:event.detail.value
		})
	},
	login(){
		let id=this.data.id
		let password=this.data.password
		console.log('学号',id,'密码',password)
		db.collection('users').where({
			id: id
		}).get({
			success:function(res){
				console.log(res)
				let user=res.data[0]
				if(res.data[0].password==password){
					wx.showToast({
						title: '登录成功',
					})
					wx.switchTab({
						url: '../home/home?id='+id,
					})
					wx.setStorageSync('user', user)
				}
			}
		})
	},
	onLoad(options) {

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