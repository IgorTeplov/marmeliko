import React from 'react'
import {Link} from "react-router-dom"
import ApiDB from '../services/public_api'

import Item from './Item'

export default class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			reload: false
		}
		this.props.items.setLink(this)
	}
	reload(){
		this.setState({reload: !this.state.reload})
	}
	isBlog(){
		if(this.props.params.page == 'blog'){
			return 'blog'
		}
		return 'items'
	}
	render(){
		let name = this.props.modelRoute[this.props.params.page].name||this.props.params.page

		return <section className={this.isBlog()}>
			<div className="container">
				<div className="row">
					<div className="col-12 py-5">
						<h1 className="dot-laguna my-5 ">{this.props.base.field(name)}</h1>
						<div className="list py-5">
							<div className="container">
								<div className="row">
									{
										this.props.items.state.blog.length!=0?
											this.props.items.state.error?
											<div className="col-12 text-center">
												<p>{this.props.base.field('empty_blog')}</p>										
											</div>
											:
											this.props.items.state.blog.map(item=>{
												if(item != undefined){
													return <Item base={this.props.base} key={item.fields.id} big={true} item={item}/>
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
					</div>
				</div>
			</div>
		</section>
	}
}