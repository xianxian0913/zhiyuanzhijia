const callfun=function(name,data={}){
	return new Promise((resolve,reject)=>{
		wx.cloud.callFunction({
			name,
			data
		}).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err);
		})
	})
}
const tobase64=function(imgFiles){
	return new Promise((resolve,reject)=>{
		let base64Arr=[];
		if(imgFiles.length){
			imgFiles.forEach(item=>{
				wx.getFileSystemManager().readFile({
					filePath:item,
					encoding:"base64",
					success:(res)=>{
						base64Arr.push(res.data);
						if(base64Arr.length>=imgFiles.length){
							resolve(base64Arr);
						}
					}
				})
			})
		}
	})
}
const uploadCloud=function (base64Arr){
	return new Promise((resolve,reject)=>{
		let fileID=[];
		base64Arr.forEach(item=>{
			callfun("uploadFile",{
				base64Data:item
			})
			.then(res=>{
				fileID.push(res.result.fileID);
				if(fileID.length>=base64Arr.length){
					resolve(fileID);
				}
			})
		})
	})
}

module.exports={
	callfun,
	tobase64,
	uploadCloud
}