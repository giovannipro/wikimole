<ol class="list">
{{#each articles}}
		
		{{#iff stat '==' 'd' }}
		<li style="height:25px; background-color:#FF423B; padding: 5px 0 5px 10px;">

		{{else}}
			{{#iff stat '==' 'n' }}
			<li style="height:25px; background-color:#5AFF85; padding: 5px 0 5px 10px;">
			
			{{else}}
			<li style="padding: 5px 0 5px 10px;">
			{{/iff}}

		{{/iff}}

			<a href="https://en.wikipedia.org/wiki/{{ art }}" title="{{ art }}" target="_blank">{{ art }}</a>

		</li>
{{/each}}
</ol>