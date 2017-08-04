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

csv.field_size_limit(sys.maxsize)

# -----------------------------------
# Utilities

folder = "/Applications/MAMP/htdocs/wikimole/scraper/" #os.path.dirname(os.path.realpath(__file__))
folder_data = "/Applications/MAMP/htdocs/wikimole/data/"
t = "\t"
n = "\n"
s = " "

# -----------------------------------
# Main variables



# -----------------------------------
# Scripts

def time():
	my_format = "%d %m %Y %I:%M%p" 
	ts = datetime.datetime.utcnow().strftime(my_format)
	print(ts)

def parse(mfile):

	art_list = folder + "raw_data/" + "articles_2017" + ".tsv";
	myFile = folder + "raw_data/" + mfile + ".tsv";
	output = folder + "raw_data/" + mfile + "_output.tsv";

	try:
		with open(art_list, "rb") as a_file, \
			open(myFile, "rb") as b_file, \
			open(output, 'wb') as out_file:

			a_file = csv.reader(a_file, delimiter = t)
			filecontents_a = [line for line in a_file]

			b_file = csv.reader(b_file, delimiter = t)
			filecontents_b = [line for line in b_file]

			index = 0

			for art in filecontents_a:
				index += 1
				art_ = art[0]
				
				output_a = str(index) + t + art_ + t
				out_file.write(output_a)
				# print(art_)

				for x in filecontents_b:
					x1 = x[1];
					print x1;

					if art_ in x1:
						# print(art_ + x1)
						output_b = x[1] + "|"
						out_file.write(output_b)
						print(output_b)

				out_file.write(n)

	except IOError as e:
		print e #'Error: no files found'  # %s' % e.strerror

def get_edges(mfile):

	my_file = folder + "raw_data/" + mfile + ".tsv";
	out_file = folder + "raw_data/" + mfile + "_edges.tsv";

	try:
		with open(my_file, "rb") as a_file, \
			open(out_file, "wb") as b_file:

			a_file = csv.reader(a_file, delimiter = t)
			filecontents_a = [line for line in a_file]

			index = 0

			for art in filecontents_a:
				article = art[1]
				links = art[2].split("|")
				print article

				for link in links:
					output = article + t + link
					output_ = output + n
					b_file.write(output_)

	except IOError as e:
		print e 

def count_co_occurrences(nodes,edges):
	time()

	my_input_nodes = folder + "raw_data/" + nodes + ".tsv"
	my_input_edges = folder + "raw_data/" + edges + ".tsv"
	output = folder + "raw_data/" + edges + "_clean.tsv"

	try:
		with open(my_input_nodes, "rb") as in_no_file, \
			open(my_input_edges, "rb") as in_ed_file, \
			open(output, 'wb') as out_file:

			in_no_file = csv.reader(in_no_file, delimiter = t)
			filecontents_no = [line for line in in_no_file]

			in_ed_file = csv.reader(in_ed_file, delimiter = t)
			filecontents_ed = [line for line in in_ed_file]

			index = 0;

			for nod in filecontents_no:
				index += 1;
				node_a = nod[0];
				control = 0;

				for e in filecontents_ed:
					#try:
					node = e[1] # 1
					edge = e[2] # 2
					output_a = node + t + edge
					control += 1;
					#print(output_a)

					if node.strip():
						edges = edge.split("|")
						#print node, edges

					links = [];

					for lks in edges:
						#lks_ = lks.replace(",",";").replace("=","-")
						links.append(lks)
						#print lks

					#links.sort()

					# if index < 2:
					# 	print links

					for edge_1 in links:
						try:
							count = 0;
							#print(1, node_a, edges, count) 							

							if node_a in edges and node_a != edge_1:
								count += 1
								#print(node_a, edges, count) 

							if node_a != edge_1 and count != 0:
								try:
									output_b = 	\
										str(index) + t + \
										str(control) + t + \
										node_a + "---" + edge_1 + t + \
										node_a + t + \
										edge_1 + t + str(count)
									output_b_ = output_b + n

									out_file.write(output_b_)
									print output_b

								except:
									print "error_3"
									pass # continue
							else:
								print "no " + str(index) + t + str(control) + t + node_a + t + edge_1

						except:
							print "error_2 " + t + node_a + t + edge_1
							pass # continue
					# except:
					# 	print "error_1" + t + node_a
					# 	pass
	
	except IOError as e:
		print e

	time()

def parse_in_links(mfile,art_list):

	myFile = folder_data + "incoming_links/20170803/" + mfile + ".tsv"
	#myList = folder + art_list + ".json"
	output = folder_data + "incoming_links/20170803/" + mfile + "_output.tsv"

	try:
		with open(myFile, "rb") as a_file, \
			open(output, 'wb') as out_file:

			a_file = csv.reader(a_file, delimiter = t);
			my_a_file = [line for line in a_file];

			#articles = json.load(b_file);

			index = 0

			for b in my_a_file:
				#try:
				art = b[1];
				links = b[2].split("|")
				index += 1;

				approaches = [];
				links_ = [];
				app = "";

				sum_ = 0;
				arti = 0;
				user = 0;
				cat = 0;
				templ = 0;
				port = 0;

				for a in links:
					sum_ += 1;

					# link typology
					if "User:" in a:
						user += 1;
					elif "Category:" in a:
						cat += 1
					elif "Template:" in a:
						templ += 1	
					elif "Portal:" in a:
						port += 1
					else:
						arti += 1

				output_1 = str(index) + t + art + t + str(arti) + t + str(user) + t + str(cat) + t + str(templ) + t + str(port) + t + str(sum_) # + t + app
				output_ = output_1 + n

				print(output)
				out_file.write(output_)

				# except:
				# 	print "error_1";
				# 	pass

	except IOError as e:
		print e
		pass

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

def check_strategy(art_list):
	myFile = folder + art_list + ".json"

	with open(myFile, "rb") as a_file:

		articles = json.load(a_file);

		for art in articles:
			title = art["title"];
			in_out = art ["in_out"];
			app = art["appr"];			

			appro = [
				"Review_by_community",
				"Review_by_expert_pdf",
				"Review_by_expert_pdf_and_wiki",
				"New_article_suggested_by_expert",
				"New_article_created_AFC",
				"Featured_on_WikiProject_South_Africa",
				"Rewrite_based_on_expert_review",
				"Article_assessment",
				"Bold_reassesment",
				"Africa_Destubathon",
				"Edit_a_thon",
			]

			ap = [];
			out_box = [];	

			if (in_out == True):
				for x in app:
					ap.append(x);

				ap = "".join(ap)

				for a in appro:
					if (a in ap):
						out_box.append("1" + t)
						#print "1" + t
					else:
						out_box.append("0" + t)
						#print "0" + t

			else:
				out_box.append("0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0" + t + "0")

			output = "".join(out_box)	
			print title + t + output

# -----------------------------------
# Launch script

#parse("articles-links_2017") # nodes_raw nodes_raw_test , edges_raw edges_raw_test

#get_edges("articles-links_2017");

count_co_occurrences("nodes_2017","articles_details_links_2017") # nodes_2017 articles_details_links_2017 _test
#count_co_occurrences("test/a","test/b")

#parse_in_links("articles_details_links_2017_no500","articles/articles_details")

#check_strategy("articles/articles_details")
