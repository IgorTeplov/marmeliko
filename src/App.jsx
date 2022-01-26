import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom'

import {AppContext, BaseContext, PageContext, ParamsContext, ItemsContext, ItemContext} from './services/context'
import ApiDB from './services/public_api'

import './style.css'

import Loader from './Components/Loader'
import Header from './Components/Header'
import HeaderImage from './Components/HeaderImage'
import HeaderSocials from './Components/HeaderSocials'
import Footer from './Components/Footer'

import IndexPage from './Components/IndexPage'

import OnePageList from './Components/OnePageList'
import List from './Components/List'

import SimplePage from './Components/Page'

const MODEL_ROUTE = {
	blog: {
		app:'core', model:'post', submodel:true
	},
	projects: {
		app:'core', model:'projects', submodel:true
	},
	courses: {
		app:'core', model:'courses', submodel:true
	},
	"business-trainings": {
		app:'core', model:'business-trainings', submodel:true,
		name: "business_trainings"
	},
	workshops: {
		app:'core', model:'workshops', submodel:true
	}
}

function content_parser(value, alt=false){
	let content = {}
	let typing = {}
	if(value != null){
		let names = []
		let datas = []
		let allNames = [...value.matchAll(/([\[%]){1}[.]?[%\]]{1}/g)]
		for(let i = 0; i < allNames.length; i+=2){
			names.push(value.slice(allNames[i].index+2, allNames[i+1].index))
		}
		let allData = [...value.matchAll(/([\[$]){1}[.]?[$\]]{1}/g)]
		for(let i = 0; i < allData.length; i+=2){
			datas.push(value.slice(allData[i].index+2, allData[i+1].index))
		}
		for(let i = 0; i < names.length; i++){
			let [name, type] = names[i].split('|')
			typing[name] = type
			content[name] = datas[i]
		}
	}
	if(alt){
		return [typing, content]
	}
	return content
}

function get(app, set, field){
	let lang = app.curentLang
	let defLang = app.defaultLang
	if(set[field]!=undefined){
		if(set[field][lang]!=""){
			return set[field][lang]
		}
		if(set[field][defLang]!=""){
			return set[field][defLang]
		}
	}
	return ""
}

function GetParams(props){
	let params = useParams()

	return <ParamsContext.Provider value={params}>
		{props.children}
	</ParamsContext.Provider>
}

function getFieldByLang(set, field, lang){
	if(set[lang] != undefined){
		let content = content_parser(set[lang])
		if(content != null){
			if(content[field] != undefined){
				return content[field]
			}
		}
	}
	return null
}

export class Page extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			cache: {},
			init: false,
			page: null,
			content: this.content(this),
			setInit: this.setInit(this)
		}
	}

	setInit(root){
		return (value)=>{
			this.setState({init:value})
		}
	}

	content(root){
		return (field)=>{
			let content = getFieldByLang(this.state.page.content, field, this.props.app.curentLang)
			if(content != null && content != ''){
				return content
			}
			content = getFieldByLang(this.state.page.content, field, this.props.app.defaultLang)
			if(content != null && content != ''){
				return content
			}
			return ""
		}
	}

	componentDidMount(){
		let name = this.props.name
		if(this.state.cache[name] == undefined){
			if(name != undefined || name != ''){
				ApiDB.getBy('core', 'page', 'url__url_name', name, {
					success: (data)=>{
						this.setState({
							cache: {...this.state.cache, [name]: data.answer.fields},
							init: true,
							page: data.answer.fields
						})
					},
					error:(data)=>{
						ApiDB.getBy('core', 'page', 'url__url', name, {
							success: (data)=>{
								this.setState({
									cache: {...this.state.cache, [name]: data.answer.fields},
									init: true,
									page: data.answer.fields
								})
							},
							error:(data)=>{
								// HTTP 404
							}
						})
					}
				})
			}
		}else{
			this.setState({page: this.state.cache[name], init: true})
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.name != prevProps.name){
			this.setState({init: false})
			this.componentDidMount()
		}
	}

	render(){
		return (
			<PageContext.Provider value={this.state}>
				{this.props.children}
			</PageContext.Provider>
		)
	}
}

export class Base extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			init: false,
			fields: null,
			number: null,
			email: null,
			socials: null,
			menu: null,
			dmenu: {},
			sub_menu: null,
			menu_poly: null,
			linkedin: null,
			field: this.field(this),
			getText: this.getText(this),
			getContent: this.getContent(this),
			translate: this.translate(this),
			content_parser: content_parser
		}
	}

	translate(root){
		return (set)=>{
			if(set[this.props.app.curentLang] != undefined && set[this.props.app.curentLang] != ""){
				return set[this.props.app.curentLang]
			}
			if(set[this.props.app.defaultLang] != undefined && set[this.props.app.defaultLang] != ""){
				return set[this.props.app.defaultLang]
			}
			return ""
		}
	}

	getContent(root){
		return (set, field) => {
			let content = getFieldByLang(set, field, this.props.app.curentLang)
			if(content != null && content != ''){
				return content
			}
			content = getFieldByLang(set, field, this.props.app.defaultLang)
			if(content != null && content != ''){
				return content
			}
			return ""

		}
	}

	getText(root){
		return (set)=>{
			if(set != undefined){
				if(set.text != undefined){
					return get(this.props.app, set, 'text')
				}
			}
			return ""
		}
	}

	field(root){
		return (field)=>{
			if(this.state.fields[field] != undefined){
				return get(this.props.app, this.state.fields[field], 'text')
			}
			return ""
		}
	}

	componentDidMount(){
		let maxInitLevel = 6
		let initLevel = 0
		const init = ()=>{
			initLevel++
			if(initLevel == maxInitLevel){
				this.setState({init: true})
				return false
			}
			return true
		}
		ApiDB.all('core', 'justfield', {
			success:(data)=>{
				let fields = {}
				data.answer.queryset.map(item=>{
					fields[item.fields.unique_name] = item.fields
				})
				this.setState({
					fields: fields
				})
				init()
			}
		})

		ApiDB.filterBy('core', 'menu', 'menu_list__unique_name', 'index', {
			success:(data)=>{
				let array = data.answer.queryset
				maxInitLevel += array.length
				for(let i = 0; i < array.length; i++){
					this.state.dmenu[array[i].fields.unique_name] = array[i].fields
					ApiDB.get('core', 'urlobject', array[i].fields.url, {
						success:(data)=>{
							array[i].fields.url = data.answer.fields.url
							init()
						},
						error:(data)=>{
							init()
						}
					})
					if(array[i].fields.type == "SUBMENU"){
						ApiDB.filterBy('core', 'menu', 'menu_list__id', array[i].fields.id, {
							success:(data)=>{
								let submenu = []
								let query = data.answer.queryset
								let maxUniqueMenu = data.answer.queryset.length - 1
								maxInitLevel += maxUniqueMenu
								for(let i in query){
									this.state.dmenu[query[i].fields.unique_name] = query[i].fields
									if(query[i].fields.unique_name != 'index'){
										ApiDB.get('core', 'urlobject', query[i].fields.url, {
											success:(data)=>{
												query[i].fields.url = data.answer.fields.url
												init()
											},
											error:(data)=>{
												init()
											}
										})
										submenu.push(query[i])
									}
								}
								array[i].fields.menu_list = submenu
								this.setState({sub_menu: submenu})
							}
						})
					}
				}
				if(init()){
					this.setState({
						menu: array
					})
				}
			}
		})

		ApiDB.filterBy('core', 'contact', 'name_prefix', 'SOCIAL_', {
			success:(data)=>{
				let array = data.answer.queryset
				maxInitLevel += array.length
				for(let i = 0; i < array.length; i++){
					ApiDB.get('core', 'customization', array[i].fields.customization, {
						success:(data)=>{
							array[i].fields.customization = data.answer.fields
							init()
						},
						error:(data)=>{
							init()
						}
					})
					if(array[i].fields.unique_name == "linked_id"){
						this.setState({
							linkedin: array[i].fields
						})
					}
				}

				this.setState({
					socials: array
				})
				init()
			}
		})

		ApiDB.getBy('core', 'contact', 'unique_name', 'email', {
			success:(data)=>{
				const getter = ()=>{
					return get(this.props.app, data.answer.fields, 'text')
				}
				let obj = {
					url: data.answer.fields.url,
					text: getter
				}
				this.setState({email:obj})
				init()
			},
			error:(data)=>{
				init()
			}
		})

		ApiDB.getBy('core', 'contact', 'unique_name', 'number', {
			success:(data)=>{
				const getter = ()=>{
					return get(this.props.app, data.answer.fields, 'text')
				}
				let obj = {
					url: data.answer.fields.url,
					text: getter
				}

				this.setState({number:obj})
				init()
			},
			error:(data)=>{
				init()
			}
		})

		ApiDB.getBy('core', 'menu', 'unique_name', 'poly', {
			success:(data)=>{
				let array = data.answer
				maxInitLevel++
				ApiDB.get('core', 'urlobject', array.fields.url, {
					success:(data)=>{
						array.fields.url = data.answer.fields.url
						init()
					},
					error:(data)=>{
						init()
					}
				})
				if(init()){
					this.setState({
						menu_poly: array
					})
				}
			},
			error:(data)=>{
				init()
			}
		})
	}

	render(){
		return (
			<BaseContext.Provider value={this.state}>
				{this.props.children}
			</BaseContext.Provider>
		)
	}
}

export class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			init: false,
			curentLang: null,
			defaultLang: null,
			translate: null,
			setLang: this.setLang(this)
		}
	}

	setLang(root){
		return (lang)=>{
			root.setState({curentLang:lang})
		}
	}

	componentDidMount(){
		ApiDB.getTranslateInfo({
			success:(data)=>{
				this.setState({
					init: true,
					curentLang: data.default_language,
					defaultLang: data.default_language,
					translate: data
				})
			}
		})
	}

	render(){
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}

let LIST = null
let LINK = null

export class Items extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			cache: {},
			blog: [],
			blogHub: [],
			error: false,
			needLoad: false,
			curentPage: 1,

			reload: false
		}
		LINK = this
		document.addEventListener('scroll', this.scroll)
	}
	componentWillUnmount(){
		document.removeEventListener('scroll', this.scroll)
	}

	load(){
		let modelRoute = this.props.modelRoute
		let page = this.props.params.page
		if(modelRoute != undefined){
			let name = modelRoute[page].name||page
			let app = modelRoute[page].app
			let model = modelRoute[page].model
			let submodel = modelRoute[page].submodel
			if(app!=undefined&&model!=undefined&&submodel!=undefined){
				ApiDB.getPage(app, model, this.state.curentPage, {
					submodel:submodel,
					success:(data)=>{
						this.setState({blogHub: data.answer.queryset})
						LINK.setState({needLoad:false})
					},
					error:(data)=>{
						if(this.state.blog == []){
							this.setState({blog:[data.answer], error:true})
						}
						
					}
				})
			}
		}
	}

	scroll(e){
		if(LINK.state.blog.length-3 > 0){
			let doc = document.getElementById(`i${LINK.state.blog[LINK.state.blog.length-3].fields.id}`)
			if(!LINK.state.needLoad){
				if(e.target.documentElement.scrollTop > doc.offsetTop){
					LINK.state.needLoad = true
					if(LINK.state.needLoad){
						LINK.state.curentPage++
						LINK.load()
					}
				}
			}
		}
	}

	setLink(value){
		LIST = value
	}

	componentDidMount(){
		this.load()
	}
	componentDidUpdate(prevProps){
		let name = this.props.modelRoute[this.props.params.page].name||this.props.params.page
		let prevName = prevProps.modelRoute[prevProps.params.page].name||prevProps.params.page
		if(name != prevName){
			if(this.state.cache[prevName] == undefined){
				this.state.cache[prevName] = {}
			}
			this.state.cache[prevName] = {
				blog: this.state.blog,
				blogHub: this.state.blogHub,
				error: this.state.error,
				curentPage: this.state.curentPage
			}
			if(this.state.cache[name] == undefined){
				this.state.blog = []
				this.state.curentPage = 1
				this.load()
			}else{
				this.state.blog = this.state.cache[name].blog
				this.state.blogHub = this.state.cache[name].blogHub
				this.state.error = this.state.cache[name].error
				this.state.curentPage = this.state.cache[name].curentPage
				this.setState({reload: !this.state.reload})
			}
		}else{
			if(this.state.blogHub.length > 0){
				setTimeout(()=>{
					let el = this.state.blogHub.shift()
					if(el != undefined){
						this.state.blog.push(el)
					}
					this.setState({blog: this.state.blog})
					LIST.reload()
				}, 150)
			}
		}
	}


	get(name){
		if(this.state.blog == undefined){
			return [[], false]
		}
		return [this.state.blog, this.state.error]
		
	}

	render(){
		return (
			<ItemsContext.Provider value={this}>
				{this.props.children}
			</ItemsContext.Provider>
		)
	}
}

export default class RouterApp extends React.Component {

	render(){
		return (
			<App>
			<AppContext.Consumer>
			{app=>(<Base app={app}><BaseContext.Consumer>{base=>(
			<Router basename="/">
				<Routes>
					<Route exact path='/'
						element={
							<GetParams>
							<ParamsContext.Consumer>{params=>(
							<Page name='main' app={app}>
							<PageContext.Consumer>{page=>(
								<Loader app={app} base={base} page={page} params={params}>
									<Header app={app} base={base} page={page} params={params}>
										<HeaderImage app={app} base={base} page={page} params={params}/>
										<HeaderSocials app={app} base={base} page={page} params={params}/>
									</Header>
									<IndexPage app={app} base={base} page={page} params={params}/>
									<OnePageList app={app} base={base} page={page} params={params} name="blog"
									load={{
										app:'core', model:'post', submodel:true
									}}/>
									<OnePageList app={app} base={base} page={page} params={params} name="projects"
									load={{
										app:'core', model:'projects', submodel:true
									}}/>
									<Footer app={app} base={base} page={page} params={params}/>
								</Loader>
							)}</PageContext.Consumer>
							</Page>
							)}</ParamsContext.Consumer>
							</GetParams>
						} />

					<Route exact path='/:page'
						element={
							<GetParams>
							<ParamsContext.Consumer>{params=>(
							<Page name={params.page} app={app}>
							<PageContext.Consumer>{page=>(
								<Loader app={app} base={base} page={page} params={params}>
									<Header app={app} base={base} page={page} params={params}/>
									<SimplePage app={app} base={base} page={page} params={params}/>
									<Footer app={app} base={base} page={page} params={params}/>
								</Loader>
							)}</PageContext.Consumer>
							</Page>
							)}</ParamsContext.Consumer>
							</GetParams>
						} />

					<Route exact path='/:page/list'
						element={
							<GetParams>
							<ParamsContext.Consumer>{params=>(
							<Page name={params.page} app={app}>
							<PageContext.Consumer>{page=>(
								<Items app={app} base={base} page={page} params={params}
									modelRoute={MODEL_ROUTE}
								>
								<ItemsContext.Consumer>
								{items=>(
									<Loader app={app} base={base} page={page} params={params}>
										<Header app={app} base={base} page={page} params={params}/>
										<List items={items} app={app} base={base} page={page} params={params} 
											modelRoute={MODEL_ROUTE}
										/>
										<Footer app={app} base={base} page={page} params={params}/>
									</Loader>
								)}
								</ItemsContext.Consumer>
								</Items>
							)}</PageContext.Consumer>
							</Page>
							)}</ParamsContext.Consumer>
							</GetParams>
						} />

					<Route exact path='/:page/:id'
						element={
							<GetParams>
							<ParamsContext.Consumer>{params=>(
							<Page name={params.page} app={app}>
							<PageContext.Consumer>{page=>(
								<Loader app={app} base={base} page={page} params={params}>
									<SimplePage app={app} base={base} page={page} params={params}>
										<ItemContext.Consumer>
										{
											item=>(
												<Header app={app} base={base} page={page} params={params}>
													<HeaderImage app={app} base={base} page={page} params={params} item={item}/>
												</Header>
											)
										}
										</ItemContext.Consumer>
										
									</SimplePage>
									<Footer app={app} base={base} page={page} params={params}/>
								</Loader>
							)}</PageContext.Consumer>
							</Page>
							)}</ParamsContext.Consumer>
							</GetParams>
						} />
				</Routes>
			</Router>
			)}</BaseContext.Consumer></Base>)}
			</AppContext.Consumer>
			</App>
		)
	}
}