#!/usr/bin/env python
# -*- coding: utf-8 -*- 

import os							# get file path
import sys							# reset file encoding
import webbrowser					# open webpages
import urllib, json, io				# read json
from urllib import urlopen			# open file
import datetime						# print time
import csv							# read csv
from bs4 import BeautifulSoup		# parse html

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

backlinks = "https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle="
wiki_url = "https://en.wikipedia.org/wiki/"

# -----------------------------------
# Scripts

def time():
	my_format = "%d %m %Y %I:%M%p" 
	ts = datetime.datetime.utcnow().strftime(my_format) # 
	print(ts)

def get_incoming_links(art_list):
	time()

	f_in = folder + "/" + art_list + ".json"  # test / data
	f_out = folder + "/" + art_list + "-links.tsv" 

	with open(f_in, "r") as f1:
		with open(f_out, "wb") as f2:

			articles = json.load(f1)
			index = 0

			def get_incoming_links_continue(article,cont_num):
				if cont_num == 0:
					req = backlinks + article
				else:
					req = backlinks + article + "&blcontinue=" + cont_num

				request = req.decode("utf-8").encode("ascii","ignore"); #.decode('ascii')
				response = urlopen(request).read();
				data = json.loads(response);

				back = data["query"]["backlinks"];
				#print(back)
				links = []	
				lks = 0;			

				if (1 == 1): 
					for i in back:
						try:
							lks += 1; 
							link = i["title"]
							links.append(link)
							#print (link)
						except:
							print(request)
							pass

					#print(links)
					links_string = ('|'.join(links))
				
					output_2 = links_string
					#print output
					f2.write(output_2)

					try:
						new_new_cont = data["continue"]["blcontinue"]
						if (new_new_cont != 0 and new_new_cont != cont_num):
							print article, req + "&blcontinue=" + new_new_cont, lks
							get_incoming_links_continue(article,new_new_cont)
					except:
						f2.write(n)
						pass # no continue

			for article in articles:
				try:
					art = article["title"]					
					index +=1

					output_1 = str(index) + t + art + t
					print output_1
					f2.write(output_1)

					get_incoming_links_continue(art,0)

				except:
					print "error_1"
					pass

def get_outgoing_links(art_list):
	time()

	f_in = folder + "/" + art_list + ".json"  # test / data
	f_out = folder + "/" + art_list + "-links_out.tsv" 

	with open(f_in, "r") as out_in:
		with open(f_out, "wb") as out_file:

			articles = json.load(out_in)
			index = 0

			for a in articles: # reversed(articles)
				art = a["title"];
				art = art.replace("!","	%21")
				index += 1;

				url = wiki_url + art
				html = urllib.urlopen(url.encode('ascii','ignore')).read() #urlopen(url) 
				bsObj = BeautifulSoup(html,"html.parser")

				data = bsObj.find("div",{"id":"bodyContent"}).findAll("a",href=True)

				sum_ = 0;
				arti = 0;
				user = 0;
				cat = 0;
				templ = 0;
				port = 0;

				for d in data:
					try:
						href = d["href"];

						if "/wiki/" in href:
							if "#" not in href:
								sum_ += 1

								#print href.replace("/wiki/","")

								if "User:" in href:
									user += 1;
								elif "Category:" in href:
									cat += 1
								elif "Template:" in href:
									templ += 1	
								elif "Portal:" in href:
									port += 1
								else:
									arti += 1
					except:
						print "error_1" + t + d
						pass

				output = str(index) + t + art + t + str(arti) + t + str(user) + t + str(cat) + t + str(templ) + t + str(port) + t + str(sum_) # + t + app
				output_ = output + n

				print(output)
				out_file.write(output_)

# -----------------------------------
# Launch script

get_incoming_links("articles/articles_test") # articles_details articles_test
#get_outgoing_links("articles/articles_test")

