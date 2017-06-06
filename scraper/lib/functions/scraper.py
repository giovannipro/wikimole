#!/usr/bin/env python
# -*- coding: utf-8 -*- 
# Get revisions

import os							# get file path
import sys							# reset file encoding
import webbrowser					# open webpages
import urllib, json, io				# read json
from urllib import urlopen			# open file
import datetime						# print time
import csv							# read csv

reload(sys)
sys.setdefaultencoding("utf-8")

# -----------------------------------
# Utilities

folder = "/Applications/MAMP/htdocs/wikimole/scraper/" #os.path.dirname(os.path.realpath(__file__))
t = "\t"
n = "\n"
s = " "

# -----------------------------------
# Main variables

backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=';

# -----------------------------------
# Script

def time():
	my_format = "%d %m %Y %I:%M%p" 
	ts = datetime.datetime.utcnow().strftime(my_format)
	print(ts)

def get_incoming_links_continue(article,cont,index):

	f_out = folder + "/" + art_list + "-links.tsv" 

	with open(f_out, "a") as f2:
		if cont == 0:
			request = backlinks + article
		else:
			request = backlinks + article + "&blcontinue=" + str(cont)
		#print(request)

		response = urlopen(request).read()
		data = json.loads(response)

		back = data["query"]["backlinks"]

		for i in back:
			try:
				index +=1
				output = article + t + i["title"] #str(index) + t + 
				output_ = output + n

				print(output)
				f2.write(output_)
			except:
				print(request)
				pass

	try:
		new_new_cont = data["continue"]["blcontinue"]	
		if (new_new_cont != 0 and new_new_cont != cont): 
			get_incoming_links_continue(article,new_new_cont,index)
			index += 1
			#print(index)
		else:
			time()
			print("stop")
	except:
		pass

def get_incoming_links(art_list):
	time()

	f_in = folder + "/" + art_list + ".json"  # test / data
	f_out = folder + "/" + art_list + "-links.tsv" 

	with open(f_in, "r") as f1:
		with open(f_out, "a") as f2:

			articles = json.load(f1)
			index = 0

			for article in articles:
				try:
					req = backlinks + article
					request = req.decode("utf-8").encode("ascii","ignore") #.decode('ascii')
					response = urlopen(request).read()
					data = json.loads(response)

					back = data["query"]["backlinks"]
					#print(back)

					for i in back:
						try:
							index +=1
							output = article + t + i["title"] #str(index) + t + 
							output_ = output + n

							# head = article + t + link

							print(output)
							f2.write(output_)

						except:
							print(request)
							pass

					
					new_new_cont = data["continue"]["blcontinue"]	
					if (new_new_cont != 0): 
						get_incoming_links_continue(article,new_new_cont,index)

				except:
					print("no_continue" + t + request)
					pass

# -----------------------------------
# Launch script

get_incoming_links("articles/articles") # articles articles_test


