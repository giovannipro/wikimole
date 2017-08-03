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
t = "\t"
n = "\n"
s = " "

# -----------------------------------
# Main variables



# -----------------------------------
# Script

def parse(mfile):

	art_list = folder + "raw_data/" + "articles_2015" + ".tsv";
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
				print(output_a)

				for x in filecontents_b:
					x0 = x[0];

					if art_ in x0:
						output_b = x[1] + "|"
						out_file.write(output_b)

				out_file.write(n)

	except IOError as e:
		print e #'Error: no files found'  # %s' % e.strerror

def count_co_occurrences(nodes,edges):
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
					node = e[1] # 1
					edge = e[2] # 2
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
		print e #'Error: no files found'  # %s' % e.strerror

# -----------------------------------
# Launch script

#parse("edges_2016") # nodes_raw nodes_raw_test , edges_raw edges_raw_test

count_co_occurrences("nodes_2016","edges_2016_output")



