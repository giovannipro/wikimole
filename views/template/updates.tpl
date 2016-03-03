<div class="list">
{{#each articles}}
		
		<div style="width:100%">
			<div style="float:left; width: 5%;">
				{{math @index "+" 1}}
			</div>

			{{#iff status '==' 'd' }}
				<div style="height:25px; background-color:#FF423B; padding: 5px 0 5px 10px; float:left; width: 80%;">
			{{else}}
				{{#iff status '==' 'n' }}
					<div style="height:25px; background-color:#5AFF85; padding: 5px 0 5px 10px; float:left; width: 80%;">
				{{else}}
					<div style="padding: 5px 0 5px 10px; float:left; width: 80%;">
				{{/iff}}
			{{/iff}}
				<div style="width: 35%; float:left;"><a href="https://en.wikipedia.org/wiki/{{ title }}" title="{{ title }}" target="_blank">{{ title }}</a></div>
				
					{{#iff community '==' 'true' }}
						<div style="float:left; width: 20%;">
							community review
						</div>
					{{else}}
					{{/iff}}

					{{#iff review '==' 'true' }}
						<div style="float:left; width: 20%;">
							expert review
						</div>
					{{else}}
					{{/iff}}


				</div>
			</div>
		</div>

		<div style="clear:both"></div>
{{/each}}
</div>