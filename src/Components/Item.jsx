import React from 'react'
import {Link} from "react-router-dom"

import html from './utils'

export default class Item extends React.Component {

	img(){
		let img = this.props.base.getContent(this.props.item.fields.content, 'preview')
		if(img != ""){
			return img
		}
		return "https://via.placeholder.com/2560x1300/7e91b8/7e91b8"
	}

	isBig(){
		let clss = ['item']
		if(this.props.big == true){
			clss.push('big')
		}
		return clss.join(' ')
	}

	render(){
		let date = this.props.item.fields.publication_date!=null?this.props.item.fields.publication_date:""
		date = date.replaceAll('T', ' ').split('.')
		return <div className={this.isBig()} id={`i${this.props.item.fields.id}`}>
			<img src={this.img()} />
			<div className="content d-flex">
				<div className="title">
					<h4><Link to={`/item/${this.props.item.fields.unique_url}`}>{this.props.base.translate(this.props.item.fields.post_name)}</Link></h4>
					<span className="subtitle">{this.props.base.getContent(this.props.item.fields.content, 'subtitle')}</span>
				</div>
				<span className="description">{html(this.props.base.getContent(this.props.item.fields.content, 'description'))}</span>
				<span className="date">{date[0]}</span>
			</div>
		</div>
	}
}