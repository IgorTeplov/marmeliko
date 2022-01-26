import React from 'react'
import DOMPurify from "dompurify";

export default function html(code) {
	let safeCode = DOMPurify.sanitize(code, {
		ALLOWED_TAGS: ["h1", "p", "span", "strong", "i"],
		ALLOWED_ATTR: ["style"],
	})
	return (
		<div dangerouslySetInnerHTML={{__html: safeCode}} />
	)
}