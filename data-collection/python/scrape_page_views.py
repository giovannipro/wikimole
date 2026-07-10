#!/usr/bin/env python
# -*- coding: utf-8 -*- 
# Scrape page views

import os					# get file path
import webbrowser			# open webpages
import time					# get unix code
import datetime				# convert in unix timestamp
import urllib, json, io		# read json
from urllib import urlopen	# open file
import sys					# reset file encoding
import csv					# read csv

reload(sys)
sys.setdefaultencoding("utf-8")

# -----------------------------------
# Utilities

folder = "/Applications/MAMP/htdocs/wikimole/scraper/" # os.path.dirname(os.path.realpath(__file__))
t = "\t"
n = "\n"
lic = ""
s = " "

# -----------------------------------
# Main variables

api_old = "http://stats.grok.se/json/en/" # 2008 — 2015
api = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/" # from 2016 

root_api = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/"

# https://tools.wmflabs.org/pageviews/?project=en.wikipedia.org&platform=all-access&agent=user&range=latest-20&pages=Cat|Dog
# http://stats.grok.se/json/en/200801/hiv
# https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Day_of_Reconciliation/daily/2015070100/2017060100
# https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Day_of_Reconciliation/monthly/20120101/20161231

# -----------------------------------
# Script

def time():
	my_format = "%d %m %Y %I:%M%p" 
	ts = datetime.datetime.utcnow().strftime(my_format)
	print(ts)

def add_zero(x):
	if x < 10:
		return "0" + str(x)
	else:
		return x

def scrape_pv_after_2015(art_list,start,end): # from July 2015
	# print(article,start,end)
	time()

	f_in = folder + "raw_data/" + art_list + ".json"  # test / data
	f_out = folder + "raw_data/" + art_list + "-pv.tsv" 
	
	with open(f_in, "r") as f1:
		with open(f_out, "w") as f2:

			articles = json.load(f1)
			index = 0

			# lang, article,start,end

			for row in articles:
				try:
					title = row["title"].replace("!","%21")					
					# print (title)

					index += 1

					timespan = start + "/" + end
					# request = root_api + lang + ".wikipedia/all-access/user/" + article + "/daily/" + timespan
					request = api + title + "/daily/" + timespan
					# print request

					response = urlopen(request).read()
					data = json.loads(response)
					
					for a in data.items(): # .items()
						try:
							values = a[1]

							for x in values:
								views = x["views"]
								timestamp = x["timestamp"]
								output = str(index) + t + title + t + timestamp + t + str(views)
								output_ = output + n
								print output

								f2.write(output_)
						except:
							print("error_2", request)
							pass
				except:
						output = str(index) + t + request
						output_ = output + n
						print("error_1", output)
						# f2.write(output_)
						pass

	time()

def scrape_pv_before_2015(article,start,end): 
	print(article,start,end)

	for t in range (start,(end + 1)):

		for x in range (1, 13):
			timespan = str(start) + str(add_zero(x))

			request = api_old + timespan + "/" + article
			# print request
			
			response = urlopen(request).read()
			data = json.loads(response)

			for key, value in data["daily_views"].items():
				date = str(key)
				views = str(value)
				output = date + "\t" + views

				print(output)

		start += 1


# -----------------------------------
# Launch script

#scrape_pv_before_2015("Day_of_Reconciliation",2004,2015)
scrape_pv_after_2015("articles_test","20150701","20170630") #  articles_details articles_test 20150701 20170630 // 20170601 20170602





