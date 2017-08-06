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


def count_links(edges):
	time()

	my_input_edges = folder + "raw_data/" + edges + ".tsv"
	output = folder + "raw_data/" + edges + "_clean.tsv"

	try:
		with open(my_input_edges, "rb") as in_ed_file, \
			open(output, 'wb') as out_file:

			in_ed_file = csv.reader(in_ed_file, delimiter = t)
			filecontents_ed = [line for line in in_ed_file]

			index = 0;

			for nod in filecontents_ed:
				index += 1;
				node_a = nod[0];
				node_b = nod[1];
				node_c = nod[2];

				count = 0;

				for a in node_c:
					count += 1

				print node_a + t + node_b + t + str(count)
	
	except IOError as e:
		print e

	time()

# -----------------------------------
# Launch script

count_links("articles_details_links_2017") 

