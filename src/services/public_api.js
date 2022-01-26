const DEV = false
const Authorization = DEV ? "PASS admin" : "GUEST";
const BASEURL = DEV ? "http://127.0.0.1:8000/" : document.location.origin + "/"
const APIURL = "api/adm/"
const API = `${BASEURL}${APIURL}`
let csrf_arrays = Array.from(document.querySelectorAll("[name='csrfmiddlewaretoken']"))
const TOKEN = csrf_arrays.length > 0 ? csrf_arrays[0].value : ''


const baseHandlers = {
	success:(data)=>{},
	error:(data)=>{},
	resolve:(response)=>{
		return response.json();
	},
	reject:(error)=>{
		console.error(error)
	}
}


const baseOptions = {
	data:{},
	headers:{},
	...baseHandlers
}


class requests {
	static _req(url, method, data, headers, resolve, reject){
		if(Authorization != ""){
			headers["Authorization"] = Authorization
		}
		if(TOKEN != ""){
			headers["X-CSRFToken"] = TOKEN
		}
		headers['Content-Type'] = 'application/json'
		return fetch(url, {
			method: method,
			headers: headers,
			body: JSON.stringify(data)
		})
		.then((response) => {
			return resolve(response)
		})
		.catch((error)=>{
			reject(error)
		})
	}
	static get(url, options={}){
		let data = options.data ? options.data : baseOptions.data
		let headers = options.headers ? options.headers : baseOptions.headers

		let resolve = options.resolve ? options.resolve : baseOptions.resolve
		let reject = options.reject ? options.reject : baseOptions.reject

		let success = options.success ? options.success : baseOptions.success
		let error = options.error ? options.error : baseOptions.error
		let response = requests._req(url, 'GET', data, headers, resolve, reject)
			response
					.then((data)=>{
						if(data != undefined){
							if(data.status == "error"){
								error(data)
							}else{
								success(data)
							}
						}
					})
	}
	static post(url, options={}){
		let data = options.data ? options.data : baseOptions.data
		let headers = options.headers ? options.headers : baseOptions.headers

		let resolve = options.resolve ? options.resolve : baseOptions.resolve
		let reject = options.reject ? options.reject : baseOptions.reject

		let success = options.success ? options.success : baseOptions.success
		let error = options.error ? options.error : baseOptions.error

		let response = requests._req(url, 'POST', data, headers, resolve, reject)
			response
					.then((data)=>{
						if(data != undefined){
							if(data.status == "error"){
								error(data)
							}else{
								success(data)
							}
						}
					})
	}
}


export default class ApiDB {

	static send(options={}){
		requests.post(API, options)
	}

	static getTranslateInfo(option={}){
		this.send({
			data:{
				command: 'translateinfo',
				args:{}
			},
			...{...baseHandlers, ...option}
		})
	}

	static all(app, model, option={}){
		this.send({
			data:{
				command: 'getAll',
				app: app,
				cmodel: model,
				submodel: option.submodel,
				args:{}
			},
			...{...baseHandlers, ...option}
		})
	}

	static maxPages(app, model, option={}){
		this.send({
			data:{
				command: 'getForPage',
				app: app,
				cmodel: model,
				submodel: option.submodel,
				args:{onlyMax:true}
			},
			...{...baseHandlers, ...option}
		})
	}

	static getPage(app, model, page, option={}){
		this.send({
			data:{
				command: 'getForPage',
				app: app,
				cmodel: model,
				submodel: option.submodel,
				args:{page}
			},
			...{...baseHandlers, ...option}
		})
	}

	static get(app, model, id, option={}){
		this.send({
			data:{
				command: 'getById',
				app: app,
				cmodel: model,
				submodel: option.submodel,
				args:{id}
			},
			...{...baseHandlers, ...option}
		})
	}

	static getBy(app, model, key, name, option){
		this.send({
			data:{
				command: 'getBy',
				app: app,
				cmodel: model,
				submodel: option.submodel,
				args:{filtered_parametr:key, [key]:name}
			},
			...{...baseHandlers, ...option}
		})
	}

	static filterBy(app, model, key, name, option){
		this.send({
			data:{
				command: 'filterBy',
				app: app,
				cmodel: model,
				submodel: option.submodel,
				args:{filtered_parametr:key, [key]:name}
			},
			...{...baseHandlers, ...option}
		})
	}
}
