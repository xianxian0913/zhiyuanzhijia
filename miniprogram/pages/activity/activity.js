// pages/activity/activity.js
const db=wx.cloud.database()
var times = require('../../utils/times.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		text_id:'',
		photo:'',
		title:'',
		_createTime:'',
		profile:'',
		condition:'',
		startTime:'',
		endTime:'',
		deadline:'',
		location:'',
		remaining_places:'',
		times:'',
		user:'',
		yyzt:0
	},
	application(){
    db.collection("application").add({
      data:{
        id:this.data.user.id,
        relevancy:this.data.text_id,
				_createTime: Date.parse(new Date()),
				qdzt:false
      },
      success:res=>{
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000,
          success:res=>{
            db.collection("application").where({id:this.data.user.id}).get().then(res=>{
              console.log(res.data)
              for(let i=0;i<res.data.length;i++){
                  if(res.data[i].relevancy==this.data.text_id){
                    this.data.yyzt=1
                }
              }
              this.setData({
								yyzt:this.data.yyzt
              })
						})
						db.collection("activity").where({_id:this.data.text_id}).update({
							data:{
								remaining_places:this.data.remaining_places-1
							},
							success:res=>{
								this.setData({
									remaining_places:this.data.remaining_places-1
								})
							}
						})
          }
        })
      }
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad:function(options) {
		this.setData({
			text_id:options.text_id
		})
		db.collection("activity").doc(this.data.text_id).get().then(res=>{
			console.log(res.data._createTime)
			res.data._createTime = times.toDate(res.data._createTime)
			res.data.deadline = times.toDate(res.data.deadline)
			res.data.startTime = times.toDate(res.data.startTime)
			this.setData({
				photo:res.data.activity_photo,
				title:res.data.activity_title,
				_createTime:res.data._createTime,
				profile:res.data.profile,
				condition:res.data.condition,
				startTime:res.data.startTime,
				endTime:res.data.endTime,
				deadline:res.data.deadline,
				times:res.data.times,
				location:res.data.location,
				remaining_places:res.data.remaining_places
			})
		})
    db.collection("application").where({id:this.data.user.id}).get().then(res=>{
      for(let i=0;i<res.data.length;i++){
          if(res.data[i].relevancy==this.data.text_id){
            this.data.yyzt=1
        }
      }
      this.setData({
				yyzt:this.data.yyzt
      })
    })
	},
	cancellation(){
    db.collection("application").where({id:this.data.user.id,relevancy:this.data.text_id}).remove({
      success: res => {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000,
          success:res=>{
              this.setData({
								yyzt:0
							})
							db.collection("activity").doc(this.data.text_id).update({
								data:{
									remaining_places:this.data.remaining_places+1
								},
								success:res=>{
									console.log(res)
									this.setData({
										remaining_places:this.data.remaining_places+1
									})
								}
							})
          }
        })
      },
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
		this.setData({
			user:user
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