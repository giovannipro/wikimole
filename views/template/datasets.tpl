{{#each datasets}}
<div class="row" style="border-bottom: #eee 1px solid; padding: 5px 0;">
	<div class="col-md-2 col-sm-12">
		{{ period }}
	</div>
	<div class="col-md-3 col-sm-6">		
		<span class="glyphicon glyphicon-download" aria-hidden="true"></span>
		<strong>
			<a href="https://dl.dropboxusercontent.com/u/95554914/wikipedia_primary_school/views/data/{{ date }}/{{ date }}_{{ slug }}.zip">
				{{ name }} 
			</a>
		</strong>
	</div>
	<div class="col-md-2 col-sm-6">	
		{{ file }} ({{ size }})
	</div>
	<div class="col-md-5 col-sm-6">
		{{ info }}
	</div>
</div>
{{/each}}