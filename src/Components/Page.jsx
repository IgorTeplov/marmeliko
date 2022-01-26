import React from 'react'
import ApiDB from '../services/public_api'
import html from './utils'
import {ItemContext} from '../services/context'
export default class SimplePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			item: null,
			lastid: null
		}
	}
	componentDidMount(){
		if(this.props.params.id != undefined){
			ApiDB.filterBy('core', 'post', 'unique_url', this.props.params.id, {
				success:(data)=>{
					this.setState({
						item: data.answer.queryset[0],
						lastid: this.props.params.id
					})
				}
			})
		}
	}
	componentDidUpdate(prevProps){
		if(this.props.params.id != undefined){
			if(this.props.params.id != this.state.lastid){
				this.componentDidMount()
			}
		}
	}
	postInterface(){
		return this.state.item
	}
	pageInterface(){
		return this.props.page.page
	}
	getContent(alt=false){
		let interface_ = null
		if(this.props.params.id != undefined){
			interface_ = this.postInterface()
			if(interface_ != null){
				interface_ = interface_.fields
			}else{
				return null
			}
		}else{
			interface_ = this.pageInterface()
		}
		let content = {}
		let typing = {}
		if(interface_.post_name != undefined){
			typing.post_name = "CharField"
			content.post_name = this.props.base.translate(interface_.post_name)
		}
		let [ctypes, ccontent] = this.props.base.content_parser(this.props.base.translate(interface_.content), true)
		content = {...content, ...ccontent}
		typing = {...typing, ...ctypes}
		if(alt){
			return [typing, content]
		}
		return content
	}
	render(){
		let f = this.getContent(true)
		if (f != null){
			let [typing, content] = f
			return <React.Fragment>
				<ItemContext.Provider value={this}>
					{this.props.children}
				</ItemContext.Provider>
			 	<section className="page">
					<div className="container">
						<div className="row">
							<div className="col-12 my-5 py-5 px-3">
								{
									Object.entries(content).map(item=>{
										let [key, value] = item
										if(key == 'post_name'){
											return <h1>{value}</h1>
										}
										if(typing[key] == 'CharField'){
											return <h2>{value}</h2>
										}
										if(typing[key] == 'TextField'){
											return html(value)
										}
										if(typing[key] == 'ImageField'){
											return <img src={value} />
										}
										if(typing[key] == 'IntegerField'||typing[key] == 'FloatField'){
											return <p>{value}</p>
										}
									})
								}
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		}
		return null
	}
}