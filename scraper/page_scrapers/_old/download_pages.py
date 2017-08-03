#! python
# -*- coding: utf-8 -*-
# download html pages

import urllib2

import csv
from collections import defaultdict

api = 'https://en.wikipedia.org/api/rest_v1/page/html/';
location = '/Applications/MAMP/htdocs/wikimole/scraper/articles/20150801_html/';


#print 'hello'



# def get_html(title, rev_id):

# 	url = api + title + '/' + rev_id

# 	page = urllib2.urlopen(url)
# 	data = page.read()



with open('/Applications/MAMP/htdocs/wikimole/data/revision_id/revisionid_test.csv', 'rb') as csvfile:  # revisionid_test # revisionid
	reader = csv.reader(csvfile, delimiter=',')
	reader.next()
	for row in reader:
	    	title = row[0].replace(' ', '_')
	        rev_id = row[1]


	        
	    page = urllib2.urlopen(url)
		data = page.read()

        try:

        	url = api + title + '/' + rev_id

			file = open(location + title + '.html','wb')
			file.writelines(data)
			file.close()
		except: #  IOError as e #urllib2.HTTPError
			print ('error')
			#print ('error')
			#continue
			#if (err) == '400':
	      		#continue
				#break
				#print err
			#raise err		
		else: 
			print url
		#finally:
		#	print("done")


        #get_html(title, rev_id)





# --------------------------------------------------------------------------- #
# console commands
# --------------------------------------------------------------------------- #

# ---------------------- #
# execute python file
# python /Applications/MAMP/htdocs/wikimole/scraper/page_scrapers/download_pages.py
