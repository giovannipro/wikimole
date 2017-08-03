#!/usr/bin/env python
# -*- coding: utf-8 -*- 

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

		index +=1
		links = []

		for i in back:
			try:
				link = i["title"]
				links.append(link)
				#print (link)
			except:
				print(request)
				pass

		#print(links)
		links_string = ('|'.join(links))
		
		output = str(index) + t + article + t + links_string
		output_ = output + n

		# # head = article + t + links
		print(article)
		f2.write(output_)

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

def get_incoming_links(art_list,cont,index):
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

					index +=1
					links = []

					for i in back:
						try:
							link = i["title"]
							links.append(link)
							#print (link)
						except:
							print(request)
							pass

					#print(links)
					links_string = ('|'.join(links))
					
					output = str(index) + t + article + t + links_string
					output_ = output + n

					# # head = article + t + links
					print(article)
					f2.write(output_)

					new_new_cont = data["continue"]["blcontinue"]	
					if (new_new_cont != 0): 
						get_incoming_links_continue(article,new_new_cont,index)

				except:
					#print("no_continue" + t + request)
					pass

def get_n_entrylink(art_list):

	f_in = folder + "/" + art_list + ".json"
	f_out = folder + "/" + art_list + "_entry_links.tsv" 

	with open(f_in, "r") as f1:
		with open(f_out, "a") as f2:

			articles = json.load(f1)
			

			for art in articles:
				try:
					article = art["title"]
					appr = art["appr"]

					#def loop(art,cont):
					cont = 0;
					
					try:
						if (cont != 0): #new_cont != 0 and new_cont != cont
							req = backlinks + article + "&blcontinue=" + str(new_cont)
							new_cont = data["continue"]["blcontinue"]
							print req
							#loop(article,new_cont);
						else:
							req = backlinks + article

						request = req.decode("utf-8").encode("ascii","ignore")
						response = urlopen(request).read()
						data = json.loads(response)
						back = data["query"]["backlinks"]
						
					except:
						print "error"
						pass

					#loop(article,0);
					#print index;

					# index +=1;
					# links = [];
					# approaches = [];
					# app = "";

					# sum_ = 0;
					# arti = 0;
					# user = 0;
					# cat = 0;
					# templ = 0;
					# port = 0;

					# if (index < 5): # (1 == 1):
					# 	for i in back:
					# 		try:
					# 			link = i["title"];
					# 			links.append(link);
					# 			#print (link)
					# 			sum_ += 1;

					# 			if "User:" in link:
					# 				user += 1;
					# 			elif "Category:" in link:
					# 				cat += 1
					# 			elif "Template:" in link:
					# 				templ += 1	
					# 			elif "Portal:" in link:
					# 				port += 1
					# 			else:
					# 				arti += 1
					# 		except:
					# 			print(request, "error_1")
					# 			pass

					# 	if appr != None:
					# 		for a in appr:
					# 			try:
					# 				if "Review_by_community" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Review_by_expert_pdf" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Review_by_expert_pdf_and_wiki" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "New_article_suggested_by_expert" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "New_article_created_AFC" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Featured_on_WikiProject_South_Africa" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Rewrite_based_on_expert_review" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Article_assessment" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Bold_reassesment" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Africa_Destubathon" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)

					# 				if "Edit_a_thon" in a:
					# 					approaches.append("1" + t)
					# 				else:
					# 					approaches.append("0" + t)
					# 			except:
					# 				#print(request, "error_2")
					# 				pass

					# 	else:
					# 		approaches.append("0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0")

					# 	app = "".join(approaches)

					# 	output = str(index) + t + article + t + str(arti) + t + str(user) + t + str(cat) + t + str(templ) + t + str(port) + t + str(sum_) + t + app
					# 	output_ = output + n

					# 	print(output)

				except:
					#print e 
					#print req
					pass

				# try:
				# 	new_cont = data["continue"]["blcontinue"]	
				# 	if (new_cont != 0): 
				# 		get_incoming_links_continue(article,new_new_cont,index)

				# except:
				# 	pass


# -----------------------------------
# Launch script

# get_incoming_links("articles/articles") # articles articles_test

get_n_entrylink("articles/articles_test")

