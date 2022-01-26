import React from 'react'
import {Link} from "react-router-dom"

import html from './utils'

export default class HeaderImage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			reload: false
		}
		window.scrollTo({
			top: 0,
			behavior: "instant"
		})
	}
	setBackground(){
		if(this.props.params.id==undefined){
			if(this.props.page.content('background') != ''){
				return this.props.page.content('background')
			}
		}else{
			if(this.props.item != undefined){
				let content = this.props.item.getContent()
				if(content != undefined){
					if(content.preview != undefined){
						return content.preview
					}
				}
				return "https://via.placeholder.com/2560x800/7e91b8/7e91b8"
			}
			return "https://via.placeholder.com/2560x800/7e91b8/7e91b8"
		}
		return "https://via.placeholder.com/2560x800/7e91b8/7e91b8"
	}

	getTitle(){
		if(this.props.params.id!=undefined){
			if(this.props.item != undefined){
				let content = this.props.item.getContent()
				let ans = []
				if(content != undefined){
					if(content.post_name != undefined&&content.post_name!=null){
						ans.push(content.post_name)
					}else{
						ans.push('')
					}
					if(content.header_sub_title != undefined&&content.header_sub_title!=null){
						ans.push(content.header_sub_title)
					}else{
						ans.push('')
					}
				}else{
					ans = ['', '']
					setTimeout(()=>{
						this.setState({reload: !this.state.reload})
						
					}, 100)
				}
				
				return ans
			}
		}
		return [this.props.page.content('header_title'),
		html(this.props.page.content('header_sub_title'))]
	}

	render(){
		let title = this.getTitle()
		return (
			<React.Fragment>
				<img className="background" src={this.setBackground()}/>
				<div className="container py-5">
					<div className="row">
						<div className="col-12 py-5">
							<div className="bordered-window">
								<div className="rectangle-border"></div>
								<div className="content">
									<div className="text-center">
										<h1>{title[0]}</h1>
										{title[1]}
									</div>
									{
										this.props.params.page==undefined?
										<div className="text-center d-flex pt-5">
											<Link className="yellow-button mx-auto mt-5" to={`/${this.props.base.dmenu.about_page.url}`}>{this.props.page.content('header_more')}</Link>
										</div>
										: null
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}