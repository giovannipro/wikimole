{{#each articles}}
	<div class="row" style="border-bottom: #eee 1px solid; padding: 5px 0;">
		<div class="col-md-12">
			<h5>{{math @index "+" 1}}
				<a href="https://en.wikipedia.org/wiki/{{article}}" target="_blank" title="{{article}}">
					{{article}}
				</a>

				{{#iff community '==' true}}
					- community review
				{{/iff}}

				{{#iff review '==' true}}
					- expert review
				{{/iff}}

				{{#iff new_article '==' true}}
					- new article under examination
				{{/iff}}
			</h5>
		</div>

			<div class="col-md-2 col-sm-6">
				In. links: {{entry_links_mar16}}
				<br/>
				{{#iff new_article '==' true }}
					<span class="white">
						-
					</span>
				{{else}}
					{{#iff entry_links_mar16 '>' entry_links_sep15 }}
						<span class="green">
							+{{math entry_links_mar16 "-" entry_links_sep15 }}
						</span>
					{{else}}
						{{#iff entry_links_mar16 '<' entry_links_sep15 }}
							<span class="red">
								-{{math entry_links_sep15 "-" entry_links_mar16 }}
							</span>
						{{else}}
							<span class="gray">=</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>

			<div class="col-md-2 col-sm-6">
				Out. links: {{exit_links_mar16}}
				<br/>
				{{#iff new_article '==' true }}
					<span class="white">
						-
					</span>
				{{else}}
					{{#iff exit_links_mar16 '>' exit_links_sep15 }}
						<span class="green">
							+{{math exit_links_mar16 "-" exit_links_sep15 }}
						</span>
					{{else}}
						{{#iff exit_links_mar16 '<' exit_links_sep15 }}
							<span class="red">
								-{{math exit_links_sep15 "-" exit_links_mar16 }}
							</span>
						{{else}}
							<span class="gray">=</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>

			<div class="col-md-2 col-sm-6">
				Issues: {{issues_mar16}}
				<br/>
				{{#iff new_article '==' true }}
					<span class="white">
						-
					</span>
				{{else}}
					{{#iff issues_mar16 '>' issues_sep15 }}
						<span class="red">
							+{{math issues_mar16 "-" issues_sep15 }}
						</span>
					{{else}}
						{{#iff issues_mar16 '<' issues_sep15 }}
							<span class="green">
								-{{math issues_sep15 "-" issues_mar16 }}
							</span>
						{{else}}
							<span class="gray">=</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>

			<div class="col-md-2 col-sm-6">
				References: {{references_mar16}}
				<br/>
				{{#iff new_article '==' true }}
					<span class="white">
						-
					</span>
				{{else}}
					{{#iff references_mar16 '>' references_sep15 }}
						<span class="green">
							+{{math references_mar16 "-" references_sep15 }}
						</span>
					{{else}}
						{{#iff references_mar16 '<' references_sep15 }}
							<span class="red">
								-{{math references_sep15 "-" references_mar16 }}
							</span>
						{{else}}
							<span class="gray">=</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>

			<div class="col-md-2 col-sm-6">
				Notes: {{notes_mar16}}
				<br/>
				{{#iff new_article '==' true }}
					<span class="white">
						-
					</span>
				{{else}}
					{{#iff notes_mar16 '>' notes_sep15 }}
						<span class="green">
							+{{math notes_mar16 "-" notes_sep15 }}
						</span>
					{{else}}
						{{#iff notes_mar16 '<' notes_sep15 }}
							<span class="red">
								-{{math notes_sep15 "-" notes_mar16 }}
							</span>
						{{else}}
							<span class="gray">=</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>

			<div class="col-md-2 col-sm-6">
				Images: {{images_mar16}}
				<br/>
				{{#iff new_article '==' true }}
					<span class="white">
						-
					</span>
				{{else}}
					{{#iff images_mar16 '>' images_sep15 }}
						<span class="green">
							+{{math images_mar16 "-" images_sep15 }}
						</span>
					{{else}}
						{{#iff images_mar16 '<' images_sep15 }}
							<span class="red">
								-{{math images_sep15 "-" images_mar16 }}
							</span>
						{{else}}
							<span class="gray">=</span>
						{{/iff}}
					{{/iff}}
				{{/iff}}
			</div>

			<!--<div class="col-md-2">
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
			</div>-->
			<!--<div class="col-md-2">
				See Also: {{seeAlso_sep15}}
				<br/>
				{{#iff seeAlso_diff '>' 0 }}
					<span class="green">+{{seeAlso_diff}}</span>
				{{else}}
					{{#iff seeAlso_diff '<' 0 }}
						<span class="red">{{seeAlso_diff}}</span>
					{{else}}
						<span class="gray">=</span>
					{{/iff}}
				{{/iff}}
			</div>
		</div>-->
	</div>
{{/each}}