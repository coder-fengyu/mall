import axios from 'axios'

export function request(option){
	const instance = axios.create({
		baseURL:'http://123.207.32.32:8000/api/h8',
		// baseURL:'http://106.54.54.237:8000/api/h8',
		timeout: 5000
	});
	//请求拦截
	instance.interceptors.request.use(config =>{
		return config
	},err =>{
		console.log(err);
		return err
		
	})

	//响应拦截
	instance.interceptors.response.use(response =>{
		return response.data
	},err =>{
		console.log(err);
		
	})
	return instance(option);
}