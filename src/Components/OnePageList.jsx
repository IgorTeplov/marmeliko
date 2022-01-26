import React from 'react'
import {Link} from "react-router-dom"
import ApiDB from '../services/public_api'

import Item from './Item'


export default class OnePageList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			blog: [],
			error: false
		}
	}
	componentDidMount(){
		if(this.props.load!=undefined){
			let app = this.props.load.app
			let model = this.props.load.model
			let submodel = this.props.load.submodel
			if(app!=undefined&&model!=undefined&&submodel!=undefined){
				ApiDB.getPage(app, model, 1, {
					submodel:submodel,
					success:(data)=>{
						this.setState({blog: data.answer.queryset})
					},
					error:(data)=>{
						this.setState({blog:[data.answer], error:true})
					}
				})
			}
		}
	}
	isBlog(){
		if(this.props.name == 'blog'){
			return 'blog'
		}
		return 'items'
	}

	getLink(){
		let name = this.props.name
		if(this.props.base.dmenu[name] != undefined){
			if(this.props.base.dmenu[name].url!=null){
				if(this.props.base.dmenu[name].type == "URL"){
					return `/${this.props.base.dmenu[name].url}`
				}else if(this.props.base.dmenu[name].type == "INNER_URL"){
					return this.props.base.dmenu[name].url
				}
			}
		}
		return "/"
	}
	render(){
		let name = this.props.name
		let counter = 0

		return <section className={this.isBlog()}>
			<div className="container">
				<div className="row">
					<div className="col-12 my-5 py-5">
						<h1 className="dot-laguna my-5 pt-5">{this.props.base.field(name)}</h1>
						<div className="list py-5">
							<div className="container">
								<div className="row">
									{
										this.state.blog.length!=0?
											this.state.error?
											<div className="col-12 text-center">
												<p>{this.props.base.field('empty_blog')}</p>										
											</div>
											:
											this.state.blog.map(item=>{
												counter++
												if(counter <4){
													if(counter == 1){
														return <Item base={this.props.base} key={counter} big={true} item={item}/>
													}
													return <Item base={this.props.base} key={item.fields.id} item={item}/>
												}
												
											})
										:
										<div className="d-flex justify-content-center">
											<div className="lds-dual-ring align-self-center"></div>
										</div>
									}
								</div>
							</div>
						</div>
						<Link to={this.getLink()}><button className="yellow-button bordered mx-auto my-5">{this.props.base.field('view_all')}</button></Link>
					</div>
				</div>
			</div>
		</section>
	}
}