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

def count_co_occurrences(nodes,edges):
	time()

	my_input_nodes = folder + "raw_data/" + nodes + ".tsv"
	my_input_edges = folder + "raw_data/" + edges + ".tsv"
	output = folder + "raw_data/" + edges + "_clean.tsv"

	print(my_input_nodes)

	try:
		with open(my_input_nodes, "rb") as in_no_file, \
			open(my_input_edges, "rb") as in_ed_file, \
			open(output, 'wb') as out_file:

			in_no_file = csv.reader(in_no_file, delimiter = t)
			filecontents_no = [line for line in in_no_file]

			in_ed_file = csv.reader(in_ed_file, delimiter = t)
			filecontents_ed = [line for line in in_ed_file]

			index = 0

			for nod in filecontents_no:
				index += 1
				node_a = nod[0]
				#print(node_a)

				for e in filecontents_ed:
					node = e[1]
					edge = e[2]
					output_a = node + t + edge
					#print(index)

					if node.strip():
						edges = edge.split("|")

					for edge_1 in edges:
						count = 0
						#print(edges)

						if node_a in edges and node_a != edge_1:
							count += 1

						if node_a != edge_1 and count != 0:
							output_b = 	\
								str(index) + t + \
								node_a + "---" + edge_1 + t + \
								node_a + t + \
								edge_1 + t + str(count)
							output_b_ = output_b + n

							out_file.write(output_b_)

				print(node_a)
	
	except IOError as e:
		print 'Error: no files found'  # %s' % e.strerror

	time()

# -----------------------------------
# Launch script

#time()
#get_incoming_links("articles/articles_test") # articles articles_test


count_co_occurrences("nodes_raw","edges_raw") # nodes_raw nodes_raw_test , edges_raw edges_raw_test

