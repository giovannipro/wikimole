{{#each articles}}
	<div>
		<div class="">
			<h2>
				<a href="https://en.wikipedia.org/wiki/{{article}}" target="_blank">
					{{article}}
				</a>
			<h2>
		</div>
		<div class="box_100">
			<div class="box_11">
				Inc. links: {{entry_links_sep15}}
				<br/>
				{{#iff entry_links_diff '>' 0 }}
					<span class="green">+{{entry_links_diff}}</span>
				{{else}}
					{{#iff entry_links_diff '<' 0 }}
						<span class="red">{{entry_links_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				Out. links: {{exit_links_sep15}}
				<br/>
				{{#iff exit_links_diff '>' 0 }}
					<span class="green">+{{exit_links_diff}}</span>
				{{else}}
					{{#iff exit_links '<' 0 }}
						<span class="red">{{exit_links_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				Page rank: {{pagerank_sep15}}
				<br/>
				{{#iff pagerank_diff '>' 0 }}
					<span class="green">+{{pagerank_diff}}</span>
				{{else}}
					{{#iff pagerank '<' 0 }}
						<span class="red">{{pagerank_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				Daily pageviews: {{daily_pageview_aug15}}
				<br/>
				{{#iff daily_pageview_diff '>' 0 }}
					<span class="green">+{{daily_pageview}}</span>
				{{else}}
					{{#iff pagerank '<' 0 }}
						<span class="red">{{daily_pageview}}</span>
					{{else}}
						{{#iff pagerank '==' 0 }}
							<span class="gray">{{daily_pageview}}</span>
						{{else}}
							<span class="white">?</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				Issues: {{issues_sep15}}
				<br/>
				{{#iff issues_diff '<' 0 }}
					<span class="green">{{issues_diff}}</span>
				{{else}}
					{{#iff issues_diff '>' 0 }}
						<span class="red">{{issues_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				References: {{references_sep15}}
				<br/>
				{{#iff references_diff '>' 0 }}
					<span class="green">{{references_diff}}</span>
				{{else}}
					{{#iff references_diff '<' 0 }}
						<span class="red">{{references_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				Notes: {{notes_sep15}}
				<br/>
				{{#iff notes_diff '>' 0 }}
					<span class="green">{{notes_diff}}</span>
				{{else}}
					{{#iff notes_diff '<' 0 }}
						<span class="red">{{notes_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				Images: {{images_sep15}}
				<br/>
				{{#iff images_diff '>' 0 }}
					<span class="green">{{images_diff}}</span>
				{{else}}
					{{#iff images_diff '<' 0 }}
						<span class="red">{{images_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
			<div class="box_11">
				See Also: {{seeAlso_sep15}}
				<br/>
				{{#iff seeAlso_diff '>' 0 }}
					<span class="green">{{seeAlso_diff}}</span>
				{{else}}
					{{#iff seeAlso_diff '<' 0 }}
						<span class="red">{{seeAlso_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
		</div>
		<div class="clear"></div>
	</div>
{{/each}}