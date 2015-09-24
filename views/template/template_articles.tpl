{{#articles}} <!-- {{#each articles}} -->
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
				{{entry_links_diff}}
			</div>
			<div class="box_11">
				Out. links: {{exit_links_sep15}}
				<br/>
				{{exit_links_diff}}
			</div>
			<div class="box_11">
				Page rank: {{pagerank_sep15}}
				<br/>
				{{pagerank_diff}}
			</div>
			<div class="box_11">
				Daily page views: {{daily_pageview_aug15}}
			</div>
			<div class="box_11">
				Issues: {{issues_sep15}}
				<br/>
				{{issues_diff}}
			</div>
			<div class="box_11">
				References: {{references_sep15}}
				<br/>
				{{#graph}}
					{{references_diff}}
				{{/graph}}
			</div>
			<div class="box_11">
				Notes: {{notes_sep15}}
				<br/>
				{{notes_diff}}
			</div>
			<div class="box_11">
				Images: {{images_sep15}}
				<br/>
				{{images_diff}}
			</div>
			<div class="box_11">
				See Also: {{seeAlso_sep15}}
				<br/>
				{{seeAlso_diff}}
			</div>
		</div>
		<div class="clear"></div>
	</div>
{{/articles}} <!-- {{/each}} -->


<!-- 

On articles_list.json put 
{
  "articles": [
		...
	]
}


-->