{{#each articles}}
<div class="row" style="border-bottom: #eee 1px solid; padding: 5px 0;">
		
	<div class="col-md-1 col-sm-12">
		{{math @index "+" 1}}
	</div>

	{{#iff status '==' 'd' }}
	<div class="col-md-1 col-sm-1" style="background-color:#FF423B;">D</div>
	{{else}}
		{{#iff status '==' 'n' }}
			<div class="col-md-1 col-sm-1" style="background-color:#5AFF85;">N</div>
		{{else}}
			<div class="col-md-1 col-sm-1"></div>
		{{/iff}}
	{{/iff}}

	<div class="col-md-4 col-sm-12">
		<a href="https://en.wikipedia.org/wiki/{{ title }}" title="{{ title }}" target="_blank">{{ title }}</a>
	</div>
	
	{{#iff community '==' 'true' }}
		<div class="col-md-2 col-sm-6">
			community review
		</div>
	{{else}}
	{{/iff}}

	{{#iff review '==' 'true' }}
		<div class="col-md-2 col-sm-6">
			expert review
		</div>
	{{else}}
	{{/iff}}


	</div>
</div>
{{/each}}